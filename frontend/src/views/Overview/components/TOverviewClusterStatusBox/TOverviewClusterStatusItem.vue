<template>
  <div class="item__wrapper">
    <div class="item">
      <div class="item__title-box">
        <h3 class="item__title">
          {{ title }}
        </h3>
        <t-icon class="item__icon" icon="info" />
      </div>
      <div class="item__middle">{{ subtitle }}</div>
      <div class="item__status" :class="{ false: !status }">
        <span>{{ status ? "true" : "Error" }}</span>
        <t-icon
          v-if="!status"
          @click="() => (isDropdownOpened = !isDropdownOpened)"
          class="item__arrow"
          :class="{ 'item__arrow-right--pushed': isDropdownOpened }"
          icon="drop-up"
        />
      </div>
    </div>
    <t-overview-cluster-status-item-log
      v-show="isDropdownOpened"
      v-for="(log, idx) in logs"
      :key="idx"
      :date="log.date"
      :time="log.time"
      :info="log.info"
      :isError="log.isError"
    />
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TOverviewClusterStatusItemLog from "./TOverviewClusterStatusItemLog.vue";

export default {
  components: { TIcon, TOverviewClusterStatusItemLog },
  props: {
    title: String,
    subtitle: String,
    status: {
      type: Boolean,
      default: false,
    },
    logs: [],
  },
  setup() {
    const isDropdownOpened = ref(false);
    return {
      isDropdownOpened,
    };
  },
};
</script>

<style scoped>
.item {
  @apply flex w-full;
  padding: 13px 24px;
}
.item__wrapper {
  @apply w-full;
}
.item__wrapper:not(:last-of-type) {
  @apply border-b border-naturals-N4;
}
.item__title-box {
  @apply flex items-center justify-start;
  width: 70%;
}
.item__title {
  @apply text-xs text-naturals-N9;
  margin-right: 6px;
}
.item__icon {
  @apply fill-current text-naturals-N9;
  width: 16px;
  height: 16px;
}
.item__middle {
  @apply text-xs text-naturals-N9;
  width: 20%;
}
.item__status {
  @apply text-xs text-green-G1 flex items-center justify-between;
  width: 10%;
}
.false {
  @apply text-red-R1;
}
.item__arrow {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer;
  transform: rotate(-180deg);
  width: 24px;
  height: 24px;
}
.item__arrow-right--pushed {
  transform: rotate(0deg);
}
</style>
