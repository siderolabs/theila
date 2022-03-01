<template>
  <ul class="list">
    <li class="list__heading">
      <p class="list__heading-name">Name</p>
      <p
        class="list__heading-name list__heading-name--iconned"
        @click="() => (filterByCreatedStatus = !filterByCreatedStatus)"
      >
        Created
        <t-icon
          class="list__heading-icon"
          :class="{ rotated: filterByCreatedStatus }"
          icon="long-arrow-down"
        />
      </p>
      <p class="list__heading-name">Status</p>
      <p class="list__heading-name">Power</p>
    </li>
    <t-group-animation>
      <t-servers-content-list-item
        v-for="item in filteredItems"
        :key="item?.metadata?.name"
        :item="item"
      />
    </t-group-animation>
  </ul>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import TGroupAnimation from "@/components/common/Animation/TGroupAnimation.vue";
import { computed, ref, toRefs } from "@vue/reactivity";
import TServersContentListItem from "./TServersContentListItem.vue";
import {
  sortServersByTimestamp,
  isCreationTimeMatches,
  sortServersByNames,
} from "@/methods";
import { watch } from "@vue/runtime-core";

export default {
  components: { TIcon, TServersContentListItem, TGroupAnimation },
  props: {
    items: Array,
  },
  setup(props) {
    const filterByCreatedStatus = ref(false);
    const { items } = toRefs(props);
    watch(
      () => filterByCreatedStatus.value,
      () =>
        (items.value = isCreationTimeMatches(items.value)
          ? sortServersByNames(items.value, filterByCreatedStatus.value)
          : sortServersByTimestamp(items.value, filterByCreatedStatus.value))
    );

    return {
      filterByCreatedStatus,
      filteredItems: computed(() => items.value),
    };
  },
};
</script>

<style scoped>
.list {
  @apply w-full flex flex-col overflow-auto;
  flex-grow: 1;
}
.list__heading {
  @apply flex bg-naturals-N2 rounded-sm mb-1;
  padding: 10px 16px;
}
.list__heading-name {
  @apply text-xs text-naturals-N13;
  flex-basis: 20%;
}
.list__heading-name--iconned {
  @apply flex items-center cursor-pointer;
}
.list__heading-name:nth-child(1) {
  flex-basis: 40%;
}
.list__heading-icon {
  @apply fill-current text-naturals-N13 transition;
  width: 10px;
  height: 10px;
  margin-left: 4px;
}
.rotated {
  transform: rotate(180deg);
}
</style>
