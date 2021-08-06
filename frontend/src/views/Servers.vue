<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-4">
    <div class="px-3 py-2">
      <div class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Servers</div>
    </div>
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
      <t-stat name="Total Servers" :value="items.length" :loading="loading">
        <template v-slot:icon>
          <server-icon class="w-6 h-6"/>
        </template>
      </t-stat>
      <t-stat name="Allocated" :value="allocated" :loading="loading">
        <template v-slot:icon>
          <ticket-icon class="w-6 h-6"/>
        </template>
      </t-stat>
      <t-stat name="Capacity" :value="capacity" :loading="loading">
        <template v-slot:icon>
          <cube-icon class="w-6 h-6"/>
        </template>
      </t-stat>
    </div>
    <watch class="flex-1" :watch="servers" search="Search server" :filterFn="search" :categories="categories" :sortOptions="sortOptions">
      <template v-slot:header>
        <div class="flex items-center grid grid-cols-5">
          <div class="col-span-2 block">
            Name
          </div>
          <div class="block">
            Created
          </div>
          <div class="block">
            Power
          </div>
          <div class="hidden md:block">
            Status
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <server-list-item :item="slot.item"/>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { ref, reactive, computed } from 'vue';
import Watch from '../components/Watch.vue';
import TStat from '../components/TStat.vue';
import { context as ctx } from "../context";
import ResourceWatch from "../api/watch";
import ServerListItem from '../components/ServerListItem.vue';
import {
  ServerIcon,
  TicketIcon,
  CubeIcon,
} from '@heroicons/vue/outline';

export default {
  components: {
    Watch,
    ServerListItem,
    TStat,
    ServerIcon,
    TicketIcon,
    CubeIcon,
  },

  setup() {
    const items = ref([]);
    const props = reactive({
      resource: {
        type: 'servers.v1alpha1.metal.sidero.dev'
      },
      talos: false,
      kubernetes: true,
    });

    const servers = new ResourceWatch(
      ctx.api,
      items,
    );

    servers.setup(props, {});

    const inUse = (item) => getField(item, "status", "inUse");
    const getField = (item, ...args) => {
      let el = item;
      for(const a of args) {
        el = el[a];
        if(!el)
          return null;
      }

      return el;
    };

    const getAllocated = () => {
      return items.value.filter(inUse).length / items.value.length * 100;
    };

    const categories = [
      {
        placeholder: "All Servers",
        options: [
          { name: "In Use", filter: inUse },
          { name: "Not In Use", filter: (item) => !inUse(item) },
          { name: "Accepted", filter: (item) => item["spec"]["accepted"] },
          { name: "Not Accepted", filter: (item) => !item["spec"]["accepted"] },
          { name: "On", filter: (item) => getField(item, "status", "power") === 'on' },
          { name: "Off", filter: (item) => (getField(item, "status", "power") || 'off') === 'off' },
        ]
      },
      {
        placeholder: "All Statuses",
        options: [
          { name: "Ready", filter: (item) => getField(item, "status", "ready") },
          { name: "Error", filter: (item) => !getField(item, "status", "ready") },
        ]
      }
    ];

    const newest = (a, b) => {
      const timestamp1 = a["metadata"]["creationTimestamp"];
      const timestamp2 = b["metadata"]["creationTimestamp"];

      if(timestamp1 === timestamp2)
        return 0;
      else if(timestamp1 < timestamp2)
        return 1;

      return -1;
    };

    const sortOptions = [
      { name: "Newest", function: newest },
      { name: "Oldest", function: (a, b) => newest(a, b) * -1 },
    ];

    return {
      categories,
      sortOptions,
      items,
      servers,
      loading: servers.loading,
      allocated: computed(() => {
        if(items.value.length === 0)
          return null;

        return getAllocated().toFixed(0) + "%";
      }),
      capacity: computed(() => {
        if(items.value.length === 0)
          return null;

        return (100 - getAllocated()).toFixed(0) + "%";
      }),
      search(item, filter) {
        if(item["metadata"]["name"].includes(filter)) {
          return true;
        }

        if(item["spec"]["cpu"]["version"].includes(filter)) {
          return true;
        }

        const labels = item["metadata"]["labels"] || {};
        for(const key in labels) {
          return key.includes(filter) || labels[key].includes(filter);
        }

        return false;
      }
    };
  }
};
</script>
