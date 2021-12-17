<template>
  <div class="upgrade__heading">
    <div class="upgrade__heading-left">
      <h2 class="upgrade__heading-title">Upgrades history</h2>
      <span class="upgrade__heading-title">/</span>
      <span class="upgrade__heading-data"
        >Upgrade from {{ upgradeFrom }} to {{ upgradeTo }}</span
      >
    </div>
    <div class="upgrade__heading-right">
      <div v-show="!!startedAt" class="upgrade__heading-started">
        <span class="upgrade__heading-started-title">Started At:</span>
        <span class="upgrade__heading-started-value">{{ startedAt }}</span>
      </div>
      <div class="upgrade__heading-duration">
        <span class="upgrade__heading-duration-title">Duration:</span>
        <span class="upgrade__heading-duration-value">{{ duration }}</span>
      </div>
      <t-button v-show="!!!startedAt" class="upgrade__heading-button"
        >Abort</t-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "@/components/common/Button/TButton.vue";
export default {
  components: { TButton },
  props: {
    upgradeFrom: String,
    upgradeTo: String,
    duration: String,
    startedAt: String,
  },
};
</script>

<style scoped>
.upgrade__heading {
  @apply flex w-full h-auto justify-between mb-5 lg:flex-row flex-col;
}
.upgrade__heading-left {
  @apply flex lg:mb-0 lg:pr-4 pr-0 mb-3;
}
.upgrade__heading-right {
  @apply flex;
}
.upgrade__heading-title {
  @apply text-xl text-naturals-N9 font-medium mr-2;
}
.upgrade__heading-data {
  @apply text-xl text-naturals-N14 font-medium;
}
.upgrade__heading-duration {
  @apply flex items-center;
}
.upgrade__heading-duration-title {
  @apply text-xs text-naturals-N9 font-normal mr-1;
  font-size: 14px;
}
.upgrade__heading-duration-value {
  @apply text-xs text-naturals-N14 font-normal mr-4;
  font-size: 14px;
}
.upgrade__heading-started {
  @apply flex items-center mr-6;
}
.upgrade__heading-started-title {
  @apply text-xs text-naturals-N9 font-normal mr-1;
  font-size: 14px;
}
.upgrade__heading-started-value {
  @apply text-xs text-naturals-N14 font-normal mr-4;
  font-size: 14px;
}
</style>
