<template>
  <label class="input-box">
    <t-icon class="input-box__icon" icon="search" />
    <input type="text" class="input-box__input" />
  </label>
</template>

<script lang='ts'>
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TIcon },
};
</script>

<style scoped>
.input-box {
  @apply flex justify-start items-center p-2 border border-naturals-N8 rounded h-8;
}
.input-box__icon {
  @apply fill-current text-naturals-N14 mr-2;
  flex-basis: 16px;
  height: 16px;
}
.input-box__input {
  @apply bg-transparent border-none w-full text-naturals-N13 focus:outline-none  focus:border-transparent text-xs;
}
</style>
