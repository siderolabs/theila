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
    <stacked-list v-else :items="items" :idFn="resourceWatch.id" :showCount="showCount" :itemName="itemName" :search="search" :filterFn="filter">
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
import Watch from "../api/watch";
import TSpinner from './TSpinner.vue';
import TAlert from './TAlert.vue';
import StackedList from './StackedList.vue';

export default {
  components: {
    TSpinner,
    TAlert,
    StackedList,
  },

  props: {
    resource: Object,
    context: Object,
    showCount: Boolean,
    itemName: String,
    search: String,
    filterFn: Function,
    compareFn: Function,
    kubernetes: Boolean,
    talos: Boolean,
    watch: Object,
  },

  setup(props, context) {
    const { filterFn } = toRefs(props);
    const resourceWatch = props.watch ? props.watch : new Watch(
      ctx.api,
      ref([]),
    );

    if(!props.watch) {
      resourceWatch.setup(props, context);
    }

    return {
      items: resourceWatch.items,
      err: resourceWatch.err,
      loading: resourceWatch.loading,
      running: resourceWatch.running,
      resourceWatch,
      filter: computed(() => {
        return filterFn && filterFn.value ? filterFn.value : (item, filter) => resourceWatch.id(item).includes(filter);
      })
    };
  }
}
</script>
