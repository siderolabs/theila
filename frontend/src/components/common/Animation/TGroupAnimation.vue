<template>
  <transition-group>
    <slot />
  </transition-group>
</template>

<style>
.v-item {
  opacity: 1;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.1s linear;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
