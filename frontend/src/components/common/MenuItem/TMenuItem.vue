<template>
  <router-link :to="route" active-class="item__active">
    <div class="item">
      <t-icon class="item__icon" :icon="icon" />
      <p class="item__name">{{ name }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import TIcon from "../Icon/TIcon.vue";

export default {
  components: { TIcon },
  props: {
    route: {
      type: [String, Object],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.item {
  @apply flex border-l-2 border-transparent justify-start items-center mb-4 px-6 transition-all duration-200;
}
.item:hover .item__icon {
  @apply text-naturals-N12;
}
.item:hover .item__name {
  @apply text-naturals-N12;
}
.item__active .item {
  @apply border-primary-P3;
}
.item__active .item__icon {
  @apply fill-current text-naturals-N13;
}
.item__active .item__name {
  @apply fill-current text-naturals-N13;
}
.item__icon {
  @apply fill-current text-naturals-N10 mr-4 transition-all duration-200;
  width: 16px;
  height: 16px;
}
.item__name {
  @apply text-xs text-naturals-N10 transition-all duration-200;
}
</style>
