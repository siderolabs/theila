<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="sm:flex sm:items-start p-5 max-w-2xl">
    <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10" :class="{ error: error, info: info, warning: warning }">
      <exclamation-icon v-if="error || warning" class="w-6 h-6" fill="currentColor"/>
      <information-circle-icon v-else class="w-6 h-6" fill="currentColor"/>
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 class="text-lg leading-6 font-medium text-talos-gray-900 dark:text-talos-gray-100" id="modal-title">{{ title }}</h3>
      <div class="mt-2">
        <p class="text-sm text-talos-gray-500 dark:text-talos-gray-300">{{ body }}</p>
      </div>
    </div>
  </div>
  <div class="bg-talos-gray-50 dark:bg-talos-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
    <t-button small primary @click="close">Dismiss</t-button>
  </div>
</template>

<script lang="ts">
import {
  ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/vue/outline';
import { modal } from '../modal';
import TButton from './TButton.vue';

export default {
  components: {
    ExclamationIcon,
    InformationCircleIcon,
    TButton,
  },

  props: {
    title: String,
    body: String,
    error: Boolean,
    info: Boolean,
    warning: Boolean,
  },

  setup() {
    return {
      close() {
        modal.value = null;
      }
    }
  },
}
</script>

<style scoped>
.warning {
  @apply text-yellow-400  bg-yellow-400 bg-opacity-20;
}

.error {
  @apply bg-red-100 dark:bg-red-300 text-red-600 dark:bg-opacity-20;
}

.info {
  @apply bg-blue-400 dark:bg-blue-300 text-blue-400 dark:text-blue-300 bg-opacity-20;
}
</style>

