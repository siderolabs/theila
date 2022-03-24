<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="monitor">
    <div class="monitor__charts-box">
      <div class="monitor__charts-wrapper">
        <div class="monitor__chart">
          <t-nodes-monitor-chart
            class="h-full"
            name="cpu"
            title="CPU usage"
            type="area"
            :colors="['#FFB103', '#FF8B59']"
            talos
            :resource="{
              type: talos.cpu,
              namespace: talos.perfNamespace,
              tail_events: 25,
            }"
            :context="context"
            :point-fn="handleCPU"
            :total-fn="handleTotalCPU"
          />
        </div>
        <div class="monitor__chart">
          <t-nodes-monitor-chart
            class="h-full"
            name="mem"
            title="Memory"
            type="area"
            :colors="['#69C297']"
            talos
            :resource="{
              type: talos.mem,
              namespace: talos.perfNamespace,
              tail_events: 25,
            }"
            :context="context"
            :point-fn="handleMem"
            :total-fn="handleTotalMem"
          />
        </div>
      </div>
      <div class="monitor__charts-wrapper">
        <div class="monitor__chart monitor__chart--wide">
          <t-nodes-monitor-chart
            class="h-full"
            name="procs"
            title="Processes"
            type="area"
            :colors="['#5DA8D1', '#69C197', '#FFB103']"
            talos
            :resource="{
              type: talos.cpu,
              namespace: talos.perfNamespace,
              tail_events: 25,
            }"
            :context="context"
            :point-fn="handleProcs"
          />
        </div>
      </div>
    </div>
    <div class="monitor__data-wrapper">
      <div class="grid grid-cols-12 uppercase font-bold select-none">
        <div
          v-for="h in headers"
          @click="() => sortBy(h.id)"
          :key="h.id"
          class="flex flex-row items-center text-center cursor-pointer gap-1 text-xs text-naturals-N9 capitalize"
        >
          <span>{{ h.header || h.id }}</span>
          <arrow-down-icon
            class="w-3 h-3"
            :class="{ transform: sortReverse, 'rotate-180': sortReverse }"
            v-if="sort === h.id"
          />
        </div>
      </div>
      <div class="monitor__data-box">
        <div
          class="grid grid-cols-12 text-xs text-naturals-N12 py-2"
          v-for="process in processes"
          :key="process.pid"
          :title="process.command + ' ' + process.args"
        >
          <div>
            {{ process.pid }}
          </div>
          <div>
            {{ process.state }}
          </div>
          <div>
            {{ process.threads }}
          </div>
          <div>
            {{ process.cpu.toFixed(1) }}
          </div>
          <div>
            {{ process.mem.toFixed(1) }}
          </div>
          <div>
            {{ formatBytes(process.virtualMemory) }}
          </div>
          <div>
            {{ formatBytes(process.residentMemory) }}
          </div>
          <div>
            {{ process.cpuTime }}
          </div>
          <div class="col-span-4 truncate">
            {{ process.command }} {{ process.args }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="ts">
import { getContext } from '../../context';
import { Runtime } from '../../api/common/theila.pb';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { MachineService } from '../../api/grpc';
import {
  ArrowDownIcon,
} from '@heroicons/vue/solid';
import { formatBytes } from "@/methods";
import { talos } from '../../api/resources';
import TNodesMonitorChart from '../Nodes/components/TNodesMonitorChart.vue';

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
    ArrowDownIcon,
    TNodesMonitorChart,
  },

  setup() {
    const processes = ref([]);
    const context = getContext();
    const headers = [
      { id: "pid" },
      { id: "state" },
      { id: "threads" },
      { id: "cpu", header: "CPU %" },
      { id: "mem", header: "Memory %" },
      { id: "virtualMemory", header: "Virt Memory" },
      { id: "residentMemory", header: "Res Memory" },
      { id: "cpuTime", header: "Time+" },
      { id: "command" },
    ];
    const sort = ref("cpu");
    const sortReverse = ref(true);

    let memTotal = 0;
    let interval;

    const sum = (obj, ...args) => {
      let res = 0;
      for(const k of args) {
        res += obj[k] || 0;
      }

      return res;
    };

    const getCPUTotal = (stat) => {
      const idle = sum(stat, "idle", "iowait");
      const nonIdle = sum(stat, "user", "nice", "system", "irq", "steal", "softIrq");

      return idle + nonIdle;
    };

    onMounted(() => {
      const prevProcs = {};
      let prevCPU = 0;

      interval = setInterval(async () => {
        if(memTotal === 0)
          return;

        const resp = await MachineService.Processes({}, {
          runtime: Runtime.Talos,
          context: context,
        });

        let procs = [];

        const r = await MachineService.SystemStat({}, {
          runtime: Runtime.Talos,
          context: context,
        });

        const systemStat = r.messages[0];
        const cpuTotal = getCPUTotal(systemStat.cpuTotal) / systemStat.cpu.length;

        const total = memTotal * 1024;

        for(const message of resp.messages) {
          for(const proc of message.processes) {
            let cpuDiff = 0;

            if(prevProcs[proc.pid] && proc.cpuTime) {
              cpuDiff = proc.cpuTime - prevProcs[proc.pid].cpuTime;
            }

            procs.push({
              mem: (proc.residentMemory || 0) / total * 100,
              cpu: cpuDiff / (cpuTotal - prevCPU) * 100,
              threads: proc.threads,
              pid: proc.pid,
              state: proc.state,
              virtualMemory: parseInt(proc.virtualMemory || 0),
              residentMemory: parseInt(proc.residentMemory || 0),
              command: proc.command,
              cpuTime: proc.cpuTime || 0,
              args: proc.args,
            });

            prevProcs[proc.pid] = proc;
          }
        }

        prevCPU = cpuTotal;

        processes.value = procs;
      }, 2000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    const handleCPU = (oldObj, newObj) => {
      const delta = diff(oldObj, newObj);
      const stat = delta["cpuTotal"];
      const total = getCPUTotal(stat);

      return {
        system: stat["system"]/total * 100,
        user: stat["user"]/total * 100,
      };
    };

    const handleTotalCPU = (oldObj, newObj) => {
      const point = handleCPU(oldObj, newObj);

      return `${(point.user + point.system).toFixed(1)} %`;
    };

    const handleMem = (_, m) => {
      const used = m["used"] - m["cached"] - m["buffers"]

      memTotal = m["total"];

      return {
        total: used/m["total"] * 100,
      }
    };

    const handleTotalMem = (_, m) => {
      const used = m["used"] - m["cached"] - m["buffers"];

      return `${formatBytes(used * 1024)} / ${formatBytes(m["total"] * 1024) }`;
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
      talos,
      handleMem,
      handleTotalMem,
      handleCPU,
      handleTotalCPU,
      handleProcs,
      context,
      sort,
      headers,
      sortReverse,
      formatBytes,
      processes: computed(() => {
        return [].concat(processes.value).sort((a, b) => {
          let res = 0;
          if(a[sort.value] > b[sort.value]) {
            res = 1;
          } else if(a[sort.value] < b[sort.value]) {
            res = -1;
          }

          return sortReverse.value ? -1 * res : res;
        });
      }),
      sortBy: (id) => {
        if(id === sort.value)
          sortReverse.value = !sortReverse.value
        else
          sortReverse.value = true;

        sort.value = id;
      }
    }
  }
};
</script>
<style scoped>
.monitor {
  @apply flex flex-col justify-start;
}
.monitor__charts-box {
  @apply flex flex-col overflow-hidden;
  padding-bottom: 0 !important;
}
.monitor__charts-wrapper {
  @apply flex flex-1 gap-2 mb-6;
}
.monitor__charts-wrapper:last-of-type {
  @apply mb-0;
}
.monitor__chart {
  @apply flex-1 bg-naturals-N2 rounded p-3 pt-4;
  min-height: 220px;
}
.monitor__chart:nth-child(1) {
  @apply mr-3;
}
.monitor__chart:nth-child(2) {
  @apply ml-3;
}
.monitor__chart--wide {
  @apply border-b border-naturals-N5;
  margin-right: 0 !important;
  padding-bottom: 29px;
  border-radius: 4px 4px 0 0;
}
.monitor__data-wrapper {
  @apply px-2 lg:px-8 py-5 text-xs text-naturals-N13 flex-1 flex flex-col overflow-hidden w-full bg-naturals-N2;
}
.monitor__data-box {
  @apply flex-1 overflow-x-auto py-3 bg-naturals-N2;
}
.ok {
  @apply h-5 w-5 text-green-400;
}

.error {
  @apply h-5 w-5 text-red-600;
}
</style>
