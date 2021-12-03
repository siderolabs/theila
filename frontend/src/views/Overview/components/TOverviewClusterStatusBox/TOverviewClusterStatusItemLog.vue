<template>
  <t-animation name="slide-fade">
    <ul class="logs">
      <t-system-log :date="date" :time="time" :info="info" :isError="isError" />
    </ul>
  </t-animation>
</template>

<script lang="ts">
import TSystemLog from "@/components/common/SystemLog/TSystemLog.vue";
import TAnimation from "@/components/common/Animation/TAnimation.vue";

export default {
  components: { TAnimation, TSystemLog },
  props: {
    date: String,
    time: String,
    info: String,
    isError: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scpoed>
.logs {
  @apply w-full flex-col;
}
</style>
