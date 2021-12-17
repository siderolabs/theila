<template>
  <div class="wrapper">
    <div class="wrapper__box">
      <div class="wrapper__head">
        <slot name="head" />
      </div>
      <div class="wrapper__body-box">
        <div
          class="wrapper__body"
          :style="{
            'max-height': `${isSliderOpened ? maxHeight : 0}px`,
          }"
        >
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxHeight: {
      type: Number,
      required: true,
    },
    isSliderOpened: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.wrapper {
  @apply w-full flex flex-col;
}

.wrapper__body {
  transition: 0.3s ease-in-out max-height;
  overflow: hidden;
}
.wrapper__body-box {
  position: relative;
}
</style>
