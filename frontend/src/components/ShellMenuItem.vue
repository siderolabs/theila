<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="px-3">
    <div class="flex flex-col gap-2">
      <router-link :to="link">
        <a class="flex flex-row items-center justify-between w-full px-3 py-2 rounded-md dark:text-talos-gray-50 text-talos-gray-900 hover:bg-talos-gray-50 dark:hover:bg-talos-gray-700">
          <div class="flex flex-row items-center gap-2">
            <slot name="icon"></slot>
            <span class="text-sm leading-none font-medium">{{ name }}</span>
          </div>
        </a>
      </router-link> 
    </div>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    name: String,
    link: Object,
  },
})
export default class ShellMenuItem extends Vue {}
</script>

<style scoped>
.router-link-active > a {
  @apply dark:bg-talos-gray-700 bg-talos-gray-50 
}
</style>
