<template>
  <div class="content">
    <div class="pods__search-box">
      <t-input
        @input.self="setInputValue"
        type="secondary"
        placeholder="Search..."
        @clearInput="setInputValue"
      />
      <t-select-list
        title="Status"
        :defaultValue="TNodesViewFilterOptions.ALL"
        :values="TNodesViewFilterOptions"
        @checkedValue="setFilterOption"
      />
    </div>
    <t-nodes-list
      :items="items"
      :searchOption="inputValue"
      :filterOption="filterOption"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TInput from "@/components/common/TInput/TInput.vue";
import TSelectList from "@/components/common/SelectList/TSelectList.vue";
import { TNodesViewFilterOptions } from "@/constants";
import TNodesList from "./TNodesList.vue";
export default {
  components: { TInput, TSelectList, TNodesList },
  props: {
    items: {
      type: Object,
    },
  },
  setup() {
    const filterOption = ref("All");
    const inputValue = ref("");
    const setFilterOption = (data) => {
      filterOption.value = String(data);
    };
    const setInputValue = (data) => {
      inputValue.value = data;
    };

    return {
      setFilterOption,
      setInputValue,
      TNodesViewFilterOptions,
      inputValue,
      filterOption,
    };
  },
};
</script>

<style scoped>
.pods__search-box {
  @apply flex justify-between mb-3;
}
</style>
