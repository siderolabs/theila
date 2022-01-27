<template>
  <div
    v-click-outside="() => (isActionsDropdownOpened = false)"
    class="box__actions"
    ref="settingsButton"
  >
    <Popper offsetDistance="10" placement="left-start" zIndex="10">
      <template #content>
        <slot />
      </template>
      <button>
        <t-icon
          @click="() => (isActionsDropdownOpened = !isActionsDropdownOpened)"
          class="box__actions-icon"
          icon="action-horizontal"
          :class="{ highlighted: isActionsDropdownOpened }"
        />
      </button>
    </Popper>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "@/components/common/Icon/TIcon.vue";
import vClickOutside from "click-outside-vue3";
import Popper from "vue3-popper";
export default {
  components: { Popper, TIcon },
  directives: {
    clickOutside: vClickOutside.directive,
  },

  setup() {
    const isActionsDropdownOpened = ref(false);
    const settingsButton = ref(null);
    return {
      isActionsDropdownOpened,
      settingsButton,
    };
  },
};
</script>

<style scoped>
.box__actions-icon {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-100 cursor-pointer;
  width: 24px;
  height: 24px;
}
.highlighted {
  @apply bg-naturals-N7;
}
</style>
