<template>
  <div class="item">
    <span class="item__title">{{ item?.metadata?.name }}</span>
    <span class="item__id">{{ ip }}</span>
    <div class="item__cpu">
      <span class="item__cpu--light">{{ currentCPUUsage }}%</span>
      <span>CPU Utilization</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";
import { getField } from "@/methods";
import { getContext, context as ctx } from "@/context";
import Watch from "@/api/watch";
import { Kind } from "@/api/socket/message";
import { DateTime } from "luxon";
export default {
  props: {
    item: Object,
    index: Number,
    resource: {
      type: Object,
      required: true,
    },
    context: Object,
    talos: Boolean,
    kubernetes: Boolean,
  },
  emits: ["cpu"],
  setup(props, componentContext) {
    const { item, index } = toRefs(props);
    const series: any = ref([]);
    const seriesMap: any = {};
    let points: any = {};
    let flush: any = {};

    const numPoints = ref(props["resource"]["tail_events"] || 25);

    const ip = computed(() => {
      const addresses: any = getField(item.value, "status", "addresses");

      if (!addresses) return "unknown";

      let addr;
      for (const a of addresses) {
        if (a.type == "InternalIP") {
          addr = a.address;
        }

        if (a.type == "ExternalIP") {
          addr = a.address;
          break;
        }
      }

      return addr;
    });

    const context = getContext();
    context.nodes.push(ip.value);

    function diff(a, b) {
      const result = {};

      for (const key in a) {
        const left = a[key];
        const right = b[key];

        const tleft = typeof left;
        const tright = typeof right;

        if (tleft !== tright) {
          continue;
        }

        if (tleft === "object") result[key] = diff(left, right);
        else result[key] = left - right;
      }

      return result;
    }

    const sum = (obj, ...args) => {
      let res = 0;
      for (const k of args) {
        res += obj[k] || 0;
      }

      return res;
    };

    const getCPUTotal = (stat) => {
      const idle = sum(stat, "idle", "iowait");
      const nonIdle = sum(
        stat,
        "user",
        "nice",
        "system",
        "irq",
        "steal",
        "softIrq"
      );

      return idle + nonIdle;
    };

    const handleCPU = (oldObj, newObj) => {
      const delta = diff(oldObj, newObj);
      const stat = delta["cpuTotal"];
      const total = getCPUTotal(stat);

      return {
        system: (stat["system"] / total) * 100,
        user: (stat["user"] / total) * 100,
      };
    };

    const handlePoint = (message, spec) => {
      if (message.kind != Kind.EventItemUpdate) {
        return;
      }

      const data = handleCPU(spec["new"]["spec"], spec["old"]["spec"]);
      for (const key in data) {
        if (!(key in seriesMap)) {
          series.value.push({
            name: key,
            data: [],
          });

          seriesMap[key] = {
            index: series.value.length - 1,
            version: 0,
          };
        }

        const version = spec["new"]["metadata"]["version"];
        const meta = seriesMap[key];
        if (version <= meta.version) {
          continue;
        }

        let point = data[key];
        const updated = spec["new"]["metadata"]["updated"];
        if (updated) {
          point = [DateTime.fromISO(updated).toMillis(), point];
        }

        clearTimeout(flush[meta.index]);

        if (!points[meta.index]) points[meta.index] = [];

        points[meta.index].push(point);
        meta.version = version;

        flush[meta.index] = setTimeout(() => {
          let dst = series.value[meta.index].data;

          dst = dst.concat(points[meta.index]);

          if (dst.length >= numPoints.value) {
            dst.splice(0, dst.length - numPoints.value + 1);
          }

          series.value[meta.index].data = dst;
          points[meta.index] = [];
        }, 50);
      }
    };

    const w = new Watch(ctx.api, null, handlePoint);

    w.setup({ ...props, context }, componentContext);

    const currentCPUUsage = computed(() => {
      const data = series.value[1]?.data?.at(-1)?.at(1).toFixed(2) ?? 0;
      componentContext.emit("cpu", { cpu: data, index: index.value });
      return data;
    });

    return {
      ip,
      currentCPUUsage,
    };
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
