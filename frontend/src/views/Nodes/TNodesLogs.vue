<template>
  <t-watch
    :resource="{ type: kubernetes.node }"
    showCount
    itemName="Node"
    kubernetes
    :context="getContext()"
  >
    <template #default="items">
      <t-nodes-logs-content :items="items.items" />
    </template>
  </t-watch>
</template>

<script>
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TNodesLogsContent from "./components/TNodesLogsContent.vue";
export default {
  components: { TWatch, TNodesLogsContent },
  setup() {
    return {
      getContext,
      kubernetes,
    };
  },
};
</script>
