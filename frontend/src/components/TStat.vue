<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div v-if="loading" class="flex flex-row justify-center items-center w-full h-full">
    <t-spinner/>
  </div>
  <div v-else class="flex items-center gap-4 p-5 overflow-hidden bg-white border rounded-lg shadow sm:py-6 border-talos-gray-300 dark:border-talos-gray-600 dark:bg-talos-gray-900">
    <div>
      <div class="p-3 bg-blue-600 rounded-md dark:bg-blue-800 bg-opacity-60 text-white dark:text-blue-400">
        <slot name="icon"/>
      </div>
    </div>
    <div>
      <p class="text-sm font-medium truncate text-talos-gray-500">{{ name }}</p>
      <transition
          enter-active-class="transition-all ease-out-in duration-500"
          enter-from-class="transform opacity-0 translate-x-2"
          enter-to-class="transform opacity-100 translate-x-0"
        >
        <div class="text-2xl font-semibold truncate text-talos-gray-900 dark:text-talos-gray-100" v-if="value">
          {{ value }}
        </div>
      </transition>
      <p class="text-2xl font-semibold truncate opacity-0" v-if="!value">None</p>
    </div>
  </div>
</template>

<script lang="ts">
import TSpinner from './TSpinner.vue';

export default {
  components: {
    TSpinner,
  },

  props: {
    name: String,
    value: Object,
    loading: Object,
  },

  setup(props) {
    return props 
  }
}
</script>

