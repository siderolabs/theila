<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Clusters</h1>
    </div>
    <watch class="flex-1" :resource="{type: 'clusters.v1alpha3.cluster.x-k8s.io'}" kubernetes search="Search cluster by name">
      <template v-slot:default="slot">
        <cluster-list-item :item="slot.item"/>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import Watch from '../components/Watch.vue';
import ClusterListItem from '../components/ClusterListItem.vue';

export default {
  components: {
    Watch,
    ClusterListItem,
  },
}
</script>
