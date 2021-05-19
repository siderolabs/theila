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
    <div v-else class="stacked-list">
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
          :key="watch.id(item)"
          >
          <slot :item="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onUnmounted, toRef, watch } from "vue";
import { context } from "../context";
import Watch from "../api/watch";
import { ClientReconnected } from "../api/client";
import { Source } from "../common/theila";
import TSpinner from './TSpinner.vue';
import TAlert from './TAlert.vue';
import pluralize from 'pluralize';

function defaultCompareFunc(w: Watch) {
  return (a, b) => {
    if(w.id(a) === w.id(b)) {
      return 0;
    } else if(w.id(a) > w.id(b)) {
      return 1;
    }

    return -1;
  };
}

export default {
  components: {
    TSpinner,
    TAlert,
  },

  props: {
    resource: Object,
    context: Object,
    showCount: Boolean,
    itemName: String,
    compareFn: Function,
    kubernetes: Boolean,
    talos: Boolean,
  },

  setup(props) {
    const kubernetes = toRef(props, "kubernetes");
    const talos = toRef(props, "talos");
    const resource = toRef(props, "resource");
    const ctx = toRef(props, "context");
    const compare = toRef(props, "compareFn");

    const resourceWatch = new Watch(
      context.api,
    );

    const startWatch = async () => {
      stopWatch();

      if(!resource.value) {
        return;
      }

      let source:Source;

      if(kubernetes.value) {
        source = Source.Kubernetes;
      } else if(talos.value) {
        source = Source.Talos;
      } else {
        throw new Error("unknown source specified")
      }

      const compareFn = compare.value ? compare.value : defaultCompareFunc(resourceWatch);

      resourceWatch.start(
        source,
        resource.value,
        ctx.value,
        compareFn,
      )
    };

    const stopWatch = async () => {
      if(resourceWatch.running.value) {
        await resourceWatch.stop();
      }
    };

    const handleReconnect = async () => {
      await startWatch();
    }

    onMounted(async () => {
      context.api.addListener(ClientReconnected, handleReconnect);

      await startWatch();
    });

    onUnmounted(async () => {
      context.api.removeListener(ClientReconnected, handleReconnect);

      await stopWatch();
    });

    watch([
      resource,
      ctx,
      kubernetes,
      talos,
      compare,
    ], (val, oldVal) => {
      if(val.value != oldVal.value) {
        startWatch();
      }
    });

    return {
      items: resourceWatch.items,
      err: resourceWatch.err,
      loading: resourceWatch.loading,
      running: resourceWatch.running,
      watch: resourceWatch,
    };
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
