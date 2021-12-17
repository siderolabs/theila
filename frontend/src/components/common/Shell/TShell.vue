<template>
  <div class="shell">
    <div
      class="shell__menu"
      :class="{ 'shell__menu--hidden': !isSidebarVisible }"
    >
      <slot name="menu"></slot>
    </div>
    <div class="shell__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const isSidebarVisible = computed(() => {
      return route.path !== "/dashboard";
    });
    return {
      isSidebarVisible,
    };
  },
};
</script>

<style>
.shell {
  @apply w-full h-auto flex bg-naturals-N0;
  min-height: calc(100vh - 52px);
}
.shell__content {
  @apply flex justify-start items-start w-full px-2 py-7 lg:px-6;
}
.shell__menu {
  transition: 0.4s ease all;
  position: relative;
}
.shell__menu--hidden {
  @apply z-10 absolute bottom-0;
  top: 52px;
  transform: translateX(-100%);
}
</style>
