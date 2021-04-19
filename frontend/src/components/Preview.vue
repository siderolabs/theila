<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div>
      <ul class="flex w-full flex-wrap items-center h-10">
        <li class="block relative">
          <input type="text" name="resource" class="
                                     inline-flex 
                                     justify-center 
                                     w-full 
                                     rounded-md
                                     border
                                     border-gray-500
                                     shadow-sm
                                     px-2
                                     py-1
                                     bg-gray-900
                                     focus: bg-gray-750
                                     text-sm
                                     font-medium
                                     text-gray-300
                                     focus:border-gray-500
                                     focus:outline-none" placeholder="Resource Name" v-model="resourceInput" v-on:keyup.enter="watch">
        </li>
        <li class="block relative ml-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" @click="watch">
            Watch
          </button>
        </li>
      </ul>
    </div>
    <list-view :source="source" :resource="resource" idField="metadata.name" class="mt-3"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import ListView from './ListView.vue';
import Dropdown from './Dropdown.vue';

@Options({
  components: {
    ListView,
    Dropdown,
  },

  data() {
    return {
      resource: null,
      resourceInput: "",
    }
  },

  methods: {
    watch() {
      this.resource = this.resourceInput;
    }
  },
})
export default class HelloWorld extends Vue {
}
</script>
