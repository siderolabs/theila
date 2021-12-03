<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <button
    type="button"
    :disabled="disabled"
    class="TButton"
    :class="[
      type,
      fluid && 'fluid',
      {
        _left: icon && iconPosition === 'left',
        _right: icon && iconPosition === 'right',
      },
    ]"
    @click.self="() => $emit('click')"
  >
    <span class="TButton__text"><slot></slot></span>
    <t-icon
      :icon="icon"
      v-if="icon"
      class="TButton__icon"
      :class="{ _left: icon && iconPosition === 'left' }"
    />
  </button>
</template>

<script lang="ts">
import TIcon from "../Icon/TIcon.vue";
export default {
  components: { TIcon },
  props: {
    type: {
      validator(value: string) {
        return ["primary", "secondary", "subtle"].indexOf(value) !== -1;
      },
      default: "primary",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    iconPosition: {
      validator(value: string) {
        return ["left", "right"].indexOf(value) !== -1;
      },
      default: "right",
    },
  },
};
</script>

<style>
.TButton {
  @apply h-8 font-sans text-sm transition-colors duration-200;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
}
.TButton._left {
  padding-left: 14px;
}
.TButton._right {
  padding-right: 14px;
}
.TButton.primary {
  @apply text-naturals-N12
  border-naturals-N5
  bg-naturals-N3
  hover:bg-primary-P3
  hover:border-primary-P3
  hover:text-naturals-N14
  focus:text-naturals-N14
  focus:border-primary-P2
  focus:bg-primary-P2
  active:bg-primary-P4
  active:border-primary-P4
  active:text-naturals-N14
  disabled:border-naturals-N6
  disabled:bg-naturals-N4
  disabled:text-naturals-N7
  disabled:cursor-not-allowed;
}
.TButton.secondary {
  @apply bg-transparent
  text-naturals-N10
  border-naturals-N5
  hover:bg-naturals-N5
  hover:text-naturals-N14
  focus:bg-naturals-N5
  focus:text-naturals-N14
  focus:border-naturals-N7
  active:bg-naturals-N4
  active:text-naturals-N14
  active:border-naturals-N5
  disabled:bg-transparent
  disabled:text-naturals-N6
  disabled:border-naturals-N6
  disabled:cursor-not-allowed;
}

.TButton.subtle {
  @apply bg-transparent
  p-0
  border-none
  text-naturals-N13
  hover:text-primary-P3
  focus:text-primary-P2
  focus:underline
  active:text-primary-P4
  active:no-underline
  disabled:text-naturals-N6
  disabled:cursor-not-allowed;
}

.TButton__text {
  order: 0;
}

.TButton__icon {
  width: 14px;
  height: 14px;
  order: 1;
  margin-left: 6px;
}
.TButton__icon._left {
  order: -1;
  margin-left: 0;
  margin-right: 6px;
}
.fluid {
  @apply w-full max-w-full;
}
</style>
