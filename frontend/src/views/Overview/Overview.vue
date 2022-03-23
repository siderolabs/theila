<template>
  <t-watch
    :resource="{ type: TaskStatusType, namespace: upgradeID }"
    theila
    :context="getContext()"
    :recordsNotificationStatus="false"
    :isSpinnerActive="false"
  >
    <template #default="items">
      <t-overview-content
        :nodesItems="nodesItems"
        :clustersItems="clustersItems"
        :podsItems="podsItems"
        :currVersion="currVersion"
        :upgradesList="items.items"
      />
    </template>
  </t-watch>
</template>

<script lang="ts">
import Watch from "@/api/watch";
import { kubernetes, TaskStatusType } from "@/api/resources";
import { context as ctx, getContext } from "@/context";
import TOverviewContent from "./components/TOverviewContent.vue";
import { ref } from "@vue/reactivity";
import { ManagementService } from "@/api/grpc";
import { onMounted } from "@vue/runtime-core";
import TWatch from "@/components/common/Watch/TWatch.vue";
import { getUpgradeID } from "@/methods";

export default {
  components: {
    TOverviewContent,
    TWatch,
  },
  setup(props, context) {
    const contextData = getContext();
    const currVersion = ref("");
    const upgradeID = ref("");

    const resourceNodesWatch = new Watch(ctx.api, ref([]));
    resourceNodesWatch.setup(
      {
        kubernetes: true,
        resource: { type: kubernetes.node },
        context: contextData,
      },
      context
    );
    const resourcePodsWatch = new Watch(ctx.api, ref([]));
    resourcePodsWatch.setup(
      {
        kubernetes: true,
        resource: { type: kubernetes.pod },
        context: contextData,
      },
      context
    );
    const resourceClusterWatch = new Watch(ctx.api, ref([]));
    resourceClusterWatch.setup(
      {
        kubernetes: true,
        resource: { type: kubernetes.cluster },
        context: (getContext().cluster = undefined),
      },
      context
    );

    onMounted(async () => {
      try {
        const upgradeInfo = await ManagementService.UpgradeInfo(
          {},
          {
            context: contextData,
          }
        );

        currVersion.value = upgradeInfo["fromVersion"] || "unknown";
      } catch (e: any) {
        console.log("Error:" + e);
      }
    });
    onMounted(async () => {
      upgradeID.value = await getUpgradeID();
    });

    return {
      getContext,
      kubernetes,
      nodesItems: resourceNodesWatch.items,
      clustersItems: resourceClusterWatch.items,
      podsItems: resourcePodsWatch.items,
      currVersion,
      TaskStatusType,
      upgradeID,
    };
  },
};
</script>
