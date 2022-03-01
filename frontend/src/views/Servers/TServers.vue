<template>
  <t-watch
    :resource="{ type: kubernetes.sideroServers }"
    kubernetes
    :context="getContext()"
  >
    <template #default="items">
      <t-modal />
      <t-servers-content :items="items.items" class="pt-2" />
    </template>
  </t-watch>
</template>

<script>
import { getContext } from "@/context";
import { kubernetes } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TServersContent from "./components/TServersContent.vue";
import TModal from "@/components/TModal.vue";
export default {
  components: { TWatch, TServersContent, TModal },
  setup() {
    return {
      kubernetes,
      getContext,
    };
  },
};
</script>

<style></style>
