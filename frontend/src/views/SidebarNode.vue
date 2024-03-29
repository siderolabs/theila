<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
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
    <shell-menu-item :link="{name: 'Overview', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }, params: { node: $route.params.node } }" name="Overview">
      <template v-slot:icon>
        <home-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item :link="{name: 'Monitor', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }, params: { node: $route.params.node } }" name="Monitor">
      <template v-slot:icon>
        <presentation-chart-line-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <shell-menu-item name="Dmesg" :link="{name: 'Logs', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }, params: { node: $route.params.node, service: 'dmesg' } }">
      <template v-slot:icon>
        <document-text-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <disclosure as="template" defaultOpen v-slot="{ open }" v-if="services.length > 0">
      <disclosure-button as="div" class="disclosure-button">
        SERVICE LOGS
        <chevron-up-icon :class="{ chevron: true, open: open }"/>
      </disclosure-button>
      <disclosure-panel as="template">
        <div class="flex flex-col gap-2">
          <shell-menu-item v-for="service in services" :name="service.metadata.id" :key="service.metadata.id" :link="{name: 'Logs', query: { cluster: $route.query.cluster, namespace: $route.query.namespace, uid: $route.query.uid }, params: { node: $route.params.node, service: service.metadata.id } }">
            <template v-slot:icon>
              <document-text-icon class="w-6 h-6"/>
            </template>
          </shell-menu-item>
        </div>
      </disclosure-panel>
    </disclosure>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from 'vue';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import {
  ArrowSmLeftIcon,
  ChevronUpIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  HomeIcon,
} from '@heroicons/vue/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ResourceService } from '../api/grpc';
import { Runtime } from '../api/common/theila.pb';
import { getContext } from '../context';
import { talos } from '../api/resources';

export default {
  components: {
    ShellMenuItem,
    ArrowSmLeftIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    PresentationChartLineIcon,
    DocumentTextIcon,
    HomeIcon,
  },

  setup() {
    const services: Ref<Object[]> = ref([]);
    const context = getContext();

    onMounted(async () => {
      const response = await ResourceService.List({
        type: talos.service,
      }, {
        runtime: Runtime.Talos,
        context: context,
      });

      for(const items of response) {
        services.value = services.value.concat(items);
      }
    });

    return {
      services,
    };
  }
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
