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
        :context="getContext()">
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-5">
          <div class="col-span-2 block">
            Name
          </div>
          <div class="block">
            IP
          </div>
          <div class="col-span-2 block">
            Roles
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <router-link
          :to="{name: 'Services', params: { node: getIP(slot.item) }, query: getQuery() }"
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-4 py-4 sm:px-6 min-w-0 md:grid md:grid-cols-5 md:gap-4">
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
                {{ getIP(slot.item) }}
              </p>
            </div>
            <div class="col-span-2 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100 space-x-1 space-y-1"
                >
                <span v-for="role in getRoles(slot.item)" v-bind:key="role">{{ role }}</span>
              </p>
            </div>
          </div>
        </router-link>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { useRoute } from 'vue-router';
import { getContext } from '../../router';
import Watch from '../../components/Watch.vue';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';

export default {
  components: {
    Watch,
    TBreadcrumbs,
  },

  setup() {
    const route = useRoute();

    const getIP = (item) => {
      const status = item.status;
      let addr = "unknown";

      if (status == null) {
        return addr;
      }

      for (const a of status.addresses) {
        if (a.type == "InternalIP") {
          addr = a.address;
        }

        if (a.type == "ExternalIP") {
          addr = a.address;
          break;
        }
      }

      return addr;
    };

    const getRoles = (item) => {
      const roles = [];

      for (const label in item.metadata.labels) {
        if (label.indexOf("node-role.kubernetes.io/") != -1) {
          roles.push(label.split("/")[1]);
        }
      }

      return roles;
    };

    const getQuery = () => {
      const query = {};

      if(route.query.cluster && route.query.namespace && route.query.uid) {
        query.cluster = route.query.cluster;
        query.namespace = route.query.namespace || "default";
        query.uid = route.query.uid;
      }

      return query;
    };

    return {
      getIP,
      getRoles,
      getContext,
      getQuery,
    };
  },
};
</script>
