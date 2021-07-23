
<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex-1 pb-3 logs">
    <div class="flex border-b border-talos-gray-300 dark:border-talos-gray-600 px-4 py-2 gap-1">
      <div class="flex-1">{{ logs.length }} lines</div>
      <t-checkbox v-model="follow" label="follow logs"/>
    </div>
    <div class="flex-1 flex flex-col overflow-auto w-full h-full text-xs" ref="logView" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">
      <div v-for="line, index in logs" :key="index" class="log-line">
        <div class="inline-block mr-2 text-talos-gray-500 font-bold select-none">{{ index + 1 }}</div>
        <p>{{ line }}</p>
      </div>
    </div>
  </div>
</template>

<script type="ts">
import TCheckbox from './TCheckbox.vue';
import { ref, onMounted, onUpdated, watch } from 'vue';

export default {
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },

  components: {
    TCheckbox,
  },

  setup() {
    const follow = ref(true);
    const logView = ref(null);

    const scrollToBottom = () => {
      if(!logView.value || !follow.value)
        return;

      logView.value.scrollTop = logView.value.scrollHeight;
    }

    onMounted(scrollToBottom);
    onUpdated(scrollToBottom);
    watch(follow, scrollToBottom);

    return {
      logView,
      follow,
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
