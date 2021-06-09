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
    <component :is="sidebar" v-if="sidebar"/>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { getSidebar } from '../router';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const sidebar = ref<any>(getSidebar(route));

    watch(() => route.params, () => {
      sidebar.value = getSidebar(route);
    });

    watch(() => route.query, () => {
      sidebar.value = getSidebar(route);
    });

    return {
      sidebar,
    }
  },
};
</script>
