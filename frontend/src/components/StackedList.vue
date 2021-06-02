<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div class="stacked-list">
      <ul>
        <li v-if="showCount && itemName">
          <div class="px-4 py-4 sm:px-6">
            {{ items.length }} {{ pluralize(itemName, items.length) }}
          </div>
        </li>
        <li v-if="$slots.header" class="table-header">
          <slot name="header"></slot>
        </li>
        <li
          v-for="item in items"
          :key="idFn(item)"
          >
          <slot :item="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import pluralize from 'pluralize';

export default {
  props: {
    items: Array,
    idFn: Function,
  },

  methods: {
    pluralize(noun, count) {
      return pluralize(noun, count);
    }
  }
}
</script>

<style>
.stacked-list {
  @apply flex flex-col w-full bg-white border rounded-md border-talos-gray-300 dark:border-talos-gray-600 dark:bg-talos-gray-900 text-talos-gray-900 dark:text-talos-gray-100 overflow-visible;
}

.stacked-list > ul {
  @apply divide-y divide-talos-gray-300 dark:divide-talos-gray-600 overflow-visible;
}

.stacked-list li {
  @apply text-sm font-medium text-talos-gray-900 dark:text-talos-gray-100 overflow-visible;
}

.stacked-list *:first-child {
  @apply rounded-tl-md rounded-tr-md;
}

.stacked-list *:last-child {
  @apply rounded-bl-md rounded-br-md;
}

.stacked-list .table-header > * {
  @apply flex items-center px-4 py-3 sm:px-6 min-w-0 md:grid md:gap-4 uppercase bg-talos-gray-100 dark:bg-talos-gray-700 text-talos-gray-500 dark:text-talos-gray-300;
}
</style>
