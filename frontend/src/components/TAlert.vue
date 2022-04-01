<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="alert" :class="'alert-' + type">
    <div class="alert__box">
      <div class="alert__icon-wrapper" id="icon">
        <component :is="'icon-' + type" />
      </div>
      <div class="alert__info-wrapper">
        <h3 id="title">{{ title }}</h3>
        <div id="description">
          <p>
            <slot></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { XCircleIcon, InformationCircleIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";

export default {
  components: {
    XIcon,
    "icon-error": XCircleIcon,
    "icon-info": InformationCircleIcon,
  },

  props: {
    type: String,
    title: String,
  },
};
</script>

<style>
.alert {
  @apply p-4 rounded-md;
}
.alert__box {
  @apply flex;
}
.alert__icon-wrapper {
  @apply flex justify-center items-center;
}
.alert__info-wrapper {
  @apply ml-3;
}
#title {
  @apply text-sm font-medium;
}

#description {
  @apply mt-2 text-sm font-normal;
}

#icon > * {
  @apply w-5 h-5;
}

.alert-error {
  border: 1px solid #272932;
  border-left-width: 4px;
  border-left-color: #6e2f30;
}

.alert-error #title {
  @apply text-red-400;
}
.alert-error #description {
  @apply text-naturals-N9;
}

.alert-error #icon {
  @apply text-red-400;
}

.alert-info {
  border: 1px solid #272932;
  border-left-width: 4px;
  border-left-color: #0c6ee7;
}

.alert-info #title {
  @apply text-blue-400;
}
.alert-info #description {
  @apply text-naturals-N9;
}

.alert-info #icon {
  @apply text-blue-400;
}
</style>
