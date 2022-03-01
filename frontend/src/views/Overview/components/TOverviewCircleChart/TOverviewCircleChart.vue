<template>
  <div class="chart-wrapper">
    <apexchart
      :height="200"
      :width="200"
      type="radialBar"
      :options="options"
      :series="[procentage]"
    />
  </div>
</template>

<script>
import { computed, toRefs } from "@vue/reactivity";
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartFillProcentage: {
      type: [String, Number],
    },
  },
  setup(props) {
    const { chartFillProcentage } = toRefs(props);
    return {
      options: {
        chart: {
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 10,
            color: "#FF8B59",
            opacity: 0.2,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: 60,
            },
            track: {
              background: "#1F222E",
            },
            dataLabels: {
              show: false,
            },
          },
        },
        fill: {
          colors: "#FF8B59",
        },
      },
      procentage: computed(() =>
        isNaN(chartFillProcentage.value) ? 0 : chartFillProcentage.value
      ),
    };
  },
};
</script>

<style scoped>
.chart-wrapper {
  @apply flex items-center justify-start z-0;
  width: 200px;
}
</style>
