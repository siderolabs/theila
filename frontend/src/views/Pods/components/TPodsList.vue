<template>
  <div class="list__wrapper">
    <t-pagination :items="filteredItems" :perPage="PAGINATION_PER_PAGE">
      <template #default="{ paginatedItems }">
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
            v-for="(item, idx) in paginatedItems"
            :key="item?.metadata?.namespace + '/' + item?.metadata?.name || idx"
          />
        </div>
      </template>
    </t-pagination>
  </div>
</template>

<script lang="ts">
import { computed, toRefs } from "@vue/reactivity";
import TPodsItem from "./TPodsItem.vue";
import { TPodsViewFilterOptions } from "@/constants";
import TPagination from "@/components/common/Pagination/TPagination.vue";

export default {
  props: {
    items: Object,
    filterOption: String,
    searchOption: String,
  },
  components: { TPodsItem, TPagination },
  setup(props) {
    const PAGINATION_PER_PAGE = 9;
    const { items, filterOption, searchOption } = toRefs(props);

    const filteredItems = computed(() => {
      return filterOption.value !== TPodsViewFilterOptions.ALL
        ? items?.value?.items.filter((elem) => {
            return (
              elem?.status?.phase === filterOption.value &&
              elem?.metadata?.name?.includes(searchOption.value)
            );
          })
        : searchOption.value?.length === 0
        ? items?.value?.items
        : items?.value?.items.filter((elem) => {
            return elem?.metadata?.name?.includes(searchOption.value);
          });
    });
    return {
      filteredItems,
      PAGINATION_PER_PAGE,
    };
  },
};
</script>

<style scoped>
.list {
  overflow: visible;
  flex-grow: 1;
}
.list__wrapper {
  @apply flex flex-col h-full;
}
</style>
