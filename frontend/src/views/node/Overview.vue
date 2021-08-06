<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2">
      <t-breadcrumbs>{{ $route.params.node }}</t-breadcrumbs>
    </div>
    <div class="px-3">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Node Overview</h1>
    </div>
    <div>
      <t-alert v-if="err" title="Failed to Fetch Node Summary" type="error">
        {{ err }}.
      </t-alert>
      <div v-else-if="!item" class="flex flex-row justify-center items-center w-full h-full">
        <t-spinner/>
      </div>
      <div v-else class="flex flex-row gap-3">
        <stacked-list :items="summary" class="flex-1">
          <template v-slot:header>
            <div class="font-medium px-3 py-2">
             Kubernetes
            </div>
          </template>
          <template v-slot:default="slot">
            <div class="items-center grid grid-cols-3 p-3 h-9">
              <div class="truncate">
                {{ slot.item.name }}
              </div>
              <div class="truncate col-span-2">
                <div class="flex gap-1" v-if="slot.item.name === 'Roles'">
                  <t-label v-for="role in slot.item.value" v-bind:key="role" class="inline text-sm">{{ role }}</t-label>
                </div>
                <div class="flex gap-1" v-else-if="slot.item.name === 'Status'">
                  <t-label :col="slot.item.value === 'ready' ? 'green' : 'red'" class="uppercase">
                    <template v-slot:icon>
                      <check-circle-icon class="w-5 h-5" v-if="slot.item.value === 'ready'"/>
                      <exclamation-circle-icon class="w-5 h-5" v-else/>
                    </template>
                    {{ slot.item.value }}
                  </t-label>
                </div>
                <template v-else>
                  {{ slot.item.value }}
                </template>
              </div>
            </div>
          </template>
        </stacked-list>
        <stacked-list :items="nodeInfo" class="flex-1">
          <template v-slot:header>
            <div class="font-medium px-3 py-2">
              Node
            </div>
          </template>
          <template v-slot:default="slot">
            <div class="items-center grid grid-cols-3 p-3 h-9">
              <div class="truncate">
                {{ slot.item.name }}
              </div>
              <div class="truncate col-span-2">
                {{ slot.item.value }}
              </div>
            </div>
          </template>
        </stacked-list>
      </div>
    </div>
    <watch
        class="flex-1"
        :resource="{type: 'services'}"
        showCount
        itemName="Service"
        talos
        search="Search service by name"
        :context="getContext()">
      <template v-slot:header>
        <div class="flex items-center grid grid-cols-8">
          <div class="col-span-6 block">
            ID
          </div>
          <div class="block">
            Running
          </div>
          <div class="block">
            Health
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-3 py-2 grid grid-cols-8 gap-4">
            <div class="col-span-6 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.metadata.id }}
              </p>
            </div>
            <div class="block justify-center">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                <check-circle-icon class="ok" v-if="slot.item.spec.running"/>
                <x-circle-icon class="error" v-else/>
              </p>
            </div>
            <div class="block justify-center">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                <check-circle-icon class="ok" v-if="slot.item.spec.healthy"/>
                <question-mark-circle-icon class="info" v-else-if="slot.item.spec.unknown"/>
                <exclamation-circle-icon class="error" v-else/>
              </p>
            </div>
          </div>
        </a>
      </template>
    </watch>
  </div>
</template>

<script type="ts">
import { Runtime } from '../../api/common/theila.pb';
import { getContext } from '../../context';
import { ref, onMounted, computed } from 'vue';
import { ResourceService } from '../../api/grpc';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import TSpinner from '../../components/TSpinner.vue';
import TLabel from '../../components/TLabel.vue';
import TAlert from '../../components/TAlert.vue';
import StackedList from '../../components/StackedList.vue';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/solid';
import Watch from '../../components/Watch.vue';

export default {
  components: {
    CheckCircleIcon,
    ExclamationCircleIcon,
    TBreadcrumbs,
    TSpinner,
    TLabel,
    TAlert,
    StackedList,
    QuestionMarkCircleIcon,
    XCircleIcon,
    Watch,
  },

  setup() {
    const item = ref(null);
    const context = getContext();
    const err = ref(null);

    onMounted(async () => {
      try {
        const hostname = await ResourceService.Get({
          type: "hostname",
          id: "hostname",
        }, {
          runtime: Runtime.Talos,
          context: context,
        });

        const response = await ResourceService.Get({
          namespace: "default",
          type: "nodes.v1",
          id: hostname.spec.hostname,
        }, {
          runtime: Runtime.Kubernetes,
          context: context,
        });

        item.value = response;
      } catch(e) {
        err.value = e.toString();
      }
    });

    const getField = (...args) => {
      if(item.value == null)
        return null;

      let res = item.value;
      for(const k of args) {
        if(!res[k])
          return null;

        res = res[k];
      }

      return res;
    };

    const os = computed(() => {
      return getField("status", "nodeInfo", "osImage") || "";
    });

    const ip = computed(() => {
      const addresses = getField("status", "addresses");
      if(!addresses)
        return "unknown";

      let addr;
      for(const a of addresses) {
        if (a.type == "InternalIP") {
          addr = a.address;
        }

        if (a.type == "ExternalIP") {
          addr = a.address;
          break;
        }
      }

      return addr;
    });

    const status = computed(() => {
      const conditions = getField("status", "conditions");
      if(!conditions)
        return "not ready";

      for(const c of conditions) {
        if(c["type"] === "Ready" && c["status"] === "True")
          return "ready";
      }

      return "not ready";
    });

    const roles = computed(() => {
      const roles = [];

      for (const label in item.value.metadata.labels) {
        if (label.indexOf("node-role.kubernetes.io/") != -1) {
          roles.push(label.split("/")[1]);
        }
      }

      return roles;
    });

    const kubeletVersion = computed(() => {
      return getField("status", "nodeInfo", "kubeletVersion") || "";
    });

    return {
      item,
      getContext,
      err,
      summary: computed(() => {
        return [
          {name: "Hostname", value: getField("metadata", "name")},
          {name: "Kubelet Version", value: kubeletVersion.value},
          {name: "Kube Proxy Version", value: getField("status", "nodeInfo", "kubeProxyVersion")},
          {name: "Roles", value: roles.value},
          {name: "Status", value: status.value},
        ];
      }),
      nodeInfo: computed(() => {
        return [
          {name: "IP", value: ip.value},
          {name: "OS", value: os.value},
          {name: "Architecture", value: getField("status", "nodeInfo", "architecture")},
          {name: "Kernel Version", value: getField("status", "nodeInfo", "kernelVersion")},
          {name: "Container Runtime Version", value: getField("status", "nodeInfo", "containerRuntimeVersion")},
        ];
      }),
    }
  }
};
</script>

<style scoped>
.ok {
  @apply h-5 w-5 text-green-400;
}
.info {
  @apply h-5 w-5 text-blue-400;
}
.error {
  @apply h-5 w-5 text-red-600;
}
</style>
