<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div v-if="loading" class="flex flex-row justify-center items-center w-full h-full">
      <t-spinner/>
    </div>
    <t-alert v-else-if="err" title="Failed to Fetch Data" type="error">
      {{ err }}.
    </t-alert>
    <t-alert v-else-if="items.length == 0" type="info" title="No Records">No entries of the requested resource type are found on the server.</t-alert>
    <stacked-list v-else :items="items" :idFn="(item) => resourceWatch.id(item)" :showCount="showCount" :itemName="itemName" :search="search" :filterFn="filter" :categories="categories">
      <template v-slot:menu v-if="sortOptions">
        <t-dropdown :title="'Sorted by: ' + sortName">
          <menu-item v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
            <a
              v-on:click="() => { sortFn = option.function; sortName = option.name }"
              :class="{ active }"
              >{{ option.name }}</a
            >
          </menu-item>
        </t-dropdown>
      </template>
      <template v-slot:header v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <template v-slot:default="slot">
        <slot :item="slot.item"></slot>
      </template>
    </stacked-list>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, computed } from "vue";
import { context as ctx } from "../context";
import { MenuItem } from '@headlessui/vue';
import { defaultCompareFunc } from "../api/watch";
import Watch from "../api/watch";
import TSpinner from './TSpinner.vue';
import TAlert from './TAlert.vue';
import TDropdown from './TDropdown.vue';
import StackedList from './StackedList.vue';

export default {
  components: {
    TSpinner,
    TAlert,
    TDropdown,
    MenuItem,
    StackedList,
  },

  props: {
    resource: Object,
    context: Object,
    showCount: Boolean,
    itemName: String,
    categories: Array,
    search: String,
    filterFn: Function,
    sortOptions: Object,
    compareFn: Function,
    kubernetes: Boolean,
    talos: Boolean,
    watch: Object,
  },

  setup(props, context) {
    const { filterFn, sortOptions } = toRefs(props);
    const resourceWatch = props.watch ? props.watch : new Watch(
      ctx.api,
      ref([]),
    );

    const sortName = ref("Default");

    if(sortOptions && sortOptions.value) {
      sortOptions.value.splice(0, 0, {
        name: "Default",
        function: defaultCompareFunc(resourceWatch),
      });
    }

    if(!props.watch) {
      resourceWatch.setup(props, context);
    }

    return {
      items: resourceWatch.items,
      err: resourceWatch.err,
      loading: resourceWatch.loading,
      running: resourceWatch.running,
      sortFn: resourceWatch.sort,
      sortName,
      resourceWatch,
      filter: computed(() => {
        return filterFn && filterFn.value ? filterFn.value : (item, filter) => resourceWatch.id(item).includes(filter);
      })
    };
  }
}
</script>
