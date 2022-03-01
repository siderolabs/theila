<template>
  <div class="nodes">
    <t-modal />
    <t-watch
      :resource="{ type: kubernetes.node }"
      showCount
      itemName="Node"
      kubernetes
      :context="getContext()"
    >
      <template #default="items">
        <div class="nodes__heading">
          <h2 class="nodes__title">All Nodes</h2>
          <p class="nodes__description">
            This module manages cluster nodes and shows the status of them. You
            can edit or delete nodes here.
          </p>
        </div>
        <t-nodes-content :items="items.items" />
      </template>
    </t-watch>
  </div>
</template>

<script lang="ts">
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TNodesContent from "./components/TNodesContent.vue";
import TModal from "@/components/TModal.vue";
export default {
  components: {
    TWatch,
    TNodesContent,
    TModal,
  },
  setup() {
    return {
      kubernetes,
      getContext,
    };
  },
};
</script>

<style scoped>
.nodes {
  @apply flex flex-col w-full;
}
.nodes__heading {
  @apply flex flex-col mb-5 pt-2;
}
.nodes__title {
  @apply text-xl font-medium text-naturals-N14;
  margin-bottom: 10px;
}
.nodes__description {
  @apply text-xs font-normal text-naturals-N9;
}
</style>
