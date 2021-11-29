<template>
  <div class="bar">
    <div class="bar__line">
      <div
        class="bar__color-line"
        :style="{ transform: `translate(-${100 - currentPosition}%)` }"
      >
        <div class="bar__circle" />
      </div>
    </div>
    <div class="bar__counter">{{ currentPosition }}%</div>
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "@vue/reactivity";

export default {
  props: {
    maxValue: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { currentValue, maxValue } = toRefs(props);
    const currentPosition = computed(() =>
      +currentValue.value > +maxValue.value ||
      +currentValue.value < 0 ||
      +maxValue.value <= 0 ||
      isNaN(currentValue.value)
        ? 0
        : Math.round((+currentValue.value / +maxValue.value) * 100)
    );
    return {
      currentPosition,
    };
  },
};
</script>

<style scoped>
.bar {
  @apply flex items-center w-full;
  min-width: 352px;
}
.bar__line {
  @apply mr-2 overflow-hidden rounded bg-naturals-N5 w-full;
  height: 8px;
}
.bar__color-line {
  @apply w-full flex justify-end items-center h-full bg-green-G2 rounded transition-all;
}
.bar__circle {
  @apply rounded-full bg-naturals-N14;
  width: 8px;
  height: 8px;
}
.bar__counter {
  @apply text-xs font-normal text-naturals-N9;
}
</style>
