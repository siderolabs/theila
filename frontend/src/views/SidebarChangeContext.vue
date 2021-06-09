<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-col gap-2">
    <div class="px-3 py-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white"><strong>SIDERO</strong> UI</h1>
    </div>
    <shell-menu-item @click="cancel" name="Back">
      <template v-slot:icon>
        <arrow-sm-left-icon class="w-6 h-6"/>
      </template>
    </shell-menu-item>
    <t-input v-model="filter" placeholder="Search" style="margin-left: 3px; margin-right: 3px"/>
    <div class="overflow-y-auto flex-1 gap-2 flex-col flex m-2">
      <shell-menu-item :name="context.name" v-for="context in shownContexts" :active="active == context.name" :key="context.name" @click="() => changed(context)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, toRefs } from 'vue';
import ShellMenuItem from '../components/ShellMenuItem.vue';
import TInput from '../components/TInput.vue';
import {
  ArrowSmLeftIcon,
} from '@heroicons/vue/outline';

export default {
  props: {
    changed: {
      type: Function,
      required: true,
    },
    cancel: {
      type: Function,
      required: true,
    },
    contexts: Array,
    active: String,
  },

  components: {
    ArrowSmLeftIcon,
    ShellMenuItem,
    TInput,
  },

  setup(props) {
    const { contexts } = toRefs(props);
    const shownContexts = ref(contexts.value);
    const filter = ref("");

    watch([filter, contexts], () => {
      if(filter.value != "") {
        shownContexts.value = contexts.value.filter(item => item.name.includes(filter.value));
      } else {
        shownContexts.value = contexts.value;
      }
    }) 

    return {
      shownContexts,
      filter,
    }
  }
}
</script>
