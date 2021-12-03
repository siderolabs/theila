<template>
  <div class="info">
    <div class="info__wrapper">
      <t-icon class="info__icon" :icon="iconName" />
      <h3 class="info__title">
        {{ title }}
      </h3>
      <p class="info__subtitle">{{ subtitle }}</p>
      <router-link to="/dashboard">
        <t-button class="info__button" type="primary"
          >Back to Dashboard</t-button
        >
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import TButton from "@/components/common/Button/TButton.vue";
export default {
  components: { TButton, TIcon },
  props: {
    title: String,
    subtitle: String,
    iconName: String,
  },
};
</script>

<style scoped>
.info {
  @apply w-full flex justify-center items-center;
  height: calc(100vh - 110px);
}
.info__wrapper {
  @apply flex-col items-center justify-start;
}
.info__icon {
  margin: 40px auto;
}
.info__title {
  @apply text-xl text-naturals-N14 mb-3 text-center;
  font-size: 18px;
}
.info__subtitle {
  @apply text-xs text-naturals-N11 mb-9 text-center;
}
.info__button {
  margin: 0 auto;
}
</style>
