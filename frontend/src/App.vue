<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="{ dark: dark }" v-if="connected">
    <t-modal />
    <t-header />
    <shell class="h-screen">
      <template v-slot:menu>
        <sidebar-change-context
          v-if="selectContext"
          :contexts="contexts"
          :active="explicitContext ? explicitContext['name'] : currentContext"
          :changed="switchContext"
          :cancel="() => (selectContext = false)"
          class="overflow-y-hidden h-screen"
        />
        <sidebar v-else />
        <t-button @click="toggleContextChange" :disabled="!contexts">
          <t-spinner v-if="!currentContext && !explicitContext" />
          <div v-else class="flex-1">
            {{ explicitContext ? explicitContext["name"] : currentContext }}
          </div>
        </t-button>
      </template>
      <template v-slot:content>
        <router-view class="w-full h-full" />
      </template>
    </shell>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Shell from "./components/Shell.vue";
import SidebarChangeContext from "./views/SidebarChangeContext.vue";
import Sidebar from "./views/Sidebar.vue";
import TModal from "./components/TModal.vue";
import TButton from "./components/TButton.vue";
import TSpinner from "./components/TSpinner.vue";
import { context, changeContext, detectCapabilities } from "./context";
import { theme, systemTheme, isDark } from "./theme";
import { ContextService } from "./api/grpc";
import { Context } from "./api/rpc/context.pb";
import THeader from './components/THeader/THeader.vue';

export default {
  components: {
    Shell,
    SidebarChangeContext,
    Sidebar,
    TModal,
    TButton,
    TSpinner,
    THeader,
  },

  setup() {
    const connected = ref(false);
    const dark = ref(false);
    const contexts = ref<Context[]>([]);
    const currentContext = ref("");
    const selectContext = ref(false);
    const router = useRouter();

    const updateTheme = (mode: string) => {
      dark.value = isDark(mode);
    };

    onMounted(async () => {
      await context.api.connect();

      const response = await ContextService.List();

      if (response.contexts) contexts.value = response.contexts;

      if (response.current && !context.current.value) {
        currentContext.value = response.current;
        context.current.value = {
          name: response.current,
        };
      }

      connected.value = true;

      await detectCapabilities();
    });

    updateTheme(theme.value);

    watch<string>(theme, (val) => {
      updateTheme(val);
    });

    watch(context.current, (val, old) => {
      if (val != old) detectCapabilities();
    });

    watch(systemTheme, (val) => {
      if (theme.value === "system") updateTheme(val);
    });

    const toggleContextChange = () => {
      selectContext.value = !selectContext.value;
    };

    const switchContext = (c) => {
      changeContext(c);

      selectContext.value = false;

      router.push("/");
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
