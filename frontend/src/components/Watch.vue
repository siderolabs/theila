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
    <stacked-list v-else :items="items" :idFn="watch.id">
      <template v-slot:default="slot">
        <slot :item="slot.item"></slot>
      </template>
    </stacked-list>
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
import StackedList from './StackedList.vue';

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
    StackedList,
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
  }
}
</script>
