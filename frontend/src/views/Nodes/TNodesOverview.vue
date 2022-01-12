<template>
  <t-watch
    :resource="{ type: kubernetes.node }"
    showCount
    itemName="Node"
    kubernetes
    :context="getContext()"
  >
    <template #default="items">
      <t-nodes-overview-content :items="items.items" />
    </template>
  </t-watch>
</template>

<script>
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TNodesOverviewContent from "./components/TNodesOverviewContent.vue";
export default {
  components: { TWatch, TNodesOverviewContent },
  setup() {
    return {
      getContext,
      kubernetes,
    };
  },
};
</script>
