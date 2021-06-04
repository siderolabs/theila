<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <input 
    type="text" 
    :class="{'py-2': !small, 'py-1': small, 'focus:border-blue-500': true, 'dark:focus:border-talos-blue-600': true}"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
export default {
  props: {
    placeholder: String,
    modelValue: String,
    small: Boolean,
  }
}
</script>

<style scoped>
input {
  @apply px-3 text-sm font-normal leading-5 bg-white dark:bg-black border rounded-md shadow-none appearance-none placeholder-talos-gray-400 dark:placeholder-talos-gray-500 text-talos-gray-700 dark:text-talos-gray-200 border-talos-gray-300 dark:border-talos-gray-600 sm:max-w-xs focus:outline-none focus:ring ring-blue-200 dark:ring-gray-700;
}
</style>
