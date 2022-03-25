<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div :class="{ dark: dark }" v-if="connected">
    <t-header />
    <t-shell>
      <template v-slot:menu>
        <t-side-bar :contexts="contexts">{{
          explicitContext ? explicitContext["name"] : currentContext
        }}</t-side-bar>
      </template>
      <template v-slot:content>
        <router-view class="w-full h-full" />
      </template>
    </t-shell>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { context, changeContext, detectCapabilities } from "./context";
import { theme, systemTheme, isDark } from "./theme";
import { ContextService } from "./api/grpc";
import { Context } from "./api/rpc/context.pb";
import THeader from "./components/THeader/THeader.vue";
import TSideBar from "./components/views/SideBar/TSideBar.vue";
import TShell from "./components/common/Shell/TShell.vue";

export default {
  components: {
    THeader,
    TSideBar,
    TShell,
  },

  setup() {
    const connected = ref(false);
    const dark = ref(false);
    const contexts = ref<Context[]>([]);
    const currentContext = ref("");
    const selectContext = ref(false);
    const router = useRouter();
    const route = useRoute();

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

      await detectCapabilities(route);
    });

    updateTheme(theme.value);

    watch<string>(theme, (val) => {
      updateTheme(val);
    });

    watch(
      () => route.query,
      (val, old) => {
        if (val.cluster != old.cluster) {
          detectCapabilities(route);
        }
      }
    );

    watch(context.current, (val, old) => {
      if (val != old) detectCapabilities(route);
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
