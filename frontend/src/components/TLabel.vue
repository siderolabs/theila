<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <span :class="{tag: true, red: col === 'red', gray: col === 'gray', green: col === 'green'}">
    <span
      class="icon"
      :class="{ red: col === 'red', green: col === 'green' }"
      v-if="$slots.icon"
      >
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  props: {
    col: {
      type: String,
      default: "gray",
      validator(val) {
        return ["red", "green", "gray"].includes(val);
      }
    }
  }
};
</script>

<style scoped>
.tag {
  @apply font-normal inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm leading-4 tracking-wider whitespace-nowrap;
}

.gray {
  @apply bg-talos-gray-200 text-talos-gray-800 dark:bg-talos-gray-700 dark:text-talos-gray-100;
}

.red {
  @apply bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100;
}

.green {
  @apply bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100;
}

.icon {
  @apply mr-1;
}

.icon.green {
  @apply text-green-400 dark:text-green-300;
}

.icon.red {
  @apply text-red-400 dark:text-red-300;
}
</style>
