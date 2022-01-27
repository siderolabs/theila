<template>
  <t-watch
    :resource="{ type: kubernetes.sideroServers }"
    kubernetes
    :context="getContext()"
  >
    <template #default="items">
      <t-servers-content :items="items.items" />
    </template>
  </t-watch>
</template>

<script>
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TServersContent from "./components/TServersContent.vue";
export default {
  components: { TWatch, TServersContent },
  setup() {
    return {
      kubernetes,
      getContext,
    };
  },
};
</script>

<style></style>
