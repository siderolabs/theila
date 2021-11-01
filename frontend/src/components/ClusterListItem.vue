<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <router-link
    :to="{name: 'Nodes', query: { cluster: item.metadata.name, namespace: item.metadata.namespace, uid: item.metadata.uid }}"
    class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800 overflow-visible"
    >
    <div class="flex items-center px-4 py-4">
      <div class="flex items-center flex-1 min-w-0">
        <div class="flex-1 grid grid-cols-2 gap-4">
          <div>
            <p
              class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
              >
              {{ item.metadata.name }}
            </p>
            <div class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400" v-if="item.status">
              <div v-if="item.status.phase === 'Provisioned'">
                <check-circle-icon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                  aria-hidden="true"
                  />
              </div>
              <div v-else>
                <x-circle-icon
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600"
                  aria-hidden="true"
                  />
              </div>
              <span class="truncate">{{ item.status.phase }}</span>
            </div>
          </div>
          <div class="block" v-if="item.status">
            <div>
              <p
                v-if="nodesCount >= 0"
                class="text-sm text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ nodesCount }} {{ pluralize('Node', nodesCount) }}
              </p>
              <p v-else>
                <t-spinner/>
              </p>
              <p
                class="flex items-center mt-2 text-sm text-talos-gray-500 dark:text-talos-gray-400"
                >
                {{ lastUpdated }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-on:click.stop.prevent.self>
        <t-dropdown xs>
          <template v-slot:icon>
            <dots-horizontal-icon
              class="w-5 h-5 text-talos-gray-900 dark:text-talos-gray-50"
              aria-hidden="true"
              />
          </template>
          <template v-slot:default>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="downloadKubeconfig"
                :class="{ active }"
                >Download Kubeconfig</a
              >
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="downloadTalosConfig"
                :class="{ active }"
                >Download Talos Config</a
              >
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="upgradeKubernetes"
                :class="{ active }"
                >Upgrade Kubernetes</a
              >
            </menu-item>
          </template>
        </t-dropdown>
      </div>
    </div>
  </router-link>
</template>

<script type="ts">
import TSpinner from '../components/TSpinner.vue';
import TDropdown from '../components/TDropdown.vue';

import { useRouter } from 'vue-router';
import { onMounted, ref, toRefs, computed } from 'vue';
import { ResourceService } from '../api/grpc';
import { Runtime } from '../api/common/theila.pb';
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon
} from '@heroicons/vue/solid';
import { DateTime } from 'luxon';
import { MenuItem } from '@headlessui/vue';
import { showError } from '../modal';

import pluralize from 'pluralize';

export default {
  components: {
    TSpinner,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
    TDropdown,
    MenuItem,
  },

  props: {
    item: {
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const { item } = toRefs(props);
    const nodesCount = ref(-1);
    const link = document.createElement("a");

    onMounted(async () => {
      const response = await ResourceService.List({
        namespace: item.value.metadata.namespace,
        type: "machines.v1alpha3.cluster.x-k8s.io",
      }, {
        metadata: {
          selectors: [
            `cluster.x-k8s.io/cluster-name=${item.value.metadata.name}`
          ]
        }
      });

      let count = 0;
      for (const m of response) {
        count += m.length;
      }

      nodesCount.value = count;
    });

    const downloadTalosConfig = async () => {
      try {
        const response = await ResourceService.GetConfig({
          name: item.value.metadata.name,
          uid: item.value.metadata.uid,
          namespace: item.value.metadata.namespace,
        }, {
          runtime: Runtime.Talos,
        });

        link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(response)}`;
        link.download = `${item.value.metadata.name}-talosconfig.yaml`;
        link.click();
      } catch(e) {
        showError("Failed to download Talos config", e.toString());
      }
    };

    const downloadKubeconfig = async () => {
      try {
        const response = await ResourceService.GetConfig({
          name: item.value.metadata.name,
          uid: item.value.metadata.uid,
          namespace: item.value.metadata.namespace,
        }, {
          runtime: Runtime.Kubernetes,
        });

        link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(response)}`;
        link.download = `${item.value.metadata.name}-kubeconfig.yaml`;
        link.click();
      } catch(e) {
        showError("Failed to download Kubeconfig", e.toString());
      }
    };

    const upgradeKubernetes = () => {
      router.push({
        query: {
          modal: "upgrade",
          cluster: item.value["metadata"]["name"],
          namespace: item.value["metadata"]["namespace"],
          uid: item.value["metadata"]["uid"]
        }
      });
    };

    const lastUpdated = computed(() => {
      const created = DateTime.fromISO(item.value["metadata"]["creationTimestamp"]).toRelative();
      if (!item.value["status"]) {
       return created;
      }

      const conditions = item.value["status"]["conditions"];

      if (!conditions) {
       return created;
      }

      const condition = conditions[0];

      return DateTime.fromISO(condition["lastTransitionTime"]).toRelative();
    });

    return {
      nodesCount,
      link,
      downloadTalosConfig,
      downloadKubeconfig,
      upgradeKubernetes,
      lastUpdated,
      pluralize: pluralize,
    }
  }
};
</script>
