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
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { ref } from "@vue/runtime-core";
import TMenuItem from "@/components/common/MenuItem/TMenuItem.vue";
export default {
  components: { TMenuItem },
  setup() {
    const router = useRoute();

    const menuItems = ref([
      {
        name: "Overview",
        route: "/overview",
        icon: "overview",
      },
      {
        name: "Nodes",
        route: "/",
        icon: "nodes",
      },
      {
        name: "Pods",
        route: "/pods",
        icon: "podes",
      },
      {
        name: "Servers",
        route: "/servers",
        icon: "cloud-connection",
      },
      {
        name: "Upgrade Kubernetes",
        route: "/upgrade",
        icon: "kubernetes",
      },
    ]);
    return {
      router,
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
