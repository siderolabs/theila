<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2" v-if="$route.query.cluster">
      <t-breadcrumbs>{{ $route.query.cluster }} Pods</t-breadcrumbs>
    </div>
    <div class="px-3 py-2" v-else>
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Pods</h1>
    </div>
    <watch
      class="flex-1"
      :resource="{type: 'pods.v1'}"
      kubernetes
      showCount
      itemName="Pod"
      :context="getContext()">
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-6">
          <div class="block">
            Namespace
          </div>
          <div class="col-span-2 block">
            Name
          </div>
          <div class="block">
            Phase
          </div>
          <div class="col-span-2 block">
            Node
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center min-w-0 px-4 py-4 sm:px-6 md:grid md:grid-cols-6 md:gap-4">
            <div class="block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.metadata.namespace }}
              </p>
            </div>
            <div class="col-span-2 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.metadata.name }}
              </p>
            </div>
            <div class="block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.status.phase }}
              </p>
            </div>
            <div class="col-span-2 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.spec.nodeName }}
              </p>
            </div>
          </div>
        </a>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { getContext } from '../../router';
import Watch from '../../components/Watch.vue';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';

export default {
  components: {
    Watch,
    TBreadcrumbs,
  },

  setup() {
    return {
      getContext,
    };
  }
};
</script>
