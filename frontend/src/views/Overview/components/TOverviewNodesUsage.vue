<template>
  <div class="item">
    <span class="item__title">{{ title }}</span>
    <span class="item__id">{{ id }}</span>
    <div class="item__cpu">
      <span class="item__cpu--light">{{ amount }}%</span>
      <span>CPU Utilization</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    id: String,
    amount: Number,
  },
};
</script>

<style scoped>
.item {
  @apply w-full py-5 lg:px-6 px-2 flex justify-between items-center;
}
.item:not(:last-of-type) {
  @apply border-b border-naturals-N4;
}
.item__title {
  @apply text-xs text-naturals-N14 pr-2;
}
.item__id {
  @apply text-xs text-naturals-N9 pr-2;
}
.item__cpu {
  @apply text-xs text-naturals-N9;
}
.item__cpu--light {
  @apply text-xs text-naturals-N13 mr-1;
}
</style>
