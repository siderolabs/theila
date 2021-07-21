<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <Menu as="div" class="relative w-full">
      <menu-button as="template" :disabled="disabled">
        <t-button :xs="xs" :small="small" :disabled="disabled" class="w-full">
          <div class="flex-1" v-if="title">{{ title }}</div>
          <slot name="icon" v-if="$slots.icon"></slot>
          <chevron-down-icon v-else class="w-5 h-5 ml-2 -mr-1" aria-hidden="true"/>
        </t-button>
      </menu-button>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
        >
        <menu-items class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-transparent rounded-md shadow-lg dark:bg-talos-gray-800 dark:border-talos-gray-600 dark:border-opacity-50 ring-1 ring-black ring-opacity-5 focus:outline-none" style="z-index: 100">
          <div class="px-1 py-1 dropdown-items">
            <slot></slot>
          </div>
        </menu-items>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts">
import {
  ChevronDownIcon,
} from '@heroicons/vue/solid';
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import TButton from './TButton.vue';

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    ChevronDownIcon,
    TButton,
  },

  props: {
    title: String,
    icon: Object,
    small: Boolean,
    xs: Boolean,
    disabled: Boolean,
  }
};
</script>

<style>
.dropdown-items a {
  @apply block px-4 py-2 text-sm text-talos-gray-700 dark:text-talos-gray-50 cursor-default;
}

.dropdown-items a.active {
  @apply bg-talos-gray-100 dark:bg-talos-gray-900 text-talos-gray-700 dark:text-talos-gray-50;
}
</style>
