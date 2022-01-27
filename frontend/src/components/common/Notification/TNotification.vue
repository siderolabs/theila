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
      <t-icon
        v-if="type === 'success'"
        class="notification__icon notification__success-icon"
        icon="check-in-circle-classic"
      />
      <div class="notification__content-box">
        <h2
          class="notification__title"
          :class="type === 'error' && 'notification__title--error'"
        >
          {{ title }}
        </h2>
        <p class="notification__description">{{ body }}</p>
      </div>
    </div>
    <div class="notification__button-box">
      <!-- Todo -->
      <!-- <t-button
        type="subtle"
        icon="arrow-right"
        iconPosition="right"
        class="notification__left-button"
        @click="$emit('onLeftButtonClick')"
      >
        View details</t-button
      > -->
      <t-button
        type="primary"
        class="notification__right-button"
        @click="
          () => {
            abort ? abort() : close();
          }
        "
        >{{ buttonTitle }}</t-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "../Button/TButton.vue";
import TIcon from "../Icon/TIcon.vue";
import { modal } from "@/modal";
import { useRoute, useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  components: { TButton, TIcon },
  props: {
    type: {
      validator(value: string) {
        return (
          ["error", "in-progress", "success", "info"].indexOf(value) !== -1
        );
      },
      default: "in-progress",
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    abort: {
      type: Function,
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
  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.query,
      () => {
        modal.value = null;
      }
    );
    return {
      close() {
        if (route.query.modal) router.go(-1);
        modal.value = null;
      },
    };
  },
};
</script>

<style scoped>
.notification {
  @apply w-full flex justify-between items-center py-4 px-6 bg-naturals-N0 rounded z-30 border border-naturals-N5;
  min-height: 65px;
}
.notification--in-progress {
  @apply border-l-4;
  --tw-border-opacity: 1;
  border-left-color: rgba(169, 120, 9, var(--tw-border-opacity));
}
.notification--error {
  @apply border-l-4;
  --tw-border-opacity: 1;
  border-left-color: rgba(110, 47, 48, var(--tw-border-opacity));
}
.notification--success {
  @apply border-l-4;
  border-left-color: #69c297;
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
.notification__success-icon {
  @apply text-green-G1;
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
