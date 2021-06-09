<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <shell-menu-item :link="{name: 'Nodes', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }}" name="Back">
      <template v-slot:icon>
        <arrow-sm-left-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item :link="{name: 'Services', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }, params: { node: $route.params.node } }" name="Services">
      <template v-slot:icon>
        <server-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import {
  ServerIcon,
  ArrowSmLeftIcon,
} from '@heroicons/vue/outline';

@Options({
  components: {
    ShellMenuItem,
    ServerIcon,
    ArrowSmLeftIcon,
  },
})
export default class SidebarNode extends Vue {}
</script>
