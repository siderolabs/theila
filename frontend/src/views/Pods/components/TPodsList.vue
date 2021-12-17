<template>
  <div class="list">
    <t-pods-item
      :searchOption="searchOption"
      :namespace="item?.metadata?.namespace"
      :name="item?.metadata?.name"
      :nodeName="item?.spec?.nodeName"
      :phase="item?.status?.phase"
      :podIP="item?.status?.podIP"
      :age="item?.status?.startTime"
      :containerStatuses="item?.status?.containerStatuses"
      v-for="(item, idx) in finalArr"
      :key="item?.metadata?.namespace + '/' + item?.metadata?.name || idx"
    />
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "@vue/reactivity";
import TPodsItem from "./TPodsItem.vue";
import { TPodsViewFilterOptions } from "@/constants";

export default {
  props: {
    items: Object,
    filterOption: String,
    searchOption: String,
  },
  components: { TPodsItem },
  setup(props) {
    const { items, filterOption, searchOption } = toRefs(props);

    const customizeItemsArray = (item, filterOption, searchOption) => {
      const array =
        filterOption !== TPodsViewFilterOptions.ALL
          ? item.filter((elem) => {
              return (
                elem?.status?.phase === filterOption &&
                elem?.metadata?.name?.includes(searchOption)
              );
            })
          : searchOption.length === 0
          ? item
          : item.filter((elem) => {
              return elem?.metadata?.name?.includes(searchOption);
            });
      return array;
    };
    return {
      customizeItemsArray,
      finalArr: computed(() => {
        return customizeItemsArray(
          items?.value?.items,
          filterOption.value,
          searchOption.value
        );
      }),
    };
  },
};
</script>

<style scoped>
.list {
  overflow: visible;
}
</style>
