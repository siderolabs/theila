<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex items-center gap-2 text-talos-gray-800 hover:text-talos-gray-600 dark:text-talos-gray-400 dark:hover:text-talos-gray-300">
    <Switch
      v-model="checked"
      class="inline-flex justify-center items-center w-5 h-5 rounded-md border-2 border-talos-gray-800 dark:border-talos-gray-400 outline-none"
      >
      <check-icon v-if="checked" class="w-4 h-4 inline-block"/>
    </Switch>
    <div @click="() => { checked = !checked }" class="cursor-pointer uppercase text-sm select-none font-bold">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Switch } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default {
  components: {
    Switch,
    CheckIcon,
  },
  props: {
    modelValue: Boolean,
    label: String,
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, { emit }) {
    const checked = computed({ 
      get: () => props.modelValue, 
      set: (value) => emit('update:modelValue', value) 
    });

    return {
      checked,
    };
  }
};
</script>
