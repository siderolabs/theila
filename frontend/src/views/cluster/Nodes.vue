<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2" v-if="$route.query.cluster">
      <t-breadcrumbs>{{ $route.query.cluster }} Nodes</t-breadcrumbs>
    </div>
    <div class="px-3 py-2" v-else>
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Nodes</h1>
    </div>
    <watch
        class="flex-1"
        :resource="{type: 'nodes.v1'}"
        showCount
        itemName="Node"
        kubernetes
        search="Search node by name"
        :context="getContext()">
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-7">
          <div class="block justify-self-left">
            Name
          </div>
          <div class="block justify-self-center">
            IP
          </div>
          <div class="justify-self-center">
            OS
          </div>
          <div class="col-span-2 block justify-self-center">
            Roles
          </div>
          <div class="justify-self-center">
            Status
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <node-list-item :item="slot.item"/>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { getContext } from '../../context';
import Watch from '../../components/Watch.vue';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import NodeListItem from '../../components/NodeListItem.vue';

export default {
  components: {
    Watch,
    TBreadcrumbs,
    NodeListItem,
  },

  setup() {
    return {
      getContext,
    };
  },
};
</script>
