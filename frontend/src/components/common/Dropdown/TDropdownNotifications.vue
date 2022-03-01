<template>
  <div v-click-outside="onClickOutside" class="dropdown__wrapper">
    <div class="dropdown" @click="() => toggleDropdown()">
      <icon-header-dropdown-loading v-if="hasLoader" :isLoading="isLoading" />
      <span class="dropdown__name">{{ title }}</span>
      <t-icon
        class="dropdown__icon"
        :class="isDropdownOpen && 'dropdown__icon--open'"
        icon="arrow-down"
      />
    </div>
    <t-animation>
      <div v-show="isDropdownOpen" class="dropdown__list">
        <slot />
      </div>
    </t-animation>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "../Icon/TIcon.vue";
import IconHeaderDropdownLoading from "../../icons/IconHeaderDropdownLoading.vue";
import TAnimation from "../Animation/TAnimation.vue";
import vClickOutside from "click-outside-vue3";

export default {
  components: {
    TIcon,
    IconHeaderDropdownLoading,
    TAnimation,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    tasksList: {
      type: Array,
    },
    title: {
      type: String,
    },
    hasLoader: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };
    const onClickOutside = () => {
      isDropdownOpen.value = false;
    };

    return {
      toggleDropdown,
      isDropdownOpen,
      onClickOutside,
    };
  },
};
</script>

<style scoped>
.dropdown {
  @apply flex justify-start items-center cursor-pointer;
}
.dropdown__wrapper {
  @apply relative  z-40;
}
.dropdown__icon {
  @apply mr-2 flex justify-center items-center fill-current text-naturals-N13 transition-all duration-300;
  width: 16px;
  height: 16px;
}
.dropdown__icon--open {
  transform: rotateX(-180deg);
}
.dropdown__name {
  @apply text-naturals-N13 text-xs font-normal mr-2;
}
.dropdown__list {
  @apply absolute -right-2 top-6 bg-naturals-N2 border border-naturals-N4 rounded z-30;
}

@keyframes loadingDots {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    ransform: translateY(0);
  }
}
</style>
