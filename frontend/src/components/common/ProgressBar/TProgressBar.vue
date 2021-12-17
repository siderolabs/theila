<template>
  <div
    class="bar"
    @mouseenter="() => (isLogsBoxVisible = true)"
    @mouseleave="() => (isLogsBoxVisible = false)"
  >
    <Popper
      offsetDistance="20"
      class="bar__popper"
      placement="left"
      :show="isLogsBoxVisible"
    >
      <button class="bar__popper-button">
        <t-animation>
          <div
            class="bar__logs-arrow"
            v-if="!!progressLogs"
            v-show="isLogsBoxVisible"
          />
        </t-animation>
        <div class="bar__line">
          <div
            class="bar__color-line"
            :style="{ transform: `translate(-${100 - currentPosition}%)` }"
          >
            <div class="bar__circle" />
          </div>
        </div>
        <div class="bar__counter">{{ currentPosition }}%</div>
      </button>
      <template #content>
        <div class="bar__logs" v-if="!!progressLogs">
          <div class="bar__logs-wrapper">
            <p class="bar__logs-header">
              Pods for
              <span class="bar__logs-header--light">{{
                progressLogs?.title
              }}</span>
            </p>
            <div class="bar__logs-box">
              <div>
                <div
                  class="bar__log"
                  v-for="(log, idx) in progressLogs?.logs"
                  :key="idx"
                >
                  <div class="bar__log-name">
                    {{ log?.name }}
                  </div>
                  <t-status class="bar__log-status" :iconType="log?.status" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Popper>
  </div>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";
import TStatus from "../Status/TStatus.vue";
import Popper from "vue3-popper";
import TAnimation from "../Animation/TAnimation.vue";

export default {
  components: { TStatus, Popper, TAnimation },
  props: {
    maxValue: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
    progressLogs: {},
  },
  setup(props) {
    const { currentValue, maxValue } = toRefs(props);
    const isLogsBoxVisible = ref(false);
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
      isLogsBoxVisible,
    };
  },
};
</script>

<style scoped>
.bar {
  @apply flex items-center w-full relative;
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
.bar__logs {
  @apply bg-naturals-N3 rounded z-20 border border-naturals-N5 transition-all duration-300;
  width: 320px;
  height: 230px;
}
.bar__logs-wrapper {
  @apply w-full h-full relative z-10 pr-1;
}
.bar__logs-arrow {
  @apply w-2 h-2 bg-naturals-N3 border-r border-t border-naturals-N5 absolute transition-all;
  animation-duration: 0.22s;
  z-index: 0;
  left: -24px;
  transform: rotate(45deg);
  border-radius: 1px;
}
.bar__logs-header {
  @apply text-xs font-normal text-naturals-N9 px-3 py-4 border-b border-naturals-N5;
}
.bar__logs-header--light {
  @apply text-naturals-N14;
}
.bar__logs-box {
  @apply w-full px-3 py-3 overflow-y-scroll z-10;
  height: 165px;
}
.bar__log {
  @apply w-full flex justify-between items-center;
}
.bar__log:not(:last-of-type) {
  margin-bottom: 7px;
}
.bar__log-name {
  @apply text-xs font-normal text-naturals-N9;
}
.bar__popper {
  @apply w-full;
}
.bar__popper-button {
  @apply flex w-full items-center cursor-default relative;
}
</style>
