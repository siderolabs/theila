<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <router-link
    :to="{name: 'Nodes', params: { cluster: item.metadata.name, namespace: item.metadata.namespace, uid: item.metadata.uid }}"
    class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800 overflow-visible"
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
      <div v-on:click.stop.prevent.self>
        <t-dropdown xs>
          <template v-slot:icon>
            <dots-horizontal-icon
              class="w-5 h-5 text-talos-gray-900 dark:text-talos-gray-50"
              aria-hidden="true"
              />
          </template>
          <template v-slot:default>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="downloadKubeconfig"
                :class="[
                        active
                        ? 'bg-talos-gray-100 dark:bg-talos-gray-900 text-talos-gray-700 dark:text-talos-gray-50'
                        : 'text-talos-gray-700 dark:text-talos-gray-50',
                        'block px-4 py-2 text-sm'
                        ]"
                >Download Kubeconfig</a
              >
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="downloadTalosConfig"
                :class="[
                        active
                        ? 'bg-talos-gray-100 dark:bg-talos-gray-900 text-talos-gray-700 dark:text-talos-gray-50'
                        : 'text-talos-gray-700 dark:text-talos-gray-50',
                        'block px-4 py-2 text-sm'
                        ]"
                >Download Talos Config</a
              >
            </menu-item>
          </template>
        </t-dropdown>
      </div>
    </div>
  </router-link>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import TSpinner from '../components/TSpinner.vue';
import { ResourceService } from '../api/grpc';
import { Source } from '../common/theila.pb';
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon
} from '@heroicons/vue/solid';
import { DateTime } from 'luxon';
import TDropdown from '../components/TDropdown.vue';
import { MenuItem } from '@headlessui/vue';

@Options({
  components: {
    TSpinner,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
    TDropdown,
    MenuItem,
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
      link: document.createElement("a"),
    }
  },

  methods: {
    async downloadTalosConfig() {
      const response = await ResourceService.GetConfig({
        cluster: {
          name: this.item.metadata.name,
          uid: this.item.metadata.uid,
          namespace: this.item.metadata.namespace,
        },
        source: Source.Talos,
      });

      this.link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(response)}`;
      this.link.download = `${this.item.metadata.name}-talosconfig.yaml`;
      this.link.click();
    },

    async downloadKubeconfig() {
      const response = await ResourceService.GetConfig({
        cluster: {
          name: this.item.metadata.name,
          uid: this.item.metadata.uid,
          namespace: this.item.metadata.namespace,
        },
        source: Source.Kubernetes,
      });

      this.link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(response)}`;
      this.link.download = `${this.item.metadata.name}-kubeconfig.yaml`;
      this.link.click();
    },

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
