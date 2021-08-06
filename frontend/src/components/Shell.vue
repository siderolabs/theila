<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="shellClasses">
    <div :class="sidebarClasses">
      <slot name="menu"></slot>
    </div>
    <div class="flex items-center justify-center w-full overflow-y-auto overflow-x-hidden">
      <div class="flex-1 max-w-screen-xl h-full">
        <div :class="contentClasses">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="ts">
import { computed, toRefs } from 'vue';

export default {
  props: {
    colorStyle: {
      type: String,
      default: "normal",
    },

    sidebarWidth: {
      type: String,
      default: "w-60 lg:w-72",
    }
  },

  setup(props) {
    const {colorStyle, sidebarWidth} = toRefs(props);

    return {
      sidebarClasses: computed(() => {
        return `sidebar sidebar-${colorStyle.value} ${sidebarWidth.value}`;
      }),
      contentClasses: computed(() => {
        return `content-${colorStyle.value}`;
      }),
      shellClasses: computed(() => {
        return `shell-${colorStyle.value}`;
      }),
    }
  }
};
</script>

<style>
.sidebar-inverted {
  @apply flex flex-col justify-between flex-none h-full py-2 select-none sm:px-3 overflow-y-auto gap-2;
}

.sidebar-normal {
  @apply sidebar-inverted bg-talos-gray-200 dark:bg-talos-gray-800;
}

.content-inverted {
  @apply flex-1 flex flex-col py-2 px-4 h-full;
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
