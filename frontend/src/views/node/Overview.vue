<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <t-breadcrumbs>{{ $route.params.node }} Overview</t-breadcrumbs>
    </div>
    <div class="flex gap-2">
      <div class="flex-1">
        <t-chart
           name="cpu"
           title="CPU Utilization"
           width="100%"
           height="200px"
           type="area"
           talos
           :resource="{type: 'CPUStat', namespace: 'perf', tail_events: 25}"
           :context="getContext()"
           :point-fn="handleCPU"
        />
      </div>
      <div class="flex-1">
        <t-chart
           name="mem"
           title="Memory Usage"
           width="100%"
           height="200px"
           type="area"
           talos
           :resource="{type: 'MemoryStat', namespace: 'perf', tail_events: 25}"
           :context="getContext()"
           :point-fn="handleMem"
        />
      </div>
    </div>
    <div class="flex gap-2">
      <div class="flex-1">
        <t-chart
           name="procs"
           title="Processes"
           width="100%"
           height="200px"
           type="area"
           talos
           :resource="{type: 'CPUStat', namespace: 'perf', tail_events: 25}"
           :context="getContext()"
           :point-fn="handleProcs"
        />
      </div>
    </div>
  </div>
</template>

<script type="ts">
import { useRoute } from 'vue-router';
import { getContext } from '../../context';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import TChart from '../../components/TChart.vue';

function diff(a, b) {
  const result = {};

  for(const key in a) {
    const left = a[key];
    const right = b[key];

    const tleft = typeof left;
    const tright = typeof right;

    if(tleft !== tright) {
      continue;
    }

    if(tleft === "object")
      result[key] = diff(left, right);
    else
      result[key] = left - right;
  }

  return result;
}

export default {
  components: {
    TBreadcrumbs,
    TChart,
  },

  setup() {
    const route = useRoute();

    const handleCPU = (oldObj, newObj) => {
      const delta = diff(oldObj, newObj);
      const stat = delta["cpuTotal"];

      const idle = stat["idle"] + stat["iowait"]
      const nonIdle = stat["user"] + stat["nice"] + stat["system"] + stat["irq"] + stat["steal"] + stat["softIrq"]
      const total = idle + nonIdle;

      return {
        system: stat["system"]/total * 100,
        user: stat["user"]/total * 100,
      }
    };

    const handleMem = (_, m) => {
      const used = m["used"] - m["cached"] - m["buffers"]

      return {
        total: used/m["total"] * 100,
      }
    };

    const handleProcs = (oldObj, newObj) => {
      const delta = diff(oldObj, newObj);

      return {
        created: delta["processCreated"],
        running: newObj["processRunning"],
        blocked: newObj["processBlocked"],
      }
    };

    return {
      handleMem,
      handleCPU,
      handleProcs,
      getContext() {
        const ctx = getContext() || {};

        ctx.nodes = [
          route.params.node
        ];

        return ctx;
      },
    }
  }
};
</script>
<style scoped>
.ok {
  @apply h-5 w-5 text-green-400;
}

.error {
  @apply h-5 w-5 text-red-600;
}
</style>
