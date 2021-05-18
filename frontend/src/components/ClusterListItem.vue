<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <router-link
    :to="{name: 'Nodes', params: { cluster: item.metadata.name, namespace: item.metadata.namespace, uid: item.metadata.uid }}"
    class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
    >
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex items-center flex-1 min-w-0">
        <div class="flex-1 min-w-0 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <p
              class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
              >
              {{ item.metadata.name }}
            </p>
            <div class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400" v-if="item.status">
              <div v-if="item.status.phase === 'Provisioned'">
                <check-circle-icon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  aria-hidden="true"
                  />
              </div>
              <div v-else>
                <x-circle-icon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600"
                  aria-hidden="true"
                  />
              </div>
              <span class="truncate">{{ item.status.phase }}</span>
            </div>
          </div>
          <div class="block" v-if="item.status">
            <div>
              <p
                v-if="nodesCount >= 0"
                class="text-sm text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ nodesCount }} Nodes
              </p>
              <p v-else>
                <t-spinner/>
              </p>
              <p
                class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400"
                >
                {{ getLastUpdated(item) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <t-button
          class="relative block px-1 py-1 text-sm font-semibold leading-5 text-black transition-colors duration-200 border rounded-md shadow-sm select-none dark:text-white border-talos-gray-300 dark:border-talos-gray-600 bg-talos-gray-50 dark:bg-talos-gray-800 hover:bg-gray-200 dark:hover:bg-talos-gray-700 focus:bg-talos-gray-200 dark:focus:bg-talos-gray-700 focus:outline-none focus:shadow-outline"
          >
          <dots-horizontal-icon
            class="w-5 h-5 text-talos-gray-900 dark:text-talos-gray-50"
            aria-hidden="true"
            />
        </t-button>
      </div>
    </div>
  </router-link>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import TSpinner from '../components/TSpinner.vue';
import { ResourceService } from '../api/grpc';
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon
} from '@heroicons/vue/solid';
import { DateTime } from 'luxon';

@Options({
  components: {
    TSpinner,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
  },

  props: {
    item: Object,
  },

  async created() {
    const response = await ResourceService.List({
      resource: {
        namespace: this.item.metadata.namespace,
        type: "machinelist.v1alpha3.cluster.x-k8s.io",
      },
      selectors: [
        `cluster.x-k8s.io/cluster-name=${this.item.metadata.name}`
      ]
    });
    
    let count = 0;
    for (const m of response) {
      count += m.items.length;
    }

    this.nodesCount = count;
  },
  
  data() {
    return {
      nodesCount: -1,
    }
  },

  methods: {
    getLastUpdated(item) {
      if (!item["status"]) {
        return "";
      }

      const conditions = item["status"]["conditions"];

      if (!conditions) {
        return "";
      }

      const condition = conditions[0];

      return DateTime.fromISO(condition["lastTransitionTime"]).toRelative();
    },
  }
})
export default class ClusterListItem extends Vue{}
</script>
