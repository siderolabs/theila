<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Clusters</h1>
    </div>
    <stacked-list class="flex-1" resource="clusters.v1alpha3.cluster.x-k8s.io" idField="metadata.name" :provider="0">
      <template v-slot:default="slot">
        <router-link
          :to="{name: 'Nodes', params: { cluster: slot.item.metadata.name, namespace: slot.item.metadata.namespace, uid: slot.item.metadata.uid }}"
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-1 min-w-0 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p
                    class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                    >
                    {{ slot.item.metadata.name }}
                  </p>
                  <div class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400">
                    <div v-if="slot.item.status.phase === 'Provisioned'">
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
                    <span class="truncate">{{ slot.item.status.phase }}</span>
                  </div>
                </div>
                <div class="block">
                  <div>
                    <p
                      class="text-sm text-talos-gray-900 dark:text-talos-gray-100"
                      >
                      ? Nodes
                    </p>
                    <p
                      class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400"
                      >
                      {{ getLastUpdated(slot.item) }}
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
    </stacked-list>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import StackedList from '../components/StackedList.vue';
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon
} from '@heroicons/vue/solid';
import { DateTime } from 'luxon';

@Options({
  components: {
    StackedList,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
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
export default class Clusters extends Vue{}
</script>
