<template>
  <t-animation>
    <div class="clusters">
      <div class="clusters__input-box">
        <t-input />
      </div>
      <div class="clusters__checkbox-box">
        <t-side-bar-cluster-checkbox />
      </div>
      <div class="clusters__list">
        <t-side-bar-cluster-dropdown-item
          v-for="(context, idx) in shownContexts"
          :key="idx"
          :name="context.name"
        />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
        <t-side-bar-cluster-dropdown-item name="test" />
      </div>
    </div>
  </t-animation>
</template>

<script lang="ts">
import TInput from "../../../common/TInput/TInput.vue";
import TSideBarClusterCheckbox from "./TSideBarClusterCheckbox.vue";
import TAnimation from "../../../common/Animation/TAnimation.vue";
import TSideBarClusterDropdownItem from "./TSideBarClusterDropdownItem.vue";
import { ref, toRefs } from "@vue/reactivity";
export default {
  components: {
    TSideBarClusterCheckbox,
    TInput,
    TAnimation,
    TSideBarClusterDropdownItem,
  },
  props: {
    contexts: Array,
  },
  setup(props) {
    const { contexts } = toRefs(props);
    const shownContexts = ref(contexts.value);

    return {
      shownContexts,
    };
  },
};
</script>

<style scoped>
.clusters {
  @apply bg-naturals-N2 rounded border border-naturals-N4 absolute z-50;
  left: calc(100% + 8px);
  top: 8px;
  width: 212px;
  height: auto;
  padding-right: 4px;
}
.clusters__input-box {
  @apply p-4 border-b border-naturals-N4;
}
.clusters__checkbox-box {
  @apply w-full flex justify-center;
  padding: 16px 0px 4px;
}
.clusters__list {
  @apply relative flex-col z-10;
  width: 100%;
  height: 364px;
  overflow: auto;
}
.clusters__list::-webkit-scrollbar {
  @apply w-1;
  background-color: transparent;
}
.clusters__list::-webkit-scrollbar-thumb {
  @apply w-1 bg-naturals-N5 border border-naturals-N4 rounded;
}
</style>
