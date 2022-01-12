<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex items-startflex-row flex-wrap" v-if="breadcrumbs.length > 0">
    <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.text">
      <div class="flex items-center">
        <router-link
          v-if="idx !== breadcrumbs.length - 1"
          class="all transition"
          :to="crumb.to"
          >{{
            crumb.text === $route.params.node && !!nodeName
              ? nodeName
              : crumb.text
          }}</router-link
        >
        <p v-if="idx == breadcrumbs.length - 1" class="last">
          {{
            crumb.text === $route.params.node && !!nodeName
              ? nodeName
              : crumb.text
          }}
        </p>
        <svg
          v-if="idx < breadcrumbs.length - 1"
          class="flex-shrink-0 h-5 w-5 text-talos-gray-500 text-opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
        </svg>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { getBreadcrumbs } from "../router";
import { useRoute } from "vue-router";

export default {
  props: {
    nodeName: {
      type: String,
      required: false,
    },
  },
  setup() {
    const route = useRoute();
    const breadcrumbs = ref(getBreadcrumbs(route));

    watch(
      () => route.params,
      () => {
        breadcrumbs.value = getBreadcrumbs(route);
      }
    );

    watch(
      () => route.query,
      () => {
        breadcrumbs.value = getBreadcrumbs(route);
      }
    );

    return {
      breadcrumbs,
    };
  },
};
</script>

<style scoped>
.all {
  @apply text-xl font-medium text-naturals-N9 hover:text-opacity-50;
}
.last {
  @apply text-xl font-medium text-naturals-N14 break-all cursor-default;
}
.nodeName__multiple {
  @apply flex items-center;
}
.multiple {
  @apply text-naturals-N9;
}
</style>
