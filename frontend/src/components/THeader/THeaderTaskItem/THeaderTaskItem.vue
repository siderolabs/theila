<template>
  <div class="dropdown__item item">
    <div class="item__heading" :class="{ 'mb-1': description.length > 0 }">
      <h3 class="item__title">{{ title }}</h3>
      <span class="item__time">{{
        DateTime.fromISO(time).toFormat("HH:mm:ss")
      }}</span>
    </div>
    <p v-if="description.length > 0" class="item__description truncate">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts">
import { DateTime } from "luxon";
export default {
  props: {
    title: {
      type: String,
    },
    time: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  setup() {
    return {
      DateTime,
    };
  },
};
</script>

<style scoped>
.item {
  @apply border-b border-naturals-N4 p-6;
  width: 361px;
}
.item__heading {
  @apply flex justify-between items-center;
}
.item__title {
  @apply text-xs text-naturals-N13 w-9/12;
}
.item__time {
  @apply text-xs text-naturals-N9 w-3/12 text-right;
}
.item__description {
  @apply text-xs text-naturals-N9;
}
</style>
