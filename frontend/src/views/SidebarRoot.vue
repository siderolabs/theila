<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white"><strong>SIDERO</strong> UI</h1>
    </div>
    <shell-menu-item :link="{name: 'Clusters'}" name="Clusters">
      <template v-slot:icon>
        <view-grid-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item :link="{name: 'Servers'}" name="Servers">
      <template v-slot:icon>
        <server-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item name="Settings">
      <template v-slot:icon>
        <cog-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import {
  ViewGridIcon,
  ServerIcon,
  CogIcon,
} from '@heroicons/vue/outline';

@Options({
  components: {
    ShellMenuItem,
    ViewGridIcon,
    ServerIcon,
    CogIcon,
  },
})
export default class SidebarRoot extends Vue {}
</script>
