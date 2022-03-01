<template>
  <nav class="nav">
    <div class="nav__list">
      <t-menu-item
        v-for="(item, idx) of menuItems"
        :key="idx"
        :route="item.route"
        :name="item.name"
        :icon="item.icon"
        :isActive="item.active"
        :isItemVisible="isServersItemVisible(item.name)"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import TMenuItem from "@/components/common/MenuItem/TMenuItem.vue";
import { getContext } from "@/context";
import { checkIsSidero } from "@/methods";
export default {
  components: { TMenuItem },
  setup() {
    const route = useRoute();
    let context = getContext();
    const menuItems = computed(() => {
      return [
        {
          name: "Overview",
          route:
            route.query.cluster !== undefined
              ? {
                  name: "OverviewPage",
                  query: {
                    cluster: route.query.cluster,
                    namespace: route.query.namespace,
                    uid: route.query.uid,
                  },
                }
              : "/overview",
          icon: "overview",
        },
        {
          name: "Nodes",
          route:
            route.query.cluster !== undefined
              ? {
                  name: "Nodes",
                  query: {
                    cluster: route.query.cluster,
                    namespace: route.query.namespace,
                    uid: route.query.uid,
                  },
                }
              : "/",
          icon: "nodes",
        },
        {
          name: "Pods",
          route:
            route.query.cluster !== undefined
              ? {
                  name: "Pods",
                  query: {
                    cluster: route.query.cluster,
                    namespace: route.query.namespace,
                    uid: route.query.uid,
                  },
                }
              : "/pods",
          icon: "podes",
        },
        {
          name: "Servers",
          route:
            route.query.cluster !== undefined
              ? {
                  name: "Servers",
                  query: {
                    cluster: route.query.cluster,
                    namespace: route.query.namespace,
                    uid: route.query.uid,
                  },
                }
              : "/servers",
          icon: "cloud-connection",
        },
        {
          name: "Upgrade Kubernetes",
          route:
            route.query.cluster !== undefined
              ? {
                  name: "Upgrade Kubernetes",
                  query: {
                    cluster: route.query.cluster,
                    namespace: route.query.namespace,
                    uid: route.query.uid,
                  },
                }
              : "/upgrade",
          icon: "kubernetes",
        },
      ];
    });
    let isSidero: any = ref(null);
    onMounted(() =>
      checkIsSidero(context).then((data) => (isSidero.value = data))
    );
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
        checkIsSidero(context).then((data) => (isSidero.value = data));
      }
    );
    const isServersItemVisible = (name) => {
      if (name == "Servers" && !isSidero.value) return false;
      return true;
    };
    return {
      route,
      menuItems,
      isSidero,
      isServersItemVisible,
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
