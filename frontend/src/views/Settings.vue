<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="py-5 w-full max-w-3xl">
    <div class="px-5">
      <h3 class="mb-2 text-lg leading-6 font-medium text-talos-gray-900 dark:text-talos-gray-100" id="modal-title">Settings</h3>
    </div>
    <shell color-style="inverted" sidebar-width="12rem" class="px-2">
      <template v-slot:menu>
        <shell-menu-item name="Appearance" active="true">
          <template v-slot:icon>
            <eye-icon class="w-6 h-6"/>
          </template>
        </shell-menu-item>
      </template>
      <template v-slot:content>
        <fieldset>
          <legend class="sr-only">Theme setting</legend>
          <div class="bg-white dark:bg-talos-gray-900 rounded-md -space-y-px form-radio-group">
            <label v-for="opt in options" :key="opt.value" class="border-talos-gray-200 dark:border-talos-gray-600 relative border p-4 flex cursor-pointer">
              <input type="radio" v-model="theme" name="theme_setting" :value="opt.value" class="h-4 w-4 mt-0.5 cursor-pointer text-blue-600 border-talos-gray-300 focus:ring-blue-500" aria-labelledby="theme-setting-0-label" aria-describedby="theme-setting-0-description" />
              <div class="ml-3 flex flex-col">
                <span id="theme-setting-0-label" class="text-talos-gray-900 dark:text-talos-gray-100 block text-sm font-medium"> {{ opt.label }} </span>
                <span id="theme-setting-0-description" class="text-talos-gray-900 dark:text-talos-gray-100 block text-sm"> {{ opt.description }} </span>
              </div>
            </label>
          </div>
        </fieldset>
      </template>
    </shell>
  </div>
</template>

<script lang="ts">
import Shell from '../components/Shell.vue';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import { theme } from '../theme';
import {
  EyeIcon,
} from '@heroicons/vue/outline';

export default {
  components: {
    Shell,
    ShellMenuItem,
    EyeIcon,
  },

  setup() {
    return {
      theme,
      options: [
        {
          label: "Light Theme",
          value: "light",
          description: "The default theme for the Sidero application.",
        },
        {
          label: "Dark Theme",
          value: "dark",
          description: "An alternative theme that’s easy on the eyes.",
        },
        {
          label: "System",
          value: "system",
          description: "Automatically switch between light and dark themes when your system does.",
        },
      ]
    }
  },

  methods: {
    changeTheme(e) {
      theme.value = e.target.value;
    }
  }
}
</script>

<style scoped>
.form-radio-group > label:first-child {
  @apply rounded-tl-md rounded-tr-md;
}

.form-radio-group > label:last-child {
  @apply rounded-bl-md rounded-br-md;
}
</style>
