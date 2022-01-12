<template>
  <div class="checkbox__wrapper">
    <div class="checkbox" :class="{ checked: checked }">
      <t-animation>
        <t-icon class="checkbox__icon" icon="check" v-show="checked" />
      </t-animation>
      <input type="checkbox" hidden :value="checked" />
    </div>
    <span v-if="!!label" class="checkbox__label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
export default {
  components: {
    TIcon,
    TAnimation,
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
};
</script>

<style scoped>
.checkbox {
  @apply border border-naturals-N7 flex items-center justify-center cursor-pointer;
  width: 14px;
  height: 14px;
  border-radius: 2px;
}
.checkbox__wrapper {
  @apply flex items-center cursor-pointer;
}
.checkbox__label {
  @apply text-xs text-naturals-N11 block min-w-max;
  padding-left: 8px;
}
.checked {
  @apply border-primary-P6 bg-primary-P6;
}
.checkbox__icon {
  @apply fill-current text-primary-P3;
  width: 14px;
  height: 14px;
}
</style>
