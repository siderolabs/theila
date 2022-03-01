<template>
  <t-watch
    :resource="{ type: kubernetes.node }"
    showCount
    itemName="Node"
    kubernetes
    :context="getContext()"
  >
    <template #default="items">
      <t-modal />
      <t-nodes-monitor-content :items="items.items" class="pt-2" />
    </template>
  </t-watch>
</template>

<script>
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TNodesMonitorContent from "./components/TNodesMonitorContent.vue";
import TModal from "@/components/TModal.vue";

export default {
  components: { TWatch, TNodesMonitorContent, TModal },
  setup() {
    return {
      getContext,
      kubernetes,
    };
  },
};
</script>
