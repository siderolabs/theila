<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <t-breadcrumbs active="{node} Services"/>
    </div>
    <watch
        class="flex-1"
        :resource="{type: 'services'}"
        showCount
        itemName="Service"
        talos
        :context="{cluster: {name: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid, nodes: [$route.params.node]}}">
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-8">
          <div class="col-span-6 block">
            ID
          </div>
          <div class="block">
            Running
          </div>
          <div class="block">
            Health
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-4 py-4 sm:px-6 min-w-0 md:grid md:grid-cols-8 md:gap-4">
            <div class="col-span-6 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.metadata.id }}
              </p>
            </div>
            <div class="block justify-center">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                <check-circle-icon class="ok" v-if="slot.item.spec.running"/>
                <x-circle-icon class="error" v-else/>
              </p>
            </div>
            <div class="block justify-center">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                <check-circle-icon class="ok" v-if="slot.item.spec.healthy"/>
                <exclamation-circle-icon class="error" v-else/>
              </p>
            </div>
          </div>
        </a>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import Watch from '../../components/Watch.vue';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/outline';

@Options({
  components: {
    TBreadcrumbs,
    Watch,
    CheckCircleIcon,
    XCircleIcon,
    ExclamationCircleIcon,
  },
})
export default class Services extends Vue{}
</script>

<style scoped>
.ok {
  @apply h-5 w-5 text-green-400;
}

.error {
  @apply h-5 w-5 text-red-600;
}
</style>
