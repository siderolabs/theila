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
        <sidebar-change-context v-if="selectContext" :contexts="contexts" :active="explicitContext || currentContext" :changed="switchContext" :cancel="() => selectContext = false" class="overflow-y-hidden h-screen"/>
        <router-view v-else name="sidebar" />
        <t-button @click="toggleContextChange" :disabled="!contexts">
          <t-spinner v-if="!currentContext && !explicitContext"/>
          <template>
            {{ explicitContext || currentContext }}
          </template>
        </t-button>
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
import SidebarChangeContext from './views/SidebarChangeContext.vue';
import TModal from './components/TModal.vue';
import TButton from './components/TButton.vue';
import TSpinner from './components/TSpinner.vue';
import { context, changeContext } from './context';
import { theme, systemTheme } from './theme';
import { ContextService } from './api/grpc';
import { Context } from './api/context.pb';

export default {
  components: {
    Shell,
    SidebarChangeContext,
    TModal,
    TButton,
    TSpinner,
  },

  setup() {
    const connected = ref(false);
    const dark = ref(false);
    const contexts = ref<Context[]>([]);
    const currentContext = ref("");
    const selectContext = ref(false);

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

    onMounted(async () => {
      await context.api.connect();

      connected.value = true;

      const response = await ContextService.List();

      if(response.contexts)
        contexts.value = response.contexts;

      if(response.current)
        currentContext.value = response.current;
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

    const toggleContextChange = () => {
      selectContext.value = !selectContext.value;
    };

    const switchContext = (name) => {
      changeContext(name);

      selectContext.value = false;
    };

    return {
      connected,
      dark,
      contexts,
      currentContext,
      selectContext,
      toggleContextChange,
      switchContext,
      explicitContext: context.current,
    };
  },
};
</script>
