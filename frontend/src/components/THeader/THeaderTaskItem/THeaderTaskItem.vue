<template>
  <div class="dropdown__item item">
    <div class="item__heading">
      <h3 class="item__title">{{ title }}</h3>
      <span class="item__time">{{ time }}</span>
    </div>
    <p class="item__description truncate">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    time: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>

<style scoped>
.item {
  @apply border-b border-naturals-N4 p-6;
  width: 361px;

}
.item__heading {
  @apply flex justify-between mb-2;
}
.item__title {
  @apply text-xs text-naturals-N13 w-9/12;
}
.item__time {
  @apply text-xs text-naturals-N9 w-3/12 text-right;
}
.item__description {
  @apply text-xs text-naturals-N9;
}
</style>
