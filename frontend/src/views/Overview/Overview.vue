<template>
  <div v-if="!isNoConnection && !isFailedAuth" class="overview">
    <div class="overview__container">
      <div class="overview__title-box">
        <h2 class="overview__title">talos-GCP-US-oprkf</h2>
        <t-icon class="overview__icon" icon="edit" />
      </div>
      <div class="overview__usage-list">
        <div class="overview__box-header">
          <span class="overview__box-title">Node Usage</span>
          <span class="overview__usage-subtitle">Top 5</span>
        </div>
        <t-overview-nodes-usage
          v-for="(data, index) in mockNodesUsageData"
          :key="index"
          :title="data.title"
          :id="data.id"
          :amount="data.amount"
        />
      </div>
      <div class="overview__status-box">
        <div class="overview__box-header">
          <span class="overview__box-title">CAPI cluster status</span>
        </div>
        <t-overview-cluster-status-box
          v-for="(box, idx) in mockNodesStatusData"
          :key="idx"
          :data="box.clusterData"
          :title="box.clusterName"
        />
      </div>
    </div>
    <t-overview-right-panel />
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
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TOverviewClusterStatusBox from "./components/TOverviewClusterStatusBox/TOverviewClusterStatusBox.vue";
import TOverviewNodesUsage from "./components/TOverviewNodesUsage.vue";
import TOverviewRightPanel from "./components/TOverviewRightPanel/TOverviewRightPanel.vue";
import TOverviewErrorView from "./components/TOverviewErrorView.vue";
export default {
  components: {
    TIcon,
    TOverviewNodesUsage,
    TOverviewRightPanel,
    TOverviewClusterStatusBox,
    TOverviewErrorView,
  },
  setup() {
    const isNoConnection = ref(false);
    const isFailedAuth = ref(false);

    // Remove mock data below after API connection
    const mockNodesUsageData = [
      {
        title: "ip-10-0-5-151.us-e.name-of-node",
        id: "10.128.0.44",
        amount: 5,
      },
      {
        title: "ip-10-0-5-151.us-e.name-of-node",
        id: "10.128.0.44",
        amount: 5,
      },
      {
        title: "ip-10-0-5-151.us-e.name-of-node",
        id: "10.128.0.44",
        amount: 5,
      },
      {
        title: "ip-10-0-5-151.us-e.name-of-node",
        id: "10.128.0.44",
        amount: 5,
      },
      {
        title: "ip-10-0-5-151.us-e.name-of-node",
        id: "10.128.0.44",
        amount: 5,
      },
    ];
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

    return {
      mockNodesUsageData,
      mockNodesStatusData,
      isNoConnection,
      isFailedAuth,
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
  @apply flex-col py-5 bg-naturals-N2 pb-0 rounded mb-6;
}
.overview__box-header {
  @apply flex px-6 mb-4;
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
</style>
