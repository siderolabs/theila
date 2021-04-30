<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <t-breadcrumbs :active="$route.params.cluster + ' Pods'"/>
    </div>
    <stacked-list 
      class="flex-1"
      resource="pods.v1"
      idField="metadata.name"
      :provider="0"
      showCount
      itemName="Pod"
      :context="{cluster: {name: $route.params.cluster, namespace: $route.params.namespace, uid: $route.params.uid}}">
      <template v-slot:header>
        <div class="flex items-center md:grid md:grid-cols-6">
          <div class="block">
            Namespace
          </div>
          <div class="col-span-2 block">
            Name
          </div>
          <div class="block">
            Phase
          </div>
          <div class="col-span-2 block">
            Node
          </div>
        </div>
      </template>
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center min-w-0 px-4 py-4 sm:px-6 md:grid md:grid-cols-6 md:gap-4">
            <div class="block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.metadata.namespace }}
              </p>
            </div>
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
                {{ slot.item.status.phase }}
              </p>
            </div>
            <div class="col-span-2 block">
              <p
                class="text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100"
                >
                {{ slot.item.spec.nodeName }}
              </p>
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
import TBreadcrumbs from '../components/TBreadcrumbs.vue';

@Options({
  components: {
    StackedList,
    TBreadcrumbs,
  },
})
export default class Pods extends Vue{}
</script>
