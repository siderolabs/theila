<template>
  <div class="label">
    <t-icon class="label__icon" :class="iconType" :icon="iconType" />
  </div>
</template>

<script lang="ts">
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TIcon },
  props: {
    iconType: {
      validator(value: string) {
        return (
          ["complete", "attention", "in-progress", "waiting"].indexOf(value) !==
          -1
        );
      },
      default: "complete",
    },
  },
};
</script>

<style scoped>
.label__icon {
  width: 21px;
  height: 21px;
}
.attention {
  @apply fill-current text-red-R1;
}
.waiting {
  @apply fill-current text-naturals-N7;
}
.complete {
  @apply fill-current text-green-G2;
}
.in-progress {
  @apply fill-current text-yellow-Y2;
}
</style>
