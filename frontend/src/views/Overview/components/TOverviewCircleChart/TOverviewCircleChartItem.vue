<template>
  <div class="item">
    <h4 class="item__name">{{ name }}</h4>
    <t-overview-circle-chart :chartFillProcentage="chartFillProcentage" />
    <p class="item__use">
      {{ usageName }}
      <span class="item__use-procents">{{ usageProcents }}%</span>
    </p>
    <p class="item__total">{{ usageTotal }} Total</p>
  </div>
</template>

<script>
import TOverviewCircleChart from "./TOverviewCircleChart.vue";
export default {
  components: { TOverviewCircleChart },
  props: {
    name: String,
    usageName: String,
    usageProcents: {
      type: [Number, String],
    },
    usageTotal: {
      type: [Number, String],
    },
    chartFillProcentage: {
      type: [String, Number],
    },
  },
};
</script>

<style scoped>
.item {
  @apply flex flex-col items-center justify-start mb-10 2xl:mb-0;
}
.item__name {
  @apply text-xs font-medium text-naturals-N13;
}
.item__use {
  @apply text-xs font-medium text-naturals-N13 mb-4;
}
.item__use-procents {
  @apply text-xs font-medium text-naturals-N9 pl-2;
}
.item__total {
  @apply text-xs font-medium text-naturals-N10;
}
</style>
