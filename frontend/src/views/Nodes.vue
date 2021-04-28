<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">{{ $route.params.cluster }} Nodes</h1>
    </div>
    <stacked-list class="flex-1" resource="nodes.v1" idField="metadata.name" :provider="0" :context="{cluster: {name: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid}}">
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-1 min-w-0 md:grid md:grid-cols-5 md:gap-4">
                <div class="col-span-2 block">
                  <p
                    class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                    >
                    {{ slot.item.metadata.name }}
                  </p>
                </div>
                <div class="block">
                  <p
                    class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                    >
                    {{ getIP(slot.item) }}
                  </p>
                </div>
                <div class="col-span-2 block">
                  <p
                    class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100 space-x-1 space-y-1"
                    >
                    <span v-for="role in getRoles(slot.item)" v-bind:key="role">{{ role }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </template>
    </stacked-list>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import StackedList from '../components/StackedList.vue';

@Options({
  components: {
    StackedList,
  },

  methods: {
    getIP(item) {
      const status = item.status;
      let addr = "unknown";

      if (status == null) {
        return addr;
      }

      for (const a of status.addresses) {
        if (a.type == "InternalIP") {
          addr = a.address;
        }

        if (a.type == "ExternalIP") {
          addr = a.address;
          break;
        }
      }

      return addr;
    },

    getRoles(item) {
      const roles = [];

      for (const label in item.metadata.labels) {
        if (label.indexOf("node-role.kubernetes.io/") != -1) {
          roles.push(label.split("/")[1]);
        }
      }

      return roles;
    }
  },
})
export default class Nodes extends Vue{}
</script>
