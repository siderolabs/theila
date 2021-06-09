<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <shell-menu-item :link="{name: 'Nodes'}" name="Nodes">
      <template v-slot:icon>
        <server-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item :link="{name: 'Pods'}" name="Pods">
      <template v-slot:icon>
        <cube-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <template v-if="capi">
      <div class="text-talos-gray-500 dark:text-talos-gray-100 text-sm px-4 text-bold my-2">CAPI</div>
      <shell-menu-item :link="{name: 'Clusters'}" name="Clusters">
        <template v-slot:icon>
          <view-grid-icon class="w-6 h-6"/>
        </template>
      </shell-menu-item>
    </template>
    <template v-if="sidero">
      <div class="text-talos-gray-500 dark:text-talos-gray-100 text-sm px-4 text-bold my-2">SIDERO</div>
      <shell-menu-item :link="{name: 'Servers'}" name="Servers">
        <template v-slot:icon>
          <chip-icon class="w-6 h-6"/>
        </template>
      </shell-menu-item>
    </template>
    <div class="text-talos-gray-500 dark:text-talos-gray-100 text-sm px-4 text-bold my-2">ACCOUNT</div>
    <shell-menu-item @click="openSettings" name="Settings">
      <template v-slot:icon>
        <cog-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
  </div>
</template>

<script lang="ts">
import { context } from '../context';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import {
  ViewGridIcon,
  CubeIcon,
  ServerIcon,
  CogIcon,
  ChipIcon,
} from '@heroicons/vue/outline';
import { useRouter } from 'vue-router';

export default {
  components: {
    ShellMenuItem,
    ViewGridIcon,
    ServerIcon,
    CogIcon,
    CubeIcon,
    ChipIcon,
  },

  setup() {
    const router = useRouter();

    const openSettings = () => {
      router.replace({query: {modal: "settings"}});
    }

    return {
      capi: context.capabilities.capi,
      sidero: context.capabilities.sidero,
      openSettings,
    }
  },
};
</script>
