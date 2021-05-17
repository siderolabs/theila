<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="{dark: dark}">
    <t-modal/>
    <shell v-if="connected" class="h-screen">
      <template v-slot:menu>
        <router-view name="sidebar"/>
      </template>
      <template v-slot:content>
        <router-view class="w-full h-full"/>
      </template>
    </shell>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import Shell from './components/Shell.vue';
import TModal from './components/TModal.vue';
import { context } from './context';
import { theme, systemTheme } from './theme';

export default {
  components: {
    Shell,
    TModal,
  },

  setup() {
    const connected = ref(false);
    const dark = ref(false);

    const updateTheme = (mode) => {
      for(let i = 0; i < 2; i++) {
        switch(mode) {
          case "system":
            mode = systemTheme.value;
            break;
          case "dark":
            dark.value = true;
            return;
          case "light":
            dark.value = false;
            return;
        }
      }
    };

    onMounted(() => {
      context.api.connect().then(() => {
        connected.value = true;
      });
    });

    updateTheme(theme.value);

    watch(
      theme,
      (val) => {
        updateTheme(val);
      }
    );

    watch(
      systemTheme,
      (val) => {
        if(theme.value === "system")
          updateTheme(val);
      }
    );

    return {
      connected,
      dark
    };
  },
};
</script>
