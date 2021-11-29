<template>
  <t-animation>
    <div class="logs">
      <p class="logs__title">Service logs for:</p>
      <p class="logs__node-name truncate">{{ node }}</p>
      <ul class="logs__list">
        <t-menu-item
          icon="log"
          v-for="service in services"
          :name="service.metadata.id"
          :key="service.metadata.id"
          :route="{
            name: 'Logs',
            query: {
              cluster: $route.query.cluster,
              namespace: $route.query.namespace,
              uid: $route.query.uid,
            },
            params: { node: $route.params.node, service: service.metadata.id },
          }"
        />
      </ul>
    </div>
  </t-animation>
</template>

<script lang="ts">
import { ref, onMounted, Ref } from "vue";

import TMenuItem from "../../../common/MenuItem/TMenuItem.vue";
import { getContext } from "../../../../context";
import { ResourceService } from "../../../../api/grpc";
import { Runtime } from "../../../../api/common/theila.pb";
import TAnimation from "../../../common/Animation/TAnimation.vue";
export default {
  components: { TMenuItem, TAnimation },
  props: {
    name: String,
  },
  setup() {
    const services: Ref<Object[]> = ref([]);
    const node = ref();
    const context = getContext();

    onMounted(async () => {
      const response = await ResourceService.List(
        {
          type: "services",
        },
        {
          runtime: Runtime.Talos,
          context: context,
        }
      );

      for (const items of response) {
        services.value = services.value.concat(items);
      }
    });
    onMounted(async () => {
      const nodename: any = await ResourceService.Get(
        {
          type: "nodename",
          id: "nodename",
        },
        {
          runtime: Runtime.Talos,
          context: context,
        }
      );
      node.value = nodename.spec.nodename;
    });

    return {
      services,
      node,
    };
  },
};
</script>

<style scoped>
.logs {
  @apply w-full py-4;
}
.logs__title {
  @apply text-xs text-naturals-N8 mb-2 px-6;
}
.logs__node-name {
  @apply text-xs text-naturals-N13 mb-6 px-6;
  font-size: 13px;
}
.logs__item {
  @apply w-full flex justify-start items-center mb-4 cursor-pointer;
}
.logs__icon {
  @apply mr-4 fill-current text-naturals-N10;
  width: 16px;
  height: 16px;
}
.logs__log-name {
  @apply text-xs text-naturals-N10;
}
</style>
