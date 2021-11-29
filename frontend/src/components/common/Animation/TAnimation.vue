<template>
  <transition :name="name">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "fade",
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
