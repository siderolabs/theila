<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="text-talos-gray-900 dark:text-talos-gray-100 pt-5 w-1/2 h-2/3"> 
    <div v-if="!ready" class="flex flex-row justify-center items-center w-full h-full">
      <t-spinner/>
    </div>
    <div v-else class="w-full h-full flex flex-col">
      <div class="px-5">
        <h3 class="mb-2 text-lg leading-6 font-medium" id="modal-title">Upgrade Kubernetes</h3>
      </div>
      <div class="p-5 h-80 flex flex-col gap-2 flex-1"> 
        <div class="flex gap-2 w-full items-center border-b border-talos-gray-300 dark:border-talos-gray-600 pb-2">
          <div class="flex-1">
            From: {{ fromVersion }}
          </div>
          <div>
            To:
          </div>
          <t-dropdown xs :title="toVersion || 'Select an Option...'" class="flex-1">
            <template v-slot:default>
              <menu-item v-if="versions.length === 0" v-slot="{ active }">
                <a
                  :class="{ active }"
                  >Newer version is not found.</a
                >
              </menu-item>
              <menu-item v-for="version in versions" :key="version" v-slot="{ active }">
                <a
                  v-on:click="() => { toVersion = version }"
                  :class="{ active }"
                  >{{ version }}</a
                >
              </menu-item>
            </template>
          </t-dropdown>
        </div>
        <div>Upgrade Logs</div>
        <log-view :logs="logs" class="flex-1"/>
      </div>
      <div class="bg-talos-gray-50 dark:bg-talos-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2 rounded-b-lg">
        <t-button small primary @click="upgrade" :disabled="running || !toVersion">{{ running ? "Upgrading..." : "Upgrade" }}</t-button>
        <t-button small danger @click="abort" :disabled="!running">Abort</t-button>
        <t-button small @click="close">Cancel</t-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TButton from '../components/TButton.vue';
import TDropdown from '../components/TDropdown.vue';
import TSpinner from '../components/TSpinner.vue';
import LogView from '../components/LogView.vue';
import Watch from '../api/watch';
import { MenuItem } from '@headlessui/vue';
import { ref, onMounted, onUnmounted, computed, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { ResourceService, ManagementService, ContextService } from '../api/grpc';
import { Runtime } from '../api/common/theila.pb';
import { Kind } from '../api/socket/message';
import { TaskStatusSpec_Phase } from '../api/rpc/management';
import { showError, showSuccess } from '../modal';
import { context, getContext } from '../context';
import { DefaultNamespace, UpgradeTaskType, TaskStatusType, TaskLogType, KubernetesVersionType } from '../api/resources';
import { Code } from '../api/google/rpc/code';
import { compareSemVer, isValidSemVer } from 'semver-parser';

export default {
  components: {
    TButton,
    TDropdown,
    TSpinner,
    LogView,
    MenuItem,
  },

  setup() {
    const router = useRouter();
    const logs:Ref<string[]> = ref([]);
    const statuses:Ref<Object[]> = ref([]);
    const versions:Ref<Object[]> = ref([]);

    const fromVersion:Ref<string> = ref("");
    const toVersion:Ref<string> = ref("");

    const upgradeID:Ref<string> = ref("");

    const ready = ref(false);

    const close = () => {
      router.go(-1);
    };

    const ctx = getContext();
    const contextName = ctx.name;

    const handleStatusChange = (message, spec) => {
      if(message.kind != Kind.EventItemUpdate)
        return;

      const old = spec["old"]["spec"];
      const current = spec["new"]["spec"];

      if(old["phase"] !== current["phase"] && current["phase"] === TaskStatusSpec_Phase.COMPLETE) {
        close();
        showSuccess("Upgrade complete", "Successfully updated Kubernetes components");
      }

      if(old["error"] === current["error"])
        return;

      showError("Failed to upgrade Kubernetes", current["error"]);
    }

    // first start watches on any ongoing tasks
    const statusWatch = new Watch(context.api, statuses, handleStatusChange);
    // and logs
    const logsWatch = new Watch(context.api, null, (message, spec) => {
      if(message.kind === Kind.EventItemUpdate) {
        logs.value.push(spec["new"]["spec"]["line"]);
      } else {
        logs.value.push(spec["spec"]["line"]);
      }
    });

    const versionsWatch = new Watch(context.api, versions);

    onMounted(async () => {
      try {
        const response = await ContextService.List();
        
        upgradeID.value = `${ctx.cluster ? ctx.cluster.uid : null || contextName || response.currentContext}-upgrade-k8s`;

        await statusWatch.start(Runtime.Theila, {
          id: upgradeID.value,
          type: TaskStatusType,
          namespace: DefaultNamespace,
        }, ctx);

        await logsWatch.start(Runtime.Theila, {
          id: upgradeID.value,
          type: TaskLogType,
          namespace: DefaultNamespace,
          tail_events: 100,
        }, ctx);

        const upgradeInfo = await ManagementService.UpgradeInfo({}, {
          context: ctx,
        });

        fromVersion.value = upgradeInfo["fromVersion"] || "unknown";

        await versionsWatch.start(Runtime.Theila, {
          type: KubernetesVersionType,
          namespace: DefaultNamespace,
        }, ctx);

        ready.value = true;
      } catch(e) {
        close();
        showError("Failed to load current state", e.toString())
      }
    });

    onUnmounted(async () => {
      await statusWatch.stop();
      await logsWatch.stop();
      await versionsWatch.stop();
    });

    return {
      close,
      logs,
      ready,
      fromVersion,
      toVersion,
      versions: computed(() => {
        const res:string[] = [];
        if(fromVersion.value === "unknown")
          return res;

        for(const version of versions.value) {
          const v = version["spec"]["version"];
          if(!isValidSemVer(v))
            continue;

          if(compareSemVer(v, fromVersion.value) === 1)
            res.push(v);
        }

        return res;
      }),
      running: computed(() => {
        if(statuses.value.length === 0) {
          return false;
        }

        return statuses.value[0]["spec"]["phase"] === TaskStatusSpec_Phase.RUNNING;
      }),
      abort: async() => {
        try {
          await ResourceService.Delete({
            namespace: DefaultNamespace,
            id: upgradeID.value,
            type: UpgradeTaskType,
          }, {
            runtime: Runtime.Theila,
          });
        } catch(e) {
          if(e.code !== Code.NOT_FOUND) {
            showError("Failed to abort upgrade", e.toString());
          }
        }
      },
      upgrade: async () => {
        try {
          let pending;
          try {
            pending = await ResourceService.Get({
              namespace: DefaultNamespace,
              id: upgradeID.value,
              type: UpgradeTaskType,
            }, {
              runtime: Runtime.Theila,
            });
          } catch(e) {
            if(e.code !== Code.NOT_FOUND) {
              throw e;
            }
          }

          if(pending != null) {
            await ResourceService.Update({
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
            }, {
              runtime: Runtime.Theila,
            });
          } else {
            await ResourceService.Create({
              metadata: {
                namespace: DefaultNamespace,
                type: UpgradeTaskType,
                id: upgradeID.value,
              },
              spec: {
                toVersion: toVersion.value,
                context: ctx,
              },
            }, {
              runtime: Runtime.Theila,
            });
          }
        } catch(e) {
          showError("Failed to upgrade Kubernetes", e.toString());
        }
      }
    }
  },
}
</script>
