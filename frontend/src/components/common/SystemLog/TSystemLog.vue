<template>
  <li class="logs__item" :class="{ red: isError }">
    <div class="logs__icon-wrapper">
      <t-icon v-show="isError" class="logs__icon" icon="warning" />
    </div>
    <div class="logs__date">{{ date }}</div>
    <div class="logs__time">{{ time }}</div>
    <div class="logs__info">{{ info }}</div>
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
  @apply w-full flex items-center;
  padding: 13px 10px;
}
.logs__icon-wrapper {
  min-width: 16px;
  margin-right: 9px;
}
.logs__icon {
  @apply fill-current text-red-R1;
  width: 18px;
  height: 18px;
}
.logs__date {
  @apply text-xs text-naturals-N9 font-roboto;
  margin-right: 25px;
}
.logs__time {
  @apply text-xs text-naturals-N9 font-roboto;
  margin-right: 25px;
}
.logs__info {
  @apply text-xs text-naturals-N9 font-roboto;
}
</style>
