<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <button type="button" 
          class="focus:outline-none focus:shadow-outline"
          :class="{primary: primary, secondary: !primary, small: small, xs: xs}">
    <div class="container space-x-1">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    primary: Boolean,
    small: Boolean,
    xs: Boolean,
  },

  data() {
    return {
      colors: this.primary ? this.primaryClasses : this.secondaryClasses,
    };
  }
})
export default class TButton extends Vue {}
</script>

<style scoped>
button {
  @apply px-3 py-2 text-sm font-semibold leading-5 transition-colors duration-200 rounded-md shadow-sm select-none;
}

.primary {
  @apply text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 border border-transparent;
}

.secondary {
  @apply text-black dark:text-white border border-talos-gray-300 dark:border-talos-gray-600 bg-talos-gray-50 dark:bg-talos-gray-800 hover:bg-gray-200 dark:hover:bg-talos-gray-700 focus:bg-talos-gray-200 dark:focus:bg-talos-gray-700;
}

.small {
  @apply py-1;
}

.xs {
  @apply p-1;
}

button > div.container {
  vertical-align: middle;
}

button > div.container > * {
  display: inline-block;
  vertical-align: middle;
}
</style>
