<template>
  <div class="notification" :class="'notification--' + type">
    <div class="notification__wrapper">
      <t-icon
        v-if="type === 'in-progress'"
        class="notification__icon notification__in-progress-icon"
        icon="loading"
      />
      <t-icon
        v-if="type === 'error'"
        class="notification__icon notification__error-icon"
        icon="error"
      />
      <div class="notification__content-box">
        <h2
          class="notification__title"
          :class="type === 'error' && 'notification__title--error'"
        >
          {{ title }}
        </h2>
        <p class="notification__description">{{ description }}</p>
      </div>
    </div>
    <div class="notification__button-box">
      <t-button
        type="subtle"
        icon="arrow-right"
        iconPosition="right"
        class="notification__left-button"
        @click="$emit('onLeftButtonClick')"
      >
        View details</t-button
      >
      <t-button
        type="primary"
        class="notification__right-button"
        @click="$emit('onRightButtonClick')"
        >{{ buttonTitle }}</t-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "../Button/TButton.vue";
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TButton, TIcon },
  props: {
    type: {
      validator(value: string) {
        return ["error", "in-progress"].indexOf(value) !== -1;
      },
      default: "in-progress",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    buttonTitle: {
      validator(value: string) {
        return ["Dismiss", "Abort"].indexOf(value) !== -1;
      },
      default: "Dismiss",
    },
    onLeftButtonClick: {
      type: Function,
    },
    onRightButtonClick: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.notification {
  @apply w-full flex justify-between items-center py-4 px-6 bg-naturals-N0 rounded;
  min-height: 65px;
}
.notification--in-progress {
  @apply border-l-4 border-yellow-Y3;
}
.notification--error {
  @apply border-l-4 border-red-R2;
}
.notification__wrapper {
  @apply flex items-center;
}
.notification__button-box {
  @apply flex items-center;
}
.notification__icon {
  @apply mr-5 fill-current;
  width: 20px;
  height: 20px;
}
.notification__in-progress-icon {
  @apply text-yellow-Y1 animate-spin;
}
.notification__error-icon {
  @apply text-red-R1;
}
.notification__title {
  @apply text-sm font-medium text-naturals-N14;
}
.notification__title--error {
  @apply text-red-R1;
}
.notification__description {
  @apply text-xs text-naturals-N9;
}
.notification__left-button {
  @apply mr-6 whitespace-nowrap;
}
</style>
