<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="shellClasses">
    <div :class="sidebarClasses" :style="style">
      <slot name="menu"></slot>
    </div>
    <div :class="contentClasses">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    colorStyle: {
      type: String,
      default: "normal",
    },

    sidebarWidth: {
      type: String,
      default: "18rem",
    }
  },

  computed: {
    sidebarClasses() {
      return `sidebar sidebar-${this.colorStyle}`;
    },

    contentClasses() {
      return `content-${this.colorStyle}`;
    },

    shellClasses() {
      return `shell-${this.colorStyle}`;
    },

    style() {
      return `width: ${this.sidebarWidth};`;
    }
  }
})
export default class Shell extends Vue {}
</script>

<style>
.sidebar-inverted {
  @apply flex flex-col justify-between flex-none h-full py-2 select-none px-3 overflow-y-auto gap-2;
}

.sidebar-normal {
  @apply sidebar-inverted bg-talos-gray-200 dark:bg-talos-gray-800;
}

.content-inverted {
  @apply flex flex-col w-full h-full overflow-x-hidden overflow-y-auto py-2 px-4;
}

.content-normal {
  @apply content-inverted bg-white dark:bg-talos-gray-900;
}

.shell-normal {
  @apply shell-inverted bg-white dark:bg-talos-gray-900 text-talos-gray-900 dark:text-white;
}

.shell-inverted {
  @apply flex flex-row font-sans antialiased;
}

</style>
