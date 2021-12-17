<template>
  <li class="logs__item" :class="{ red: isError }">
    <div class="logs__icon-wrapper">
      <t-icon v-show="isError" class="logs__icon" icon="warning" />
    </div>
    <div class="logs__message">
      <div>{{ date }}</div>
      <div>{{ time }}</div>
      <div>{{ info }}</div>
    </div>
  </li>
</template>

<script lang="ts">
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TIcon },
  props: {
    date: String,
    time: String,
    info: String,
    isError: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.red {
  @apply bg-red-R3;
}
.logs__item {
  @apply w-full flex items-start gap-3;
  padding: 8px 12px;
}
.logs__icon-wrapper {
  min-width: 18px;
}
.logs__icon {
  @apply fill-current text-red-R1;
  width: 18px;
  height: 18px;
}
.logs__message {
  @apply flex gap-6;
}
.logs__message > div {
  @apply text-xs text-naturals-N9 font-roboto;
}
</style>
