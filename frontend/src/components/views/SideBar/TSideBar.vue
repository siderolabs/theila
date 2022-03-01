<template>
  <t-animation>
    <aside class="side">
      <transition name="fade">
        <t-side-bar-cluster-dropdown
          v-click-outside="onClickOutside"
          v-if="isSidebarClusterDropdownsActive"
          :contexts="contexts"
        />
      </transition>
      <div
        ref="dropdown"
        class="side__cluster-box"
        @click="
          () =>
            (isSidebarClusterDropdownsActive = !isSidebarClusterDropdownsActive)
        "
      >
        <div ref="dropdownWrapper" class="side__wrapper">
          <p class="side__claster-name"><slot /></p>
          <p class="side__description">Cluster API</p>
        </div>
        <t-icon class="side__arrow" icon="arrow-right" />
      </div>
      <t-side-bar-list />
      <div class="side__disclosure">
        <component :is="sidebar" v-if="sidebar" />
      </div>
    </aside>
  </t-animation>
</template>

<script lang="ts">
import { ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import TSideBarClusterDropdown from "../SideBar/components/TSideBarClusterDropdown.vue";
import TSideBarList from "./components/TSideBarList.vue";
import vClickOutside from "click-outside-vue3";
import TSideBarNodesLogs from "./components/TSideBarNodesLogs.vue";
import { getTSideBarNodesLogs } from "@/router";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    TIcon,
    TAnimation,
    TSideBarClusterDropdown,
    TSideBarList,
    TSideBarNodesLogs,
  },
  props: {
    contexts: Array,
  },
  setup() {
    const isSidebarClusterDropdownsActive = ref(false);
    const dropdown = ref(null);
    const dropdownWrapper = ref(null);
    const route = useRoute();
    const sidebar = ref<any>(getTSideBarNodesLogs(route));

    watch(
      () => [route.query, route.params],
      () => {
        sidebar.value = getTSideBarNodesLogs(route);
      }
    );

    const onClickOutside = (e) => {
      if (
        e.target.parentElement !== dropdown.value &&
        e.target.parentElement !== dropdownWrapper.value &&
        e.target !== dropdown.value
      ) {
        isSidebarClusterDropdownsActive.value = false;
      }
    };
    return {
      isSidebarClusterDropdownsActive,
      onClickOutside,
      dropdown,
      dropdownWrapper,
      sidebar,
    };
  },
};
</script>

<style scoped>
.side {
  @apply bg-naturals-N1 relative w-48 lg:w-64;
  height: 100%;
}

.side__cluster-box {
  @apply flex justify-between items-center py-3 px-6 border-b border-naturals-N4 cursor-pointer;
}
.side__cluster-box:hover .side__arrow {
  transform: scale(1.2) translate(3px);
}
.side__wrapper {
  @apply flex-col;
}
.side__arrow {
  @apply fill-current text-naturals-N9 transition-all duration-300;
  width: 14px;
  height: 14px;
}
.side__claster-name {
  @apply text-sm text-naturals-N13;
  margin-bottom: 6px;
}
.side__description {
  @apply text-xs text-naturals-N9;
}
.side__disclosure {
  @apply border-t border-naturals-N4;
}
</style>
