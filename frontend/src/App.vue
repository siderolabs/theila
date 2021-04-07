<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="min-w-screen min-h-screen bg-gray-800 p-4"> 
    <div v-if="!connected">Connecting to the server</div>
    <preview v-else/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Preview from './components/Preview.vue';
import { context } from './context';

@Options({
  components: {
    Preview,
  },

  data() {
    return {
      connected: false,
    }
  },

  mounted() {
    context.api.connect().then(() => {
      this.connected = true;
    });
  }
})
export default class App extends Vue {}
</script>

<style>
/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 14px;
}
</style>
