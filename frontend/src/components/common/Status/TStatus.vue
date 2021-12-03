<template>
  <div class="label">
    <t-icon
      class="label__icon"
      :class="{ 'animate-spin': iconType === 'loading' }"
      :style="{ fill: !!color ? color : iconColor }"
      :icon="iconType"
    />
    <span class="label__title" :style="{ color: color }" v-if="title">{{
      title
    }}</span>
  </div>
</template>

<script lang="ts">
import { ref, toRef } from "@vue/reactivity";
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TIcon },
  props: {
    iconType: String,
    title: String,
    color: String,
  },
  setup(props) {
    const iconColor = ref("");
    const iconType = toRef(props, "iconType");

    switch (iconType.value) {
      case "check-in-circle-classic":
        iconColor.value = "#69C297";
        break;
      case "loading":
        iconColor.value = "#FFB200";
        break;
      case "time":
        iconColor.value = "#7D7D85";
        break;
      default:
        iconColor.value = "#7D7D85";
        break;
    }
    return {
      iconColor,
    };
  },
};
</script>

<style scoped>
.label {
  @apply flex items-center;
}
.label__icon {
  @apply fill-current;
  width: 16px;
  height: 16px;
}
.label__title {
  @apply pl-1 text-xs;
}
</style>
