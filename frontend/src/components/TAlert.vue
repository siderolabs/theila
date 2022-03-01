<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="classes" v-if="!closed">
    <div class="flex">
      <div class="flex-shrink-0" id="icon">
        <component :is="'icon-' + type" />
      </div>
      <div class="ml-3">
        <h3 id="title">{{ title }}</h3>
        <div id="description">
          <p>
            <slot></slot>
          </p>
        </div>
      </div>
      <div class="pl-3 ml-auto" v-if="withDismiss">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            @click="closed = true"
            id="dismiss"
            class="hover:bg-black dark:hover:bg-white hover:bg-opacity-10 focus:bg-black dark:focus:bg-white focus:outline-none focus:bg-opacity-10 focus:shadow-outline"
          >
            <span class="sr-only">Dismiss</span><x-icon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  ExclamationIcon,
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    XIcon,
    "icon-warning": ExclamationIcon,
    "icon-error": XCircleIcon,
    "icon-success": CheckCircleIcon,
    "icon-info": InformationCircleIcon,
  },

  props: {
    type: String,
    title: String,
    withDismiss: Boolean,
  },

  setup() {
    const closed = ref(false);

    return {
      closed,
    };
  },

  computed: {
    classes() {
      return `p-4 rounded-md alert-${this.type}`;
    },
  },
};
</script>

<style>
#title {
  @apply text-sm font-medium;
}

#description {
  @apply mt-2 text-sm font-normal;
}

#icon > * {
  @apply w-5 h-5;
}

#dismiss {
  @apply relative block px-1 py-1 text-sm font-semibold leading-5 transition-colors duration-200 bg-transparent rounded-md select-none;
}

.alert-error {
  @apply bg-red-300 bg-opacity-10;
}

.alert-error #title,
.alert-error #dismiss,
.alert-error #description {
  @apply text-red-400;
}

.alert-error #icon {
  @apply text-red-300;
}

.alert-info {
  @apply bg-blue-300 bg-opacity-10;
}

.alert-info #title,
.alert-info #dismiss,
.alert-info #description {
  @apply text-blue-400;
}

.alert-info #icon {
  @apply text-blue-300;
}

.alert-success {
  @apply bg-green-300 bg-opacity-10;
}

.alert-success #title,
.alert-success #dismiss,
.alert-success #description {
  @apply text-green-400;
}

.alert-success #icon {
  @apply text-green-300;
}

.alert-warning {
  @apply bg-yellow-300 bg-opacity-10;
}

.alert-warning #title,
.alert-warning #dismiss,
.alert-warning #description {
  @apply text-yellow-200;
}

.alert-warning #icon {
  @apply text-yellow-400;
}
</style>
