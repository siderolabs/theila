<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div>
      <t-button @click="open = !open">
        <chevron-down-icon class="w-4 h-4"/>
        <span>{{ selected }}</span>
      </t-button>
    </div>
    <div v-if="open" class="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div class="py-1" role="none">
        <a v-for="item in options" @click="select(item)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" v-bind:key="item">{{ item }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TButton from './TButton.vue';
import {
  ChevronDownIcon,
} from '@heroicons/vue/solid';

@Options({
  components: {
    TButton,
    ChevronDownIcon,
  },

  props: {
    options: Array,
  },
  
  data() {
    return {
      open: false,
      selected: this.options[0] || "none",
    }
  },

  methods: {
    select(item: any) {
      this.selected = item;
      this.open = false;
      this.$emit("input", this.selected);
    }
  }
})
export default class TDropdown extends Vue {}
</script>
