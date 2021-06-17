<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <div class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Servers</div>
    </div>
    <watch class="flex-1" :resource="{type: 'servers.v1alpha1.metal.sidero.dev'}" kubernetes>
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-5">
          <div class="col-span-2 block">
            Name
          </div>
          <div class="block">
            Created
          </div>
          <div class="block">
            Power
          </div>
          <div class="block">
            Status
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <server-list-item :item="slot.item"/>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import Watch from '../components/Watch.vue';
import ServerListItem from '../components/ServerListItem.vue';
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon,
  LightningBoltIcon,
} from '@heroicons/vue/solid';

@Options({
  components: {
    Watch,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
    LightningBoltIcon,
    ServerListItem,
  },
})
export default class Servers extends Vue{}
</script>
