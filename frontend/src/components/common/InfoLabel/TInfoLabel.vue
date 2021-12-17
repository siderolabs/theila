<template>
  <div
    class="label"
    @mouseenter="() => (isInfoVisible = true)"
    @mouseleave="() => (isInfoVisible = false)"
  >
    <div v-if="!!label" class="label__text">{{ label }}</div>
    <div class="label__icon-wrapper">
      <t-icon class="label__icon" icon="info" />
      <t-animation>
        <div class="label__info-wrapper" v-show="isInfoVisible">
          <div class="label__info">
            {{ info }}
          </div>
        </div>
      </t-animation>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TIcon from "../Icon/TIcon.vue";
import TAnimation from "../Animation/TAnimation.vue";
export default {
  components: {
    TIcon,
    TAnimation,
  },
  props: {
    label: String,
    info: String,
  },
  setup() {
    const isInfoVisible = ref(false);
    return {
      isInfoVisible,
    };
  },
};
</script>

<style scoped>
.label {
  @apply flex items-center justify-start cursor-default;
}
.label__text {
  @apply text-xs text-naturals-N9 mr-1;
}
.label__icon {
  @apply w-4 h-4 fill-current text-naturals-N9 relative mr-3;
}
.label__icon-wrapper {
  @apply relative flex items-center justify-start;
}
.label__info {
  @apply px-3 py-2 bg-naturals-N3 border border-naturals-N4 rounded text-xs text-naturals-N10 flex justify-center items-center relative;
  width: 150px;
  z-index: 0;
}
.label__info::before {
  content: "";
  @apply w-3 h-3 bg-naturals-N3 border border-naturals-N4 absolute block border-r-0 border-t-0;
  border-radius: 1px;
  transform: rotate(45deg);
  left: -6px;
  top: calc(50% - 6px);
  z-index: -1;
}
.label__info-wrapper {
  @apply absolute;
  right: -155px;
}
</style>
