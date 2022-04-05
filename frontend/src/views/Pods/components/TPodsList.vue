<template>
  <div class="list__wrapper">
    <t-pagination
      :items="filteredItems"
      :perPage="PAGINATION_PER_PAGE"
      :searchOption="searchOption"
    >
      <template #default="{ paginatedItems }">
        <div class="list">
          <t-pods-item
            :searchOption="searchOption"
            :namespace="item?.metadata?.namespace"
            :name="item?.metadata?.name"
            :nodeName="item?.spec?.nodeName"
            :phase="item?.status?.phase"
            :podIP="item?.status?.podIP"
            :age="getAge(item?.status?.startTime)"
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
import { DateTime } from "luxon";

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
      if (filterOption.value !== TPodsViewFilterOptions.ALL) {
        return items?.value?.items.filter((elem) => {
          if (
            elem?.status?.phase === filterOption.value &&
            elem?.metadata?.name?.includes(searchOption.value)
          ) {
            return true;
          } else if (
            elem?.status?.phase === filterOption.value &&
            elem?.metadata?.namespace?.includes(searchOption.value)
          ) {
            return true;
          } else if (
            elem?.status?.phase === filterOption.value &&
            elem?.spec?.nodeName?.includes(searchOption.value)
          ) {
            return true;
          }
        });
      } else if (searchOption.value?.length != 0) {
        return items?.value?.items.filter((elem) => {
          return (
            elem?.metadata?.name?.includes(searchOption.value) ||
            elem?.metadata?.namespace?.includes(searchOption.value) ||
            elem?.spec?.nodeName?.includes(searchOption.value)
          );
        });
      } else return items?.value?.items;
    });

    const getAge = (age) => {
      const currentDate = DateTime.now();
      const currentAge = DateTime.fromISO(age);

      const diff = currentDate
        .diff(currentAge, ["days", "hours", "minutes"])
        .toFormat("dd'd' hh'h' mm'm'");

      return diff;
    };
    return {
      filteredItems,
      PAGINATION_PER_PAGE,
      getAge,
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
