<template>
  <div class="overview__cluster-box">
    <div class="overview__cluster-title">
      {{ title }}
    </div>
  </div>
  <t-overview-cluster-status-item
    v-for="(item, idx) in data"
    :key="idx"
    :title="item.title"
    :subtitle="item.subtitle"
    :status="item.status"
    :logs="item.logs"
  />
</template>

<script lang="ts">
import TOverviewClusterStatusItem from "./TOverviewClusterStatusItem.vue";
export default {
  components: { TOverviewClusterStatusItem },
  props: {
    data: [],
    title: String,
  },
};
</script>

<style scoped>
.overview__cluster-box {
  @apply flex-col;
}
.overview__cluster-title {
  @apply text-xs text-naturals-N13 bg-naturals-N3;
  padding: 10px 24px;
}
</style>
