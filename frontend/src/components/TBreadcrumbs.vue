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
    <template v-if="active">
      <span class="current">{{ active }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {
  ChevronRightIcon,
} from '@heroicons/vue/outline';

@Options({
  props: {
    active: String,
  },

  components: {
    ChevronRightIcon,
  },

  mounted() {
    this.updateState();
  },

  data() {
    return {
      breadcrumbs: [],
    };
  },

  watch: {
    '$route' () {
      this.updateState();
    },
  },

  methods: {
    updateState() {
      this.breadcrumbs = this.$route.meta.breadcrumbs || [];
    },
  }
})
export default class TBreadcrumbs extends Vue {}
</script>

<style scoped>
.current, a {
  @apply text-sm font-medium text-talos-gray-500 dark:text-talos-gray-400;
}

a {
  @apply hover:text-opacity-50;
}
</style>
