<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div class="flex gap-2">
      <t-input v-if="search" :placeholder="search" v-model="filter" class="mb-4 w-full flex-1">
        <template v-slot:icon>
          <search-icon class="w-5 h-5"/>
        </template>
      </t-input>
      <t-dropdown v-for="category, index in categories" :title="category.title" :key="index">
        <template v-slot:default>
          <menu-item v-for="option in category.options" :key="option.name" v-slot="{ active }">
            <a
              v-on:click="() => { category.current = option.filter; category.title = option.name }"
              :class="{ active }"
              >{{ option.name }}</a
            >
          </menu-item>
        </template>
      </t-dropdown>
      <slot name="menu"></slot>
    </div>
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
          v-for="item in filteredItems"
          :key="idFn(item)"
          >
          <slot :item="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, toRefs, reactive } from 'vue';
import pluralize from 'pluralize';
import { SearchIcon } from '@heroicons/vue/outline';
import { MenuItem } from '@headlessui/vue';
import TInput from './TInput.vue';
import TDropdown from './TDropdown.vue';

export default {
  components: {
    SearchIcon,
    TInput,
    TDropdown,
    MenuItem,
  },

  props: {
    items: Array,
    idFn: Function,
    filterFn: Function,
    categories: Array,
    itemName: String,
    search: String,
    showCount: Boolean,
  },

  setup(props) {
    const filter = ref("");
    const { items, filterFn, categories } = toRefs(props);

    if(categories && categories.value) {
      for(let i = 0; i < categories.value.length; i++) {
        const item = categories.value[i];
        item.title = item.placeholder;
        item.current = null;
        item.options.splice(0, 0, {
          name: item.placeholder,
        });
        categories.value[i] = reactive(item);
      }
    }

    const quickFilters = computed(() => {
      if(!categories || !categories.value)
        return [];

      const res = [];
      for(const f of categories.value) {
        if(f.current)
          res.push(f.current);
      }

      return res;
    });

    const filteredItems = computed(() => {
      if((filter.value === "" || filterFn === null) && quickFilters.value.length === 0)
        return items.value;

      return items.value.filter((item) => filterFn.value(item, filter.value) && quickFilters.value.every((f) => f(item)));
    });

    return {
      filter,
      pluralize: pluralize,
      filteredItems,
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
  @apply text-sm text-talos-gray-900 dark:text-talos-gray-100 overflow-visible;
}

.stacked-list > ul > li:first-child > * {
  @apply rounded-tl-md rounded-tr-md;
}

.stacked-list > ul > li:last-child > * {
  @apply rounded-bl-md rounded-br-md;
}

.stacked-list .table-header > * {
  @apply font-medium flex items-center px-4 py-3 sm:px-6 min-w-0 md:grid md:gap-4 uppercase bg-talos-gray-100 dark:bg-talos-gray-700 text-talos-gray-500 dark:text-talos-gray-300;
}
</style>
