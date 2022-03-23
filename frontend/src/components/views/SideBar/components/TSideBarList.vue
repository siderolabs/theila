<template>
  <nav class="nav">
    <div class="nav__list">
      <t-menu-item
         v-for="item of menuItems"
         :key="item.name"
         :route="item.route"
         :name="item.name"
         :icon="item.icon"
         :isActive="item.active"
       />
    </div>
  </nav>
</template>

<script lang="ts">
import TMenuItem from "@/components/common/MenuItem/TMenuItem.vue";

import { useRoute } from "vue-router";
import { computed, watch } from "@vue/runtime-core";
import { context as ctx, getContext } from "@/context";

export default {
  components: { TMenuItem },
  setup() {
    const route = useRoute();
    const context = getContext();
    const getRoute = (name: string, path: string) => {
      return route.query.cluster !== undefined ? {
        name: name,
        query: {
          cluster: route.query.cluster,
          namespace: route.query.namespace,
          uid: route.query.uid,
        },
      } : path
    }

    const menuItems = computed(() => {
      const res = [
        {
          name: "Overview",
          route: getRoute("OverviewPage", "/overview"),
          icon: "overview",
        },
        {
          name: "Nodes",
          route: getRoute("Nodes", "/"),
          icon: "nodes",
        },
        {
          name: "Pods",
          route: getRoute("Pods", "/pods"),
          icon: "podes",
        },
      ];

      if (ctx.capabilities.sidero.value) {
        res.push({
          name: "Servers",
          route: getRoute("Servers", "/servers"),
          icon: "cloud-connection",
        });
      }

      res.push({
        name: "Upgrade Kubernetes",
        route: getRoute("Upgrade Kubernetes", "/upgrade"),
        icon: "kubernetes",
      });

      return res;
    });

    watch(
      () => route.query,
      () => {
        if (route.query.cluster) {
          context.cluster = {
            name: String(route?.query?.cluster),
            namespace: String(route?.query?.namespace),
            uid: String(route?.query?.uid),
          };
        } else context.cluster = undefined;
      }
    );

    return {
      route,
      menuItems,
    };
  },
};
</script>

<style scoped>
.nav {
  @apply py-6;
}
.nav__list {
  @apply flex-col;
}
</style>
