<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white"><strong>SIDERO</strong> UI</h1>
    </div>
    <shell-menu-item :link="{name: 'Clusters'}" name="Back">
      <template v-slot:icon>
        <arrow-sm-left-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item :link="{name: 'Nodes', params: { cluster: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid }}" name="Nodes">
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
  ArrowSmLeftIcon
} from '@heroicons/vue/outline';

@Options({
  components: {
    ShellMenuItem,
    ServerIcon,
    ArrowSmLeftIcon,
  },
})
export default class SidebarCluster extends Vue {}
</script>
