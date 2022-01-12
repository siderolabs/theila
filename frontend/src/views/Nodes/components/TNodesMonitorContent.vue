<template>
  <div class="monitor">
    <div class="monitor__heading">
      <t-breadcrumbs
        class="monitor__breadcrumbs"
        :nodeName="item[0]?.metadata?.name"
      />
      <div class="monitor__heading-buttons">
        <t-button
          class="monitor__heading-button"
          icon="reboot"
          iconPosition="left"
          type="secondary"
          @click="rebootNode"
          >Reboot</t-button
        >
        <t-button
          class="monitor__heading-button"
          icon="reset"
          iconPosition="left"
          type="secondary"
          @click="resetNode"
          >Reset</t-button
        >
      </div>
    </div>
    <t-nodes-content-type
      class="monitor__content-types"
      type="monitor"
      :ip="$route.params.node"
    />
    <div class="monitor__wrapper">
      <monitor />
    </div>
  </div>
</template>

<script>
import { computed, toRef } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import TButton from "@/components/common/Button/TButton.vue";
import TNodesContentType from "./TNodesContentType.vue";
import TBreadcrumbs from "@/components/TBreadcrumbs.vue";
import Monitor from "@/views/node/Monitor.vue";
export default {
  components: { TNodesContentType, TBreadcrumbs, TButton, Monitor },
  props: {
    items: Object,
  },
  setup(props) {
    const nodesList = toRef(props, "items");
    const router = useRouter();
    const route = useRoute();
    const rebootNode = async () => {
      router.push({
        query: {
          modal: "reboot",
          node: route.params.node,
          ...route.query,
        },
      });
    };

    const resetNode = async () => {
      router.push({
        query: {
          modal: "reset",
          node: route.params.node,
          ...route.query,
        },
      });
    };
    const getItem = () => {
      return nodesList.value.filter((item) => {
        let addr;
        for (const a of item.status.addresses) {
          if (a.type == "InternalIP") {
            addr = a.address;
          }

          if (a.type == "ExternalIP") {
            addr = a.address;
            break;
          }
        }
        return addr == route.params.node;
      });
    };
    return {
      rebootNode,
      resetNode,
      item: computed(() => getItem()),
    };
  },
};
</script>

<style scoped>
.monitor__heading {
  @apply flex w-full justify-between mb-9 flex-row flex-wrap;
}
.monitor__breadcrumbs {
  @apply xl:mb-0 mb-3;
}
.monitor__heading-buttons {
  @apply flex;
}
.monitor__heading-button {
  @apply text-naturals-N13;
}
.monitor__heading-button:nth-child(1) {
  border-radius: 4px 0 0 4px;
}
.monitor__heading-button:nth-child(2) {
  border-radius: 0 4px 4px 0;
}
.monitor__content-types {
  @apply mb-6;
}
.monitor__wrapper {
  @apply overflow-x-auto;
  max-height: 700px;
}
</style>
