<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <shell v-if="connected">
    <template v-slot:menu>
      <router-view name="sidebar"/>
    </template>
    <template v-slot:content>
      <router-view class="w-full h-full"/>
    </template>
  </shell>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Shell from './components/Shell.vue';
import ShellMenuItem from './components/ShellMenuItem.vue';
import { context } from './context';
import {
  ViewGridIcon,
  ServerIcon
} from '@heroicons/vue/outline';


@Options({
  components: {
    Shell,
    ShellMenuItem,
    ViewGridIcon,
    ServerIcon,
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
