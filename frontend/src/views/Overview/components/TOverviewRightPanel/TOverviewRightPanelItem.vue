<template>
  <div class="overview__deatils-item">
    <div class="overview__item-name">{{ name }}</div>
    <div class="overview__item-value">
      <span>{{ value }}</span> <slot />
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
  @apply w-full flex justify-between items-center;
  margin-bottom: 19px;
}
.overview__item-name {
  @apply text-xs text-naturals-N11;
}
.overview__item-value {
  @apply text-xs text-naturals-N13 flex items-center;
}
.overview__item-value span {
  margin-right: 2px;
}
</style>
