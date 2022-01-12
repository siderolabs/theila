<template>
  <t-watch kubernetes :context="ctx" :resource="{ type: kubernetes.pod }">
    <template #default="items">
      <div class="pods">
        <h3 class="pods__header">All Podes</h3>
        <div class="pods__search-box">
          <t-input
            @input.self="setInputValue"
            type="secondary"
            placeholder="Search..."
            @clearInput="setInputValue"
          />
          <t-pods-select-list @checkedValue="setFilterOption" />
          <t-select-list
            @checkedValue="setFilterOption"
            title="Phase"
            :defaultValue="TPodsViewFilterOptions.ALL"
            :values="TPodsViewFilterOptions"
          />
        </div>
        <ul class="pods__table-heading">
          <li class="pods__row-name">Namespace</li>
          <li class="pods__row-name">Name</li>
          <li class="pods__row-name">Phase</li>
          <li class="pods__row-name">Node</li>
        </ul>
        <t-pods-list
          :items="items"
          :filterOption="filterOption"
          :searchOption="inputValue"
        />
      </div>
    </template>
  </t-watch>
</template>

<script lang="ts">
import TInput from "@/components/common/TInput/TInput.vue";
import TWatch from "@/components/common/Watch/TWatch.vue";
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import { ref } from "@vue/reactivity";
import TPodsList from "./components/TPodsList.vue";
import TSelectList from "@/components/common/SelectList/TSelectList.vue";
import { TPodsViewFilterOptions } from "@/constants";
export default {
  components: { TInput, TWatch, TPodsList, TSelectList },
  setup() {
    const ctx = getContext();
    const filterOption = ref("All");
    const inputValue = ref("");
    const setFilterOption = (data) => {
      filterOption.value = String(data);
    };
    const setInputValue = (data) => {
      inputValue.value = data;
    };
    return {
      ctx,
      kubernetes,
      setFilterOption,
      filterOption,
      setInputValue,
      inputValue,
      TPodsViewFilterOptions,
    };
  },
};
</script>

<style scoped>
.pods {
  @apply flex flex-col h-full;
}
.pods__header {
  @apply text-xl text-naturals-N14 mb-7;
}
.pods__search-box {
  @apply flex justify-between mb-8;
}
.pods__table-heading {
  @apply w-full rounded bg-naturals-N2 flex justify-between items-center mb-1;
  padding: 10px 33px;
}
.pods__row-name {
  @apply text-xs text-naturals-N13;
}
.pods__row-name:nth-child(1) {
  width: 17%;
}
.pods__row-name:nth-child(2) {
  width: 33%;
}
.pods__row-name:nth-child(3) {
  width: 17%;
}
.pods__row-name:nth-child(4) {
  width: 33%;
}
</style>
