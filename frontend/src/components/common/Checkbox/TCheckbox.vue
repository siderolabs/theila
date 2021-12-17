<template>
  <div class="checkbox" :class="{ checked: checked }">
    <t-animation>
      <t-icon class="checkbox__icon" icon="check" v-show="checked" />
    </t-animation>
    <input type="checkbox" hidden :value="checked" />
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
.checked {
  @apply border-primary-P6 bg-primary-P6;
}
.checkbox__icon {
  @apply fill-current text-primary-P3;
  width: 14px;
  height: 14px;
}
</style>
