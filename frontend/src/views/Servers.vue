<template>
  <div class="flex flex-col">
    <div class="px-3 py-2 mb-2">
      <div class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Servers</div>
    </div>
    <stacked-list class="flex-1" resource="servers.v1alpha1.metal.sidero.dev" idField="metadata.name" :provider="0">
      <template v-slot:default="slot">
        <a
          class="block hover:bg-talos-gray-50 dark:hover:bg-talos-gray-800"
          >
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-1 min-w-0 md:grid md:grid-cols-7 md:gap-4">
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
                    {{ slot.item.spec.hostname }}
                  </p>
                </div>
                <div class="block">
                  <div class="flex items-center text-sm text-talos-gray-500 dark:text-talos-gray-400">
                    <div v-if="slot.item.status.ready">
                      <check-circle-icon
                        class="flex-shrink mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                        />
                    </div>
                    <div v-else>
                      <x-circle-icon
                        class="flex-shrink mr-1.5 h-5 w-5 text-red-600"
                        aria-hidden="true"
                        />
                    </div>
                    <span v-if="slot.item.status.ready" class="truncate">Ready</span>
                    <span v-else class="truncate">Not Ready</span>
                  </div>
                </div>
                <div class="block">
                  <div class="flex items-center text-sm text-talos-gray-500 dark:text-talos-gray-400">
                    <div v-if="slot.item.status.isClean">
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
                    <span v-if="slot.item.status.isClean" class="truncate">Clean</span>
                    <span v-else class="truncate">Dirty</span>
                  </div>
                </div>
                <div class="block">
                  <div class="flex items-center text-sm text-talos-gray-500 dark:text-talos-gray-400">
                    <div v-if="slot.item.status.power === 'on'">
                      <lightning-bolt-icon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                        />
                    </div>
                    <div v-else>
                      <lightning-bolt-icon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-600"
                        aria-hidden="true"
                        />
                    </div>
                    <span class="truncate">{{ slot.item.status.power }}</span>
                  </div>
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
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon,
  LightningBoltIcon,
} from '@heroicons/vue/solid';

@Options({
  components: {
    StackedList,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
    LightningBoltIcon,
  },
})
export default class Servers extends Vue{}
</script>
