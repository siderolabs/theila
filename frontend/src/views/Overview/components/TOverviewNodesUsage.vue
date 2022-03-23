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
import { Kind } from "@/api/socket/message";
import Watch from "@/api/watch";

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
    const point = ref({ user: 0, system: 0 });

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

      point.value = handleCPU(spec["new"]["spec"], spec["old"]["spec"]);
    };

    const w = new Watch(ctx.api, null, handlePoint);

    w.setup({ ...props, context }, componentContext);

    const currentCPUUsage = computed(() => {
      if (!point.value) {
        return 0;
      }

      const total = point.value.user + point.value.system;
      componentContext.emit("cpu", { cpu: total.toFixed(2), index: index.value });

      return total.toFixed(2);
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
