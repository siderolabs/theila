<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div v-if="title" class="w-full text-center text-naturals-N13">
      {{ title }}
    </div>
    <div class="flex-1">
      <div
        v-if="err || loading"
        class="flex flex-row justify-center items-center w-full h-full"
      >
        <div
          v-if="err"
          class="flex justify-center items-center w-1/2 gap-4 text-talos-gray-500 text-sm"
        >
          <div class="flex-0">
            <exclamation-icon class="w-6 h-6" />
          </div>
          <div>{{ err }}</div>
        </div>
        <t-spinner v-else />
      </div>
      <apexchart
        v-else
        width="100%"
        height="100%"
        :type="type"
        :options="options"
        :series="series"
      />
    </div>
  </div>
</template>

<script type="ts">
import { ref, toRefs, computed, watch } from 'vue';
import { theme, systemTheme, isDark } from '../theme';
import VueApexCharts from "vue3-apexcharts";
import Watch from "../api/watch";
import TSpinner from "./TSpinner.vue";
import { Kind } from "../api/socket/message";
import { context as ctx } from "../context";
import {
  ExclamationIcon
} from '@heroicons/vue/outline';
import { DateTime } from 'luxon';

export default {
  components: {
    apexchart: VueApexCharts,
    TSpinner,
    ExclamationIcon,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    animations: Boolean,
    legend: Boolean,
    dataLabels: Boolean,
    stroke: {
      type: Object,
      default: () => {
        return {
          curve: "smooth",
          width: 2,
        };
      },
    },
    chartType: String,
    title: String,
    type: String,
    numPoints: {
      type: Number,
      default: 25,
    },
    resource: {
      type: Object,
      required: true,
    },
    context: Object,
    talos: Boolean,
    kubernetes: Boolean,
    pointFn: {
      type: Function,
      required: true,
    }
  },

  setup(props, componentContext) {
    const series = ref([]);
    const seriesMap = {};
    let points = {};
    let flush = {};

    const handlePoint = (message, spec) => {
      if(message.kind != Kind.EventItemUpdate) {
        return;
      }

      const data = pointFn.value(spec["new"]["spec"], spec["old"]["spec"]);
      for(const key in data) {
        if(!(key in seriesMap)) {
          series.value.push({
            name: key,
            data: [],
          });

          seriesMap[key] = {
            index: series.value.length - 1,
            version: 0,
          }
        }

        const version = spec["new"]["metadata"]["version"];
        const meta = seriesMap[key];
        if(version <= meta.version) {
          continue;
        }

        let point = data[key];
        const updated = spec["new"]["metadata"]["updated"];
        if(updated) {
          point = [DateTime.fromISO(updated).toMillis(), point];
        }

        clearTimeout(flush[meta.index]);

        if(!points[meta.index])
          points[meta.index] = [];

        points[meta.index].push(point);
        meta.version = version;

        flush[meta.index] = setTimeout(() => {
          let dst = series.value[meta.index].data;

          dst = dst.concat(points[meta.index]);

          if(dst.length >= numPoints.value) {
            dst.splice(0, dst.length - numPoints.value + 1);
          }

          series.value[meta.index].data = dst;
          points[meta.index] = [];
        }, 50);
      }
    };

    const numPoints = ref(props["resource"]["tail_events"] || 25);

    const {
      name,
      animations,
      legend,
      dataLabels,
      stroke,
      pointFn,
    } = toRefs(props);

    const w = new Watch(
      ctx.api,
      null,
      handlePoint,
    );
    const dark = ref(isDark(theme.value || systemTheme.value));

    watch([theme, systemTheme], () => {
      dark.value = isDark(theme.value || systemTheme.value);
    });

    w.setup(props, componentContext);
    const options = computed(() => {
      return {
        theme: {
          mode: dark.value ? "dark" : "light",
        },
        chart: {
          background: "#00000000",
          id: name.value,
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: animations.value,
          },
          toolbar: {
            show: false
          },
        },
        legend: {
          show: legend.value,
        },
        dataLabels: {
          enabled: dataLabels.value,
        },
        stroke: stroke.value,
        tooltip: {
          theme: dark.value ? "dark" : "light",
          x: {
            format: 'HH:mm:ss',
          },
        },
        grid: {
          borderColor: dark.value ? '#333' : "#EEE",
          strokeDashArray: 2,
          xaxis: {
            lines: {
              show: true,
            }
          },
          yaxis: {
            lines: {
              show: true,
            }
          },
        },
        xaxis:{
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          forceNiceScale: true,
          decimalsInFloat: 2,
        }
      };
    });

    return {
      options,
      err: w.err,
      loading: w.loading,
      series,
    };
  }
};
</script>
