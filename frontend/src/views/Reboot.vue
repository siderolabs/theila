<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="sm:flex sm:items-start p-5 max-w-xl">
    <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400 text-yellow-400 bg-opacity-20 sm:mx-0 sm:h-10 sm:w-10">
      <exclamation-icon class="w-6 h-6" fill="currentColor"/>
    </div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 class="text-lg leading-6 font-medium text-talos-gray-900 dark:text-talos-gray-100" id="modal-title">Reboot the Node {{ node }}</h3>
      <div class="mt-2">
        <p class="text-sm text-talos-gray-500 dark:text-talos-gray-300">Please confirm the action.</p>
      </div>
    </div>
  </div>
  <div class="bg-talos-gray-50 dark:bg-talos-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
    <t-button small primary :disabled="!node || state === 'Rebooting'" @click="reboot">{{ state }}</t-button>
    <t-button small @click="close">Cancel</t-button>
  </div>
</template>

<script lang="ts">
import TButton from '../components/TButton.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MachineService, getCluster } from '../api/grpc';
import { Runtime } from '../api/common/theila.pb';
import {
  ExclamationIcon,
} from '@heroicons/vue/outline';
import { showError } from '../modal';

export default {
  components: {
    TButton,
    ExclamationIcon,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = ref("Reboot");

    const close = () => {
      router.replace({ query: {
        modal: undefined,
        node: undefined,
      }});
    };

    return {
      node: route.query.node,
      state,
      close,
      reboot: async () => {
        state.value = "Rebooting";

        try {
          const res = await MachineService.Reboot({}, {
            runtime: Runtime.Talos,
            metadata: {
              nodes: [route.query.node],
              ...getCluster(route),
            }
          });

          const errors: string[] = [];
          for(const message of res.messages) {
            if(message.metadata.error)
              errors.push(`${message.metadata.hostname || route.query.node} ${message.metadata.error}`);
          }

          if(errors.length > 0)
            throw new Error(errors.join(", "))

          close();
        } catch(e) {
          close();

          showError("Failed to Issue Reboot", e.toString())
        }
      }
    }
  },
}
</script>
