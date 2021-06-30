<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div class="flex flex-col gap-2">
      <component :is="link ? 'router-link' : 'a'" :to="link" :class="{'shell-menu-link': true, 'router-link-active': active, 'cursor-pointer': true}">
        <div class="flex flex-row items-center gap-2">
          <slot name="icon"></slot>
          <span class="text-sm leading-none font-medium">{{ name }}</span>
        </div>
      </component> 
    </div>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    name: String,
    link: Object,
    active: Boolean,
  },
})
export default class ShellMenuItem extends Vue {}
</script>

<style>
.shell-menu-link {
  @apply flex flex-row items-center justify-between w-full px-3 py-2 rounded-md dark:text-talos-gray-50 text-talos-gray-900 hover:bg-talos-gray-50 dark:hover:bg-talos-gray-700 transition-colors duration-200;
}

.shell-menu-link.router-link-active {
  @apply dark:bg-talos-gray-700 bg-talos-gray-50;
}

.sidebar-inverted .shell-menu-link.router-link-active,
.sidebar-inverted .shell-menu-link:hover {
  @apply dark:text-talos-gray-100 text-talos-gray-900 dark:bg-talos-gray-700 bg-talos-gray-200;
}
</style>
