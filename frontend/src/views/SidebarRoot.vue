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
    <disclosure as="template" defaultOpen v-slot="{ open }">
      <disclosure-button as="div" class="disclosure-button">
        MANAGE
        <chevron-up-icon :class="{ chevron: true, open: open }"/>
      </disclosure-button>
      <disclosure-panel as="template" class="overflow-hidden">
        <shell-menu-item @click="openUpgrade" name="Upgrade Kubernetes">
          <template v-slot:icon>
            <upload-icon class="w-6 h-6"/>
          </template>
        </shell-menu-item>
      </disclosure-panel>
    </disclosure>
    <disclosure as="template" defaultOpen v-if="capi" v-slot="{ open }">
      <disclosure-button as="div" class="disclosure-button">
        CAPI
        <chevron-up-icon :class="{ chevron: true, open: open }"/>
      </disclosure-button>
      <disclosure-panel as="template" class="overflow-hidden">
        <shell-menu-item :link="{name: 'Clusters'}" name="Clusters">
          <template v-slot:icon>
            <view-grid-icon class="w-6 h-6"/>
          </template>
        </shell-menu-item>
      </disclosure-panel>
    </disclosure>
    <disclosure as="template" defaultOpen v-if="sidero" v-slot="{ open }">
      <disclosure-button as="div" class="disclosure-button">
        SIDERO
        <chevron-up-icon :class="{ chevron: true, open: open }"/>
      </disclosure-button>
      <disclosure-panel as="template">
        <shell-menu-item :link="{name: 'Servers'}" name="Servers">
          <template v-slot:icon>
            <chip-icon class="w-6 h-6"/>
          </template>
        </shell-menu-item>
      </disclosure-panel>
    </disclosure>
    <disclosure as="template" defaultOpen v-slot="{ open }">
      <disclosure-button as="div" class="disclosure-button">
        ACCOUNT
        <chevron-up-icon :class="{ chevron: true, open: open }"/>
      </disclosure-button>
      <disclosure-panel as="template">
        <shell-menu-item @click="openSettings" name="Settings">
          <template v-slot:icon>
            <cog-icon class="w-6 h-6"/>
          </template>
        </shell-menu-item>
      </disclosure-panel>
    </disclosure>
  </div>
</template>

<script lang="ts">
import { context } from '../context';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import {
  ViewGridIcon,
  CubeIcon,
  ServerIcon,
  CogIcon,
  ChipIcon,
  UploadIcon,
} from '@heroicons/vue/outline';
import {
  ChevronUpIcon,
} from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';

export default {
  components: {
    ShellMenuItem,
    ViewGridIcon,
    ServerIcon,
    CogIcon,
    CubeIcon,
    ChipIcon,
    UploadIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },

  setup() {
    const router = useRouter();

    const openUpgrade = () => {
      router.replace({query: {modal: "upgrade"}});
    }

    const openSettings = () => {
      router.replace({query: {modal: "settings"}});
    }

    return {
      capi: context.capabilities.capi,
      sidero: context.capabilities.sidero,
      openSettings,
      openUpgrade,
    }
  },
};
</script>

<style scoped>
.disclosure-button {
  @apply text-talos-gray-500 px-4 my-2 text-sm font-medium flex justify-between w-full;
}

.disclosure-button:hover {
  @apply text-talos-gray-400;
}

.chevron {
  @apply w-5 h-5;
}

.open {
  @apply transform rotate-180;
}
</style>
