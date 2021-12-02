<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2 mb-2">
      <t-breadcrumbs>{{ $route.params.node }} Overview</t-breadcrumbs>
    </div>
    <div class="p-4 flex-1 flex flex-col overflow-hidden">
      <div class="flex flex-1 gap-2">
        <div class="flex-1">
          <t-chart
             class="h-full"
             name="cpu"
             title="CPU Utilization"
             type="area"
             talos
             :resource="{type: talos.cpu, namespace: talos.perfNamespace, tail_events: 25}"
             :context="context"
             :point-fn="handleCPU"
          />
        </div>
        <div class="flex-1">
          <t-chart
             class="h-full"
             name="mem"
             title="Memory Usage"
             type="area"
             talos
             :resource="{type: talos.mem, namespace: talos.perfNamespace, tail_events: 25}"
             :context="context"
             :point-fn="handleMem"
          />
        </div>
      </div>
      <div class="flex flex-1 gap-2">
        <div class="flex-1">
          <t-chart
             class="h-full"
             name="procs"
             title="Processes"
             type="area"
             talos
             :resource="{type: talos.cpu, namespace: talos.perfNamespace, tail_events: 25}"
             :context="context"
             :point-fn="handleProcs"
          />
        </div>
      </div>
    </div>
    <h4>Process List</h4>
    <div class="p-2 text-xs flex-1 flex flex-col overflow-hidden">
      <div class="grid grid-cols-12 uppercase font-bold select-none">
        <div v-for="h in headers" @click="() => sortBy(h.id)" :key="h.id" class="flex flex-row items-center cursor-pointer gap-1">
          <span>{{ h.header || h.id }}</span>
          <arrow-down-icon class="w-3 h-3" :class="{ transform: sortReverse, 'rotate-180': sortReverse }" v-if="sort === h.id"/>
        </div>
      </div>
      <div class="flex-1 overflow-x-auto">
        <div class="grid grid-cols-12" v-for="process in processes" :key="process.pid">
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
            {{ humanizeBytes(process.virtualMemory) }}
          </div>
          <div>
            {{ humanizeBytes(process.residentMemory) }}
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
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import TChart from '../../components/TChart.vue';
import {
  ArrowDownIcon,
} from '@heroicons/vue/solid';
import { talos } from '../../api/resources';

function humanizeBytes(size) {
  var gb = Math.pow(1024, 3);
  var mb = Math.pow(1024, 2);
  var kb = 1024;

  if (size >= gb)
    return Math.floor(size / gb) + ' GB';
  else if (size >= mb)
    return Math.floor(size / mb) + ' MB';
  else if (size >= kb)
    return Math.floor(size / kb) + ' KB';
  else
    return size + ' B';
}

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
    ArrowDownIcon,
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

    const handleMem = (_, m) => {
      const used = m["used"] - m["cached"] - m["buffers"]

      memTotal = m["total"];

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
      talos,
      handleMem,
      handleCPU,
      handleProcs,
      context,
      sort,
      headers,
      sortReverse,
      humanizeBytes,
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
.ok {
  @apply h-5 w-5 text-green-400;
}

.error {
  @apply h-5 w-5 text-red-600;
}
</style>
