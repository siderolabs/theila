<template>
  <div class="nodes-list">
    <div class="nodes-list__heading">
      <p class="nodes-list__heading-title">Name</p>
      <p class="nodes-list__heading-title">IP</p>
      <p class="nodes-list__heading-title">OS</p>
      <p class="nodes-list__heading-title">Roles</p>
      <p class="nodes-list__heading-title">Status</p>
    </div>
    <t-group-animation>
      <t-nodes-item
        v-for="item in filteredNodesList"
        :key="item?.metadata?.name"
        :item="item"
        :searchOption="searchOption"
      />
    </t-group-animation>
  </div>
</template>

<script>
import TNodesItem from "./TNodesItem.vue";
import TGroupAnimation from "@/components/common/Animation/TGroupAnimation.vue";
import { computed, toRefs } from "@vue/reactivity";
import { TNodesViewFilterOptions } from "@/constants";
import { getField, getStatus } from "@/methods";

export default {
  components: { TNodesItem, TGroupAnimation },
  props: {
    items: Object,
    searchOption: String,
    filterOption: String,
  },
  setup(props) {
    const { items, searchOption, filterOption } = toRefs(props);
    const filteredNodesList = computed(() => {
      return filterOption.value !== TNodesViewFilterOptions.ALL
        ? items?.value?.filter((elem) => {
            const addresses = getField(elem, "status", "addresses");
            if (!addresses) return "unknown";

            let addr;
            for (const a of addresses) {
              if (a.type == "InternalIP") {
                addr = a.address;
              }

              if (a.type == "ExternalIP") {
                addr = a.address;
                break;
              }
            }
            return (
              (getStatus(elem) === filterOption.value &&
                elem?.metadata?.name?.includes(searchOption.value)) ||
              (getStatus(elem) === filterOption.value &&
                elem?.status?.nodeInfo?.osImage?.includes(
                  searchOption.value
                )) ||
              (getStatus(elem) === filterOption.value &&
                addr.includes(searchOption.value))
            );
          })
        : searchOption.value?.length === 0
        ? items?.value
        : items?.value?.filter((elem) => {
            const addresses = getField(elem, "status", "addresses");
            if (!addresses) return "unknown";

            let addr;
            for (const a of addresses) {
              if (a.type == "InternalIP") {
                addr = a.address;
              }

              if (a.type == "ExternalIP") {
                addr = a.address;
                break;
              }
            }
            return (
              elem?.metadata?.name?.includes(searchOption.value) ||
              elem?.status?.nodeInfo?.osImage?.includes(searchOption.value) ||
              addr.includes(searchOption.value)
            );
          });
    });
    return {
      filteredNodesList,
    };
  },
};
</script>

<style scoped>
.nodes-list__heading {
  @apply flex items-center bg-naturals-N2;
  padding: 10px 16px;
}
.nodes-list__heading-title {
  @apply text-xs text-naturals-N13;
}
.nodes-list__heading-title:nth-child(1) {
  max-width: 25%;
  width: 100%;
}
.nodes-list__heading-title:nth-child(2) {
  max-width: 15%;
  width: 100%;
}
.nodes-list__heading-title:nth-child(3) {
  max-width: 20%;
  width: 100%;
}
.nodes-list__heading-title:nth-child(4) {
  max-width: 20%;
  width: 100%;
}
.nodes-list__heading-title:nth-child(5) {
  max-width: 20%;
  width: 100%;
}
</style>
