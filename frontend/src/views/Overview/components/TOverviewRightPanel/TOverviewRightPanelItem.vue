<template>
  <div class="overview__deatils-item">
    <div class="overview__item-name">{{ name }}</div>
    <div class="overview__item-value">
      <span class="overview__item-text">{{ value }}</span> <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String,
  },
};
</script>

<style scoped>
.overview__deatils-item {
  @apply w-full flex justify-between;
  margin-bottom: 19px;
  align-items: flex-start !important;
}
.overview__item-name {
  @apply text-xs text-naturals-N11;
  min-width: 40px;
}
.overview__item-value {
  @apply text-xs text-naturals-N13 flex items-start;
}
.overview__item-text {
  margin-right: 2px;
  text-align: right;
  word-break: break-all;
}
.overview__item-text svg {
  margin-right: 2px;
  text-align: right;
  word-break: break-all;
}
</style>
