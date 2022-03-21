<template>
  <div>
    <div class="overview__modal-wrapper mb-2">
      <t-modal />
    </div>
    <div class="overview__title-box">
      <h2 class="overview__title">{{ overviewName }}</h2>
      <!-- Todo: in progress -->
      <!-- <t-icon class="overview__icon" icon="edit" /> -->
    </div>
    <div v-if="!isNoConnection && !isFailedAuth" class="overview">
      <div class="overview__container">
        <div class="overview__charts-box">
          <t-overview-circle-chart-item
            :chartFillProcentage="CPUUsageProcentage"
            name="CPU"
            :usageName="CPUUsageCurrent + ' Used'"
            :usageProcents="CPUUsageProcentage"
            :usageTotal="CPUUsageTotal"
          />
          <t-overview-circle-chart-item
            :chartFillProcentage="+podsUsageProcentage"
            name="Pods"
            :usageName="usedPodsNumber() + ' Used'"
            :usageProcents="podsUsageProcentage"
            :usageTotal="maxClusterPodsNumber()"
          />
          <t-overview-circle-chart-item
            :chartFillProcentage="memoryUsageProcentage"
            name="Memory"
            :usageName="memoryUsageCurrent + ' Used'"
            :usageProcents="memoryUsageProcentage"
            :usageTotal="memoryUsageTotal"
          />
          <t-overview-circle-chart-item
            :chartFillProcentage="storageUsageProcentage"
            name="Storage"
            :usageName="storageUsageCurrent + ' Used'"
            :usageProcents="storageUsageProcentage"
            :usageTotal="storageUsageTotal"
          />
        </div>
        <div class="overview__usage-list">
          <div class="overview__box-header">
            <span class="overview__box-title">Node Usage</span>
            <!-- Todo: -->
            <!-- <span class="overview__usage-subtitle">Top 5</span> -->
          </div>
          <t-overview-nodes-usage
            v-for="(node, index) in nodes"
            :key="node?.metadata?.name"
            :index="index"
            :item="node"
            talos
            :resource="{
              type: talos.cpu,
              namespace: talos.perfNamespace,
              tail_events: 25,
            }"
            :context="context"
            @cpu="(data) => getDataFromNode(data)"
          />
        </div>
        <!-- Todo: in progress -->
        <!-- <div class="overview__status-box">
          <div class="overview__box-header">
            <span class="overview__box-title">CAPI cluster status</span>
          </div>
          <t-overview-cluster-status-box
            v-for="(box, idx) in mockNodesStatusData"
            :key="idx"
            :data="box.clusterData"
            :title="box.clusterName"
          />
        </div> -->
      </div>
      <t-overview-right-panel
        :nodesItems="nodesItems"
        :clustersItems="clustersItems"
        :currVersion="currVersion"
        :upgradesList="upgradesList"
      />
    </div>
    <t-overview-error-view
      v-if="isNoConnection"
      title="We cannot get information about the “talos-GCP-US-oprkf”"
      subtitle="There is no connection to this cluster"
      iconName="no-connection"
    />
    <t-overview-error-view
      v-if="isFailedAuth"
      title="We cannot get information about the “talos-GCP-US-oprkf”"
      subtitle="Authentication failed"
      iconName="fail-auth"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";
// import TIcon from "@/components/common/Icon/TIcon.vue";
// import TOverviewClusterStatusBox from "./components/TOverviewClusterStatusBox/TOverviewClusterStatusBox.vue";
import TOverviewNodesUsage from "../components/TOverviewNodesUsage.vue";
import TOverviewRightPanel from "../components/TOverviewRightPanel/TOverviewRightPanel.vue";
import TOverviewErrorView from "../components/TOverviewErrorView.vue";
import TModal from "@/components/TModal.vue";
import { getContext } from "@/context";
import { useRouter } from "vue-router";
import TOverviewCircleChartItem from "./TOverviewCircleChart/TOverviewCircleChartItem.vue";
import { cpuParser, formatBytes, memoryParser } from "@/methods";
import { talos } from "@/api/resources";

export default {
  components: {
    // TIcon,
    TOverviewNodesUsage,
    TOverviewRightPanel,
    // TOverviewClusterStatusBox,
    TOverviewErrorView,
    TModal,
    TOverviewCircleChartItem,
  },
  props: {
    nodesItems: Object,
    clustersItems: Object,
    currVersion: String,
    upgradesList: Object,
    podsItems: Object,
  },
  setup(props) {
    const isNoConnection = ref(false);
    const isFailedAuth = ref(false);
    const context = getContext();
    const router = useRouter();
    const { nodesItems, podsItems } = toRefs(props);
    // Remove mock data below after API connection
    const mockNodesStatusData = [
      {
        clusterName: "ClusterInfrastructure - AWSCluster/cluster-2 ",
        clusterData: [
          {
            title: "ClusterSecurityGroupsReady",
            subtitle: "12d",
            status: false,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
            ],
          },
          {
            title: "LoadBalancerReady",
            subtitle: "12d",
            status: true,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
            ],
          },
        ],
      },
      {
        clusterName: "ControlPlane - TalosControlPlane/cluster-2-controlplane",
        clusterData: [
          {
            title: "ClusterSecurityGroupsReady",
            subtitle: "12d",
            status: true,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
            ],
          },
          {
            title: "LoadBalancerReady",
            subtitle: "12d",
            status: true,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
            ],
          },
        ],
      },
      {
        clusterName: "Machine/cluster-2-controlplane-2zh8z",
        clusterData: [
          {
            title: "ClusterSecurityGroupsReady",
            subtitle: "12d",
            status: true,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
            ],
          },
          {
            title: "LoadBalancerReady",
            subtitle: "12d",
            status: true,
            logs: [
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: true,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
              {
                date: "12/01/2021",
                time: "17:00:12",
                info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
                isError: false,
              },
            ],
          },
        ],
      },
    ];
    const formatNodes = (nodes) => {
      return nodes.slice(0, 5);
    };
    const sortNodes = (nodes) => {
      return nodes.sort((a, b) => {
        return b.cpu - a.cpu;
      });
    };
    const getDataFromNode = (data) => {
      nodesItems.value![data.index].cpu = +data.cpu;
    };

    const usedPodsNumber = () => {
      return podsItems.value!.reduce((acum, reducer) => {
        return (acum += +reducer.spec.containers.length > 0 ? 1 : 0);
      }, 0);
    };
    const maxClusterPodsNumber = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += +reducer?.status?.capacity?.pods);
      }, 0);
    };
    const clusterNodesCapacityMemory = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += memoryParser(reducer?.status?.capacity?.memory));
      }, 0);
    };
    const clusterNodesAllocatableMemory = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += memoryParser(reducer?.status?.allocatable?.memory));
      }, 0);
    };
    const clusterNodesCapacityStorage = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += memoryParser(
          reducer?.status?.capacity?.["ephemeral-storage"]
        ));
      }, 0);
    };
    const clusterNodesAllocatableStorage = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += memoryParser(
          reducer?.status?.allocatable?.["ephemeral-storage"]
        ));
      }, 0);
    };
    const clusterNodesCapacityCPU = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += cpuParser(reducer?.status?.capacity?.cpu));
      }, 0);
    };
    const clusterNodesAllocatableCPU = () => {
      return nodesItems.value!.reduce((acum, reducer) => {
        return (acum += cpuParser(reducer?.status?.allocatable?.cpu));
      }, 0);
    };

    return {
      mockNodesStatusData,
      isNoConnection,
      isFailedAuth,
      context,
      router,
      talos,
      formatNodes,
      getDataFromNode,
      sortNodes,
      formatBytes,
      maxClusterPodsNumber,
      overviewName: computed(() => {
        return router.currentRoute.value.query.cluster
          ? router.currentRoute.value.query.cluster
          : context.name;
      }),
      nodes: computed(() => {
        return sortNodes(nodesItems.value);
      }),
      usedPodsNumber,
      podsUsageProcentage: computed(() =>
        ((usedPodsNumber() * 100) / maxClusterPodsNumber()).toFixed(1)
      ),
      memoryUsageProcentage: computed(() =>
        (
          100 - (clusterNodesAllocatableMemory() * 100) /
          clusterNodesCapacityMemory()
        ).toFixed(1)
      ),
      memoryUsageTotal: computed(() =>
        formatBytes(clusterNodesCapacityMemory())
      ),
      memoryUsageCurrent: computed(() =>
        formatBytes(clusterNodesCapacityMemory() - clusterNodesAllocatableMemory())
      ),
      storageUsageProcentage: computed(() =>
        (
          100 - (clusterNodesAllocatableStorage() * 100) /
          clusterNodesCapacityStorage()
        ).toFixed(1)
      ),
      storageUsageTotal: computed(() =>
        formatBytes(clusterNodesCapacityStorage())
      ),
      storageUsageCurrent: computed(() =>
        formatBytes(clusterNodesCapacityStorage() - clusterNodesAllocatableStorage())
      ),
      CPUUsageProcentage: computed(() =>
        (
          100 - (clusterNodesAllocatableCPU() * 100) /
          clusterNodesCapacityCPU()
        ).toFixed(1)
      ),
      CPUUsageTotal: computed(() => clusterNodesCapacityCPU()),
      CPUUsageCurrent: computed(() => (clusterNodesCapacityCPU() - clusterNodesAllocatableCPU()).toFixed(2)),
    };
  },
};
</script>

<style scoped>
.divider {
  @apply w-full bg-naturals-N4;
  height: 1px;
}
.overview {
  @apply w-full flex justify-start items-start;
}
.overview__container {
  @apply w-full mr-6;
  max-width: 80%;
}
@media screen and (max-width: 1050px) {
  .overview__container {
    @apply w-full  mr-2;
  }
}
.overview__title-box {
  @apply flex items-center;
  margin-bottom: 35px;
}
.overview__title {
  @apply text-xl text-naturals-N14 mr-2;
}
.overview__icon {
  @apply fill-current text-naturals-N14 w-5 h-5 cursor-pointer;
}
.overview__usage-list {
  @apply flex-col py-5 bg-naturals-N2 pb-0 rounded lg:mb-6 mb-2;
  max-height: 336px;
  overflow: auto;
}
.overview__box-header {
  @apply flex px-2 mb-4 lg:px-6;
}
.overview__box-title {
  @apply text-xs text-naturals-N13;
  margin-right: 6px;
}
.overview__usage-subtitle {
  @apply text-xs text-naturals-N10;
}
.overview__status-box {
  @apply w-full bg-naturals-N2 py-5 rounded flex-col pb-0;
}
.overview__charts-box {
  @apply flex justify-around xl:justify-between items-start flex-wrap p-5 bg-naturals-N2 mb-6;
}
</style>
