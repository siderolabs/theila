<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col">
    <div class="flex-0 px-3 py-2 mb-2">
      <t-breadcrumbs>{{ $route.params.node }} {{ $route.params.service }} Logs</t-breadcrumbs>
    </div>
    <t-alert v-if="err" :title="logs ? 'Disconnected' : 'Failed to Fetch Logs'" type="error" class="mb-2">
      {{ err }}.
    </t-alert>
    <div v-if="logs.length > 0" class="flex-1 pb-3 logs">
      <div class="flex border-b border-talos-gray-300 dark:border-talos-gray-600 p-4 gap-1">
        <div class="flex-1">{{ logs.length }} lines</div>
        <div class="flex items-center justify-center gap-2 text-talos-gray-800 hover:text-talos-gray-600 dark:text-talos-gray-400 dark:hover:text-talos-gray-300">
          <Switch
            v-model="follow"
            class="inline-flex justify-center items-center w-5 h-5 rounded-md border-2 border-talos-gray-800 dark:border-talos-gray-400 outline-none"
            >
            <check-icon v-if="follow" class="w-4 h-4 inline-block"/>
          </Switch>
          <div @click="() => { follow = !follow }" class="cursor-pointer uppercase text-sm select-none font-bold">Follow Logs</div>
        </div>
      </div>
      <div class="flex-1 flex flex-col overflow-auto w-full h-full text-xs" ref="logView" style="font-family: monospace">
        <div v-for="line, index in logs" :key="index" class="log-line">
          <div class="inline-block mr-2 text-talos-gray-500 font-bold select-none">{{ index + 1 }}</div>
          <p>{{ line }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="ts">
import { useRoute } from 'vue-router';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import TAlert from '../../components/TAlert.vue';
import { ref, watch, onUnmounted, onUpdated, computed } from 'vue';
import { MachineService, subscribe, getCluster } from '../../api/grpc';
import { Runtime } from '../../api/common/theila.pb';
import { Switch } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default {
  components: {
    CheckIcon,
    Switch,
    TBreadcrumbs,
    TAlert,
  },

  setup() {
    const logs = ref([]);
    const route = useRoute();
    const follow = ref(true);
    const logView = ref(null);

    let stream = ref(null);
    let buffer = "";
    let flush = null;

    const reset = () => {
      logs.value = [];
      buffer = "";
      clearTimeout(flush);
    };

    const scrollToBottom = () => {
      if(!logView.value)
        return;

      logView.value.scrollTop = logView.value.scrollHeight;
    }

    onUpdated(() => {
      if(follow.value)
        scrollToBottom();
    });

    const init = () => {
      if(stream.value)
        stream.value.shutdown();

      reset();

      const method = route.params.service == "dmesg" ? MachineService.Dmesg : MachineService.Logs;
      let params = {};

      if(route.params.service == "dmesg") {
        params = {
          follow: true,
        }
      } else {
        params = {
          namespace: "system",
          id: route.params.service,
          follow: true,
          tailLines: -1,
        }
      }

      let clearLogs = false;

      stream.value = subscribe(method, params, (resp) => {
        clearTimeout(flush);

        if(resp.error) {
          clearLogs = true;
          return;
        }

        if(clearLogs)
          reset();

        clearLogs = false;

        buffer += atob(resp.bytes);

        // accumulate frequent updates and then flush them in a single call
        flush = setTimeout(() => {
          const splitPoint = buffer.lastIndexOf("\n");
          logs.value = logs.value.concat(buffer.slice(0, splitPoint).split("\n"))
          buffer = buffer.slice(splitPoint + 1, buffer.length);
          scrollToBottom();
        }, 50);
      }, {
        runtime: Runtime.Talos,
        metadata: {
          nodes: [route.params.node],
          ...getCluster(route),
        },
      });
    }

    init();

    watch(() => route.params.service, () => {
      init();
    });

    watch(follow, (val) => {
      if(val)
        scrollToBottom();
    });

    onUnmounted(() => {
      if(stream.value)
        stream.value.shutdown();
    });

    return {
      logView,
      follow,
      err: computed(() => {
        return stream.value ? stream.value.err : null;
      }),
      logs: computed(() => {
        if(logs.value[logs.value.length - 1] == "") {
          return logs.value.slice(0, logs.value.length - 2);
        }

        return logs.value;
      }),
    }
  }
}
</script>

<style scoped>
.logs {
  @apply flex flex-col w-full h-full overflow-hidden bg-white text-talos-gray-100 border rounded-md border-talos-gray-300 dark:border-talos-gray-600 dark:bg-talos-gray-900 text-talos-gray-900 dark:text-talos-gray-100;
}

.log-line {
  @apply hover:bg-talos-gray-100 dark:hover:bg-talos-gray-700 whitespace-pre-line flex px-3;
}
</style>
