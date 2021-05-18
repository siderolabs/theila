<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Clusters</h1>
    </div>
    <stacked-list class="flex-1" :resource="{type: 'clusters.v1alpha3.cluster.x-k8s.io'}" kubernetes>
      <template v-slot:default="slot">
        <cluster-list-item :item="slot.item"/>
      </template>
    </stacked-list>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import StackedList from '../components/StackedList.vue';
import ClusterListItem from '../components/ClusterListItem.vue';

@Options({
  components: {
    StackedList,
    ClusterListItem,
  },
})
export default class Clusters extends Vue{}
</script>
