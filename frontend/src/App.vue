<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <shell v-if="connected">
    <template v-slot:menu>
      <shell-menu-item :link="{name: 'Clusters'}" name="Clusters">
        <template v-slot:icon>
          <view-grid-icon class="w-6 h-6"/>
        </template>
      </shell-menu-item>
      <shell-menu-item :link="{name: 'Servers'}" name="Servers">
        <template v-slot:icon>
          <server-icon class="w-6 h-6"/>
        </template>
      </shell-menu-item>
      <shell-menu-item :link="{name: 'Demo'}" name="Demo">
        <template v-slot:icon>
          <beaker-icon class="w-6 h-6"/>
        </template>
      </shell-menu-item>
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
  BeakerIcon,
  ServerIcon
} from '@heroicons/vue/outline';

@Options({
  components: {
    Shell,
    ShellMenuItem,
    ViewGridIcon,
    ServerIcon,
    BeakerIcon,
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
