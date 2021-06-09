<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex items-center" v-if="breadcrumbs.length > 0">
    <template v-for="crumb in breadcrumbs" :key="crumb.text">
      <router-link :to="crumb.to" >{{ crumb.text }}</router-link>
      <svg class="flex-shrink-0 h-5 w-5 text-talos-gray-500 text-opacity-50" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
      </svg>
    </template>
    <template v-if="$slots.default">
      <span class="current"><slot></slot></span>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { getBreadcrumbs } from '../router';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const breadcrumbs = ref(getBreadcrumbs(route));

    watch(() => route.params, () => {
      breadcrumbs.value = getBreadcrumbs(route);
    });

    watch(() => route.query, () => {
      breadcrumbs.value = getBreadcrumbs(route);
    });

    return {
      breadcrumbs
    };
  }
};
</script>

<style scoped>
.current, a {
  @apply text-sm font-medium text-talos-gray-500 dark:text-talos-gray-400;
}

a {
  @apply hover:text-opacity-50;
}
</style>
