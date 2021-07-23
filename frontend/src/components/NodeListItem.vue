<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <router-link
    :to="{name: 'Overview', params: { node: ip }, query: getQuery() }"
    class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800 flex"
    >
    <div class="flex-1 flex items-center px-4 py-3 sm:px-6 min-w-0 md:grid md:grid-cols-7 md:gap-4">
      <div class="block justify-self-left">
        <p
          class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
          >
          {{ item.metadata.name }}
        </p>
      </div>
      <div class="block justify-self-left">
        <p
          class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
          >
          {{ ip }}
        </p>
      </div>
      <div class="justify-self-center">
        {{ os }}
      </div>
      <div class="col-span-2 block justify-self-center">
        <p
          class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100 space-x-1 space-y-1"
          >
          <t-label v-for="role in roles" v-bind:key="role">{{ role }}</t-label>
        </p>
      </div>
      <div class="justify-self-center">
        <t-label :col="status === 'ready' ? 'green' : 'red'" class="uppercase">
          <template v-slot:icon>
            <check-circle-icon class="w-5 h-5" v-if="status === 'ready'"/>
            <exclamation-circle-icon class="w-5 h-5" v-else/>
          </template>
          {{ status }}
        </t-label>
      </div>
      <div v-on:click.stop.prevent.self class="justify-self-end">
        <t-dropdown xs :disabled="!isTalos">
          <template v-slot:icon>
            <dots-horizontal-icon
              class="w-5 h-5 text-talos-gray-900 dark:text-talos-gray-50"
              aria-hidden="true"
              />
          </template>
          <template v-slot:default>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="rebootNode"
                :class="{ active }"
                >Reboot</a
              >
            </menu-item>
            <menu-item v-slot="{ active }">
              <a
                v-on:click="resetNode"
                :class="{ active }"
                >Reset</a
              >
            </menu-item>
          </template>
        </t-dropdown>
      </div>
    </div>
  </router-link>
</template>

<script type="ts">
import { useRoute } from 'vue-router';
import { computed, toRefs } from 'vue';
import TDropdown from '../components/TDropdown.vue';
import TLabel from '../components/TLabel.vue';
import { MenuItem } from '@headlessui/vue';
import {
  DotsHorizontalIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';

export default {
  components: {
    TDropdown,
    TLabel,
    MenuItem,
    DotsHorizontalIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
  },

  props: {
    item: {
      type: Object,
      required: true,
    }
  },

  setup(props) {
    const { item } = toRefs(props);
    const router = useRouter();

    const getField = (...args) => {
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

    // primitive check that this is a Talos node
    const isTalos = computed(() => {
      return os.value.indexOf("Talos") != -1;
    });

    const route = useRoute();

    const getQuery = () => {
      const query = {};

      if(route.query.cluster && route.query.namespace && route.query.uid) {
        query.cluster = route.query.cluster;
        query.namespace = route.query.namespace || "default";
        query.uid = route.query.uid;
      }

      return query;
    };

    const rebootNode = async () => {
      router.replace({
        query: {
          modal: "reboot",
          node: ip.value,
        }
      })
    };

    const resetNode = async () => {
      router.replace({
        query: {
          modal: "reset",
          node: ip.value,
        }
      });
    };

    return {
      os,
      ip,
      status,
      roles,
      isTalos,
      rebootNode,
      resetNode,
      getQuery,
    }
  }
};
</script>
