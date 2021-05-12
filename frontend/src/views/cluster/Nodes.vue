<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <t-breadcrumbs :active="$route.params.cluster + ' Nodes'"/>
    </div>
    <stacked-list 
        class="flex-1"
        resource="nodes.v1"
        idField="metadata.name"
        showCount
        itemName="Node"
        :provider="0"
        :context="{cluster: {name: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid}}">
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
          :to="{name: 'Services', params: { cluster: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid, node: getIP(slot.item) }}"
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
    </stacked-list>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import StackedList from '../../components/StackedList.vue';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';

@Options({
  components: {
    StackedList,
    TBreadcrumbs,
  },

  methods: {
    getIP(item) {
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
    },

    getRoles(item) {
      const roles = [];

      for (const label in item.metadata.labels) {
        if (label.indexOf("node-role.kubernetes.io/") != -1) {
          roles.push(label.split("/")[1]);
        }
      }

      return roles;
    }
  },
})
export default class Nodes extends Vue{}
</script>
