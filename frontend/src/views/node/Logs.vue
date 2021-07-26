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
    <log-view :logs="logs" v-if="logs.length > 0"/>
  </div>
</template>

<script type="ts">
import { useRoute } from 'vue-router';
import TBreadcrumbs from '../../components/TBreadcrumbs.vue';
import TAlert from '../../components/TAlert.vue';
import LogView from '../../components/LogView.vue';
import { ref, watch, onUnmounted, computed } from 'vue';
import { MachineService, subscribe } from '../../api/grpc';
import { Runtime } from '../../api/common/theila.pb';
import { getContext } from '../../context';

export default {
  components: {
    TBreadcrumbs,
    TAlert,
    LogView,
  },

  setup() {
    const logs = ref([]);
    const route = useRoute();
    const context = getContext();

    let stream = ref(null);
    let buffer = "";
    let flush = null;

    const reset = () => {
      logs.value = [];
      buffer = "";
      clearTimeout(flush);
    };

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
        }, 50);
      }, {
        runtime: Runtime.Talos,
        context: context,
      });
    }

    init();

    watch(() => route.params.service, () => {
      init();
    });

    onUnmounted(() => {
      if(stream.value)
        stream.value.shutdown();
    });

    return {
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
