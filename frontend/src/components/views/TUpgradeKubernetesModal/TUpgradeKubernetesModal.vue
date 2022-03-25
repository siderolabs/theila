<template>
  <div class="modal__wrapper" @click.self="close">
    <div class="modal">
      <div class="modal__heading">
        <h3 class="modal__name">Upgrade Kubernetes</h3>
        <t-icon class="modal__exit" icon="close" @click="close" />
      </div>
      <p class="modal__subtitle">
        Please select the version to which you would like to upgrade cluster:
        <span class="modal__subtitle--light">{{ clusterName }}</span>
      </p>
      <t-upgrade-kubernetes-select-list
        :isUpgrading="isUpgrading"
        :versions="versions"
        @checkedValue="changeSelectedValue"
        :current="fromVersion"
      />
      <div class="modal__buttons-box">
        <t-button @click="close" class="modal__button" type="secondary"
          >Cancel</t-button
        >
        <t-button
          :disabled="!!selectListValue.currentVersion"
          @click="upgrade"
          class="modal__button"
          >Upgrade Now</t-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "@/components/common/Button/TButton.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TUpgradeKubernetesSelectList from "./TUpgradeKubernetesSelectList.vue";
import { ref } from "@vue/reactivity";
import Watch from "@/api/watch";
import { onMounted, onUnmounted, computed, Ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ResourceService, ManagementService } from "@/api/grpc";
import { Runtime } from "@/api/common/theila.pb";
import { Kind } from "@/api/socket/message";
import { TaskStatusSpec_Phase } from "@/api/rpc/management";
import { showError, showInProgress, showSuccess } from "../../../modal";
import { context, getContext } from "@/context";
import {
  DefaultNamespace,
  UpgradeTaskType,
  TaskStatusType,
  TaskLogType,
  KubernetesVersionType,
} from "@/api/resources";
import { Code } from "@/api/google/rpc/code";
import { isValidSemVer, compareSemVer } from "semver-parser";
import { getUpgradeID } from "@/methods";
export default {
  components: { TButton, TIcon, TUpgradeKubernetesSelectList },
  setup() {
    const selectListValue = ref({ currentVersion: true });
    const changeSelectedValue = (data) => {
      selectListValue.value = data;
      toVersion.value = data;
    };
    const router = useRouter();
    const logs: Ref<string[]> = ref([]);
    const statuses: Ref<any[]> = ref([]);
    const versions: Ref<Object[]> = ref([]);

    const fromVersion: Ref<string> = ref("");
    const toVersion: Ref<string> = ref("");
    const isUpgrading: Ref<boolean> = ref(false);

    const upgradeID: Ref<string> = ref("");

    const ready = ref(false);

    const close = () => {
      router.go(-1);
    };

    const ctx = getContext();
    const contextName = ctx.name;

    const lastTask = computed(() => {
      return statuses.value?.length > 0 ? statuses.value[0] : 0;
    });

    const handleStatusChange = (message, spec) => {
      if (spec.new?.spec.error == "the task was aborted")
        return showSuccess("Upgrade was aborted", "");
      if (message.kind != Kind.EventItemUpdate) return;

      showInProgress(`${contextName} is upgrading`, "", abort);

      const old = spec["old"]["spec"];
      const current = spec["new"]["spec"];

      if (
        +old["phase"] !== current["phase"] &&
        +current["phase"] === TaskStatusSpec_Phase.COMPLETE
      ) {
        showSuccess(
          "Upgrade complete",
          "Successfully updated Kubernetes components"
        );
      } else if (
        +old["phase"] !== current["phase"] &&
        +current["phase"] === TaskStatusSpec_Phase.FAILED &&
        current["error"] !== "the task was aborted"
      ) {
        showError("Failed to upgrade Kubernetes", current["error"]);
      }

      if (old["error"] === current["error"]) return;
    };

    // first start watches on any ongoing tasks
    const statusWatch = new Watch(context.api, statuses, handleStatusChange);
    // and logs
    const logsWatch = new Watch(context.api, null, (message, spec) => {
      if (message.kind === Kind.EventItemUpdate) {
        logs.value.push(spec["new"]["spec"]["line"]);
      } else {
        logs.value.push(spec["spec"]["line"]);
      }
    });

    const versionsWatch = new Watch(context.api, versions);

    watch(lastTask, async (value) => {
      if (value) {
        await logsWatch.start(
          Runtime.Theila,
          {
            id: value.metadata.id,
            type: TaskLogType,
            namespace: upgradeID.value,
            tail_events: 100,
          },
          ctx
        );
      } else {
        await logsWatch.stop();
      }
    });

    const abort = async () => {
      showInProgress(`${contextName} is aborting`, "", null, true);
      try {
        await ResourceService.Delete(
          {
            namespace: DefaultNamespace,
            id: upgradeID.value,
            type: UpgradeTaskType,
          },
          {
            runtime: Runtime.Theila,
          }
        );
      } catch (e: any) {
        if (e.code !== Code.NOT_FOUND) {
          showError("Failed to abort upgrade", e.toString());
        }
      }
    };

    onMounted(async () => {
      try {
        upgradeID.value = await getUpgradeID();

        await statusWatch.start(
          Runtime.Theila,
          {
            type: TaskStatusType,
            namespace: upgradeID.value,
          },
          ctx,
          (a, b) => {
            if (a["spec"]["phase"] == 1) {
              isUpgrading.value = true;
            } else isUpgrading.value = false;
            if (a["metadata"]["created"] === b["metadata"]["created"]) {
              return 0;
            } else if (a["metadata"]["created"] < b["metadata"]["created"]) {
              return 1;
            }

            return -1;
          }
        );
        try {
          const upgradeInfo = await ManagementService.UpgradeInfo(
            {},
            {
              context: ctx,
            }
          );

          fromVersion.value = upgradeInfo["fromVersion"] || "unknown";
        } catch (e: any) {
          console.log(e);
        }

        await versionsWatch.start(
          Runtime.Theila,
          {
            type: KubernetesVersionType,
            namespace: DefaultNamespace,
          },
          ctx
        );

        ready.value = true;
      } catch (e: any) {
        showError("Failed to load current state", e.toString());
      }
    });

    onUnmounted(async () => {
      if (statusWatch?.running?.value) {
        await statusWatch.stop();
      }
      if (logsWatch?.running?.value) {
        await logsWatch.stop();
      }
      if (versionsWatch?.running?.value) {
        await versionsWatch.stop();
      }
    });

    return {
      close,
      logs,
      ready,
      fromVersion,
      toVersion,
      selectListValue,
      changeSelectedValue,
      isUpgrading,
      clusterName: computed(() => ctx?.cluster?.name ?? contextName),
      versions: computed(() => {
        const res: string[] = [];
        if (fromVersion.value === "unknown") return res;

        for (const ver of versions.value) {
          const v = ver["spec"]["version"];
          if (!isValidSemVer(v)) continue;

          const parts = fromVersion.value.split(".");
          const version = `${parts.slice(0, 2).join(".")}.0`;

          if (
            compareSemVer(v, version) === 0 ||
            compareSemVer(v, version) === 1
          )
            res.push(v);
        }
        return res.sort();
      }),
      running: computed(() => {
        if (statuses.value.length === 0) {
          return false;
        }

        return (
          statuses.value[0]["spec"]["phase"] === TaskStatusSpec_Phase.RUNNING
        );
      }),
      abort,
      upgrade: async () => {
        showInProgress(`${contextName} is upgrading`, "", abort);
        try {
          let pending;
          try {
            pending = await ResourceService.Get(
              {
                namespace: DefaultNamespace,
                id: upgradeID.value,
                type: UpgradeTaskType,
              },
              {
                runtime: Runtime.Theila,
              }
            );
          } catch (e: any) {
            if (e.code !== Code.NOT_FOUND) {
              throw e;
            }
          }

          if (pending != null) {
            await ResourceService.Update(
              {
                metadata: {
                  namespace: DefaultNamespace,
                  type: UpgradeTaskType,
                  id: upgradeID.value,
                  version: `${pending["metadata"]["version"] + 1}`,
                },
                spec: {
                  toVersion: toVersion.value,
                  context: ctx,
                },
              },
              {
                runtime: Runtime.Theila,
              }
            );
          } else {
            await ResourceService.Create(
              {
                metadata: {
                  namespace: DefaultNamespace,
                  type: UpgradeTaskType,
                  id: upgradeID.value,
                },
                spec: {
                  toVersion: toVersion.value,
                  context: ctx,
                },
              },
              {
                runtime: Runtime.Theila,
              }
            );
          }
        } catch (e: any) {
          showError("Failed to upgrade Kubernetes", e.toString());
        }
      },
    };
  },
};
</script>

<style scoped>
.modal {
  @apply rounded bg-naturals-N2 p-8 z-30;
  width: 390px;
}
.modal__wrapper {
  @apply fixed top-0 bottom-0 left-0 right-0 w-full h-full flex justify-center items-center z-10;
  background-color: rgba(16, 17, 24, 0.5);
}
.modal__heading {
  @apply flex justify-between items-center;
  margin-bottom: 13px;
}
.modal__name {
  @apply text-base text-naturals-N14;
}
.modal__subtitle {
  @apply text-xs text-naturals-N9;
  margin-bottom: 19px;
}
.modal__subtitle--light {
  @apply text-xs text-naturals-N13;
}
.modal__exit {
  @apply fill-current text-naturals-N7 cursor-pointer transition-colors hover:text-naturals-N8 w-6 h-6;
}
.modal__buttons-box {
  @apply flex justify-end w-full;
}
.modal__button:nth-child(1) {
  @apply mr-4;
}
</style>
