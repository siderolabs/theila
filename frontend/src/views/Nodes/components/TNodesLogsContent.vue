<template>
  <div class="logs">
    <div class="logs__heading">
      <t-breadcrumbs
        class="logs__breadcrumbs"
        :nodeName="item[0]?.metadata?.name"
      />
      <div class="logs__heading-buttons">
        <t-button
          class="logs__heading-button"
          icon="reboot"
          iconPosition="left"
          type="secondary"
          @click="rebootNode"
          >Reboot</t-button
        >
        <t-button
          class="logs__heading-button"
          icon="reset"
          iconPosition="left"
          type="secondary"
          @click="resetNode"
          >Reset</t-button
        >
      </div>
    </div>
    <t-nodes-content-type
      v-if="$route.params.service === 'dmesg'"
      class="logs__content-types"
      type="dmesg"
      :ip="$route.params.node"
    />
    <div class="logs__search-box">
      <t-input
        @input.self="setInputValue"
        type="secondary"
        placeholder="Search..."
        @clearInput="setInputValue"
      />
    </div>
    <t-alert
      v-if="err"
      :title="logs ? 'Disconnected' : 'Failed to Fetch Logs'"
      type="error"
      class="mb-2"
    >
      {{ err }}
    </t-alert>
    <t-nodes-logs-content-list :logs="logs" :searchOption="inputValue" />
  </div>
</template>
<script lang="ts">
import TBreadcrumbs from "@/components/TBreadcrumbs.vue";
import { useRoute, useRouter } from "vue-router";
import TButton from "@/components/common/Button/TButton.vue";
import { computed, ref, toRef } from "@vue/reactivity";
import TInput from "@/components/common/TInput/TInput.vue";
import TNodesLogsContentList from "./TNodesLogsContentList.vue";
import { MachineService, subscribe } from "@/api/grpc";
import { Runtime } from "@/api/common/theila.pb";
import { getContext } from "@/context";
import { onUnmounted, watch } from "@vue/runtime-core";
import TAlert from "@/components/TAlert.vue";
import TNodesContentType from "./TNodesContentType.vue";

export default {
  components: {
    TBreadcrumbs,
    TButton,
    TInput,
    TNodesLogsContentList,
    TAlert,
    TNodesContentType,
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const nodesList = toRef(props, "items");
    const router = useRouter();
    const route = useRoute();
    const inputValue = ref("");
    const logs = ref([]);
    const context = getContext();
    let stream: any = ref(null);
    let buffer: any = "";
    let flush: any = null;

    const rebootNode = async () => {
      router.push({
        query: {
          modal: "reboot",
          node: route.params.node,
          ...route.query,
        },
      });
    };

    const resetNode = async () => {
      router.push({
        query: {
          modal: "reset",
          node: route.params.node,
          ...route.query,
        },
      });
    };
    const getItem = () => {
      return nodesList.value.filter((item) => {
        let addr;
        for (const a of item.status.addresses) {
          if (a.type == "InternalIP") {
            addr = a.address;
          }

          if (a.type == "ExternalIP") {
            addr = a.address;
            break;
          }
        }
        return addr == route.params.node;
      });
    };

    const setInputValue = (data) => {
      inputValue.value = data;
    };

    const reset = () => {
      logs.value = [];
      buffer = "";
      clearTimeout(flush);
    };

    const init = () => {
      if (stream.value) stream.value.shutdown();

      reset();

      const method =
        route.params.service == "dmesg"
          ? MachineService.Dmesg
          : MachineService.Logs;
      let params = {};

      if (route.params.service == "dmesg") {
        params = {
          follow: true,
        };
      } else {
        params = {
          namespace: "system",
          id: route.params.service,
          follow: true,
          tailLines: -1,
        };
      }

      let clearLogs = false;

      stream.value = subscribe(
        method,
        params,
        (resp) => {
          clearTimeout(flush);

          if (resp.error) {
            clearLogs = true;
            return;
          }

          if (clearLogs) reset();

          clearLogs = false;

          buffer += atob(resp.bytes);

          // accumulate frequent updates and then flush them in a single call
          flush = setTimeout(() => {
            const splitPoint = buffer.lastIndexOf("\n");
            logs.value = logs.value.concat(
              buffer.slice(0, splitPoint).split("\n")
            );
            buffer = buffer.slice(splitPoint + 1, buffer.length);
          }, 50);
        },
        {
          runtime: Runtime.Talos,
          context: context,
        }
      );
    };

    init();

    watch(
      () => route.params.service,
      () => {
        init();
      }
    );

    onUnmounted(() => {
      if (stream.value) stream.value.shutdown();
    });

    return {
      rebootNode,
      resetNode,
      setInputValue,
      inputValue,
      item: computed(() => getItem()),
      err: computed(() => {
        return stream.value ? stream.value.err : null;
      }),
      logs: computed(() => {
        if (logs.value[logs.value.length - 1] == "") {
          return logs.value.slice(0, logs.value.length - 2);
        }

        return logs.value;
      }),
    };
  },
};
</script>

<style scoped>
.logs {
  @apply flex flex-col h-full;
  max-height: calc(100vh - 110px);
  overflow: hidden;
}
.logs__heading {
  @apply flex w-full justify-between mb-9 flex-row flex-wrap;
}
.logs__breadcrumbs {
  @apply xl:mb-0 mb-3;
}
.logs__heading-buttons {
  @apply flex justify-end;
}
.logs__heading-button {
  @apply text-naturals-N13;
}
.logs__heading-button:nth-child(1) {
  border-radius: 4px 0 0 4px;
}
.logs__heading-button:nth-child(2) {
  border-radius: 0 4px 4px 0;
}
.logs__search-box {
  @apply flex justify-start mb-3;
}
.logs__content-types {
  @apply mb-6;
}
</style>
