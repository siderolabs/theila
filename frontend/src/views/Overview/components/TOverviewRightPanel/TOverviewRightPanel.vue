<template>
  <div class="overview__right-box">
    <div class="overview__right-box-wrapper">
      <h3 class="overview__details-title">Cluster Details</h3>
      <t-overview-right-panel-item
        name="Nodes"
        :value="String(nodesItems?.length)"
      />
      <t-overview-right-panel-item
        v-if="currentCluster?.metadata?.creationTimestamp"
        name="Created"
        :value="currentCluster?.metadata?.creationTimestamp"
      />
      <t-overview-right-panel-item name="Status">
        <t-status :title="clusterStatus" />
      </t-overview-right-panel-item>
      <t-overview-right-panel-item
        v-if="currentCluster?.spec?.controlPlaneEndpoint?.host"
        name="Host"
        :value="currentCluster?.spec?.controlPlaneEndpoint?.host"
      >
        <t-icon class="overview__item-icon" icon="external-link" />
      </t-overview-right-panel-item>
    </div>
    <div class="divider" />
    <div class="overview__right-box-wrapper overview__right-box-wrapper--moved">
      <h3 class="overview__details-title">Kubernetes</h3>
      <t-overview-right-panel-item
        v-if="currVersion"
        name="Version"
        :value="currVersion"
      />
      <t-overview-right-panel-item
        v-if="lastUpgrade?.metadata?.updated"
        name="Updated"
        :value="String(lastUpgrade?.metadata?.updated)"
      />
      <div class="overview__deatils-item">
        <t-button
          @click="openUpgrade"
          class="overview__item-button"
          type="secondary"
          fluid
          icon="upload"
          iconPosition="left"
          >Upgrade</t-button
        >
      </div>
    </div>
    <div class="divider" />
    <div
      v-if="currentCluster"
      class="overview__right-box-wrapper overview__right-box-wrapper--moved"
    >
      <div class="overview__deatils-item">
        <t-button
          @click="downloadKubeconfig"
          class="overview__item-button"
          type="primary"
          fluid
          icon="cube-config"
          iconPosition="left"
          >Download Kubeconfig</t-button
        >
      </div>
      <div class="overview__deatils-item">
        <t-button
          @click="downloadTalosConfig"
          class="overview__item-button"
          type="primary"
          fluid
          icon="key"
          iconPosition="left"
          >Download Talos Config</t-button
        >
      </div>
    </div>
    <!-- <div class="divider" />
    <div class="overview__right-box-wrapper overview__right-box-wrapper--moved">
      <div class="overview__deatils-item">
        <t-button
          class="overview__item-button--red"
          type="secondary"
          fluid
          icon="delete"
          iconPosition="left"
          >Delete Cluster</t-button
        >
      </div>
    </div> -->
  </div>
</template>

<script>
import TStatus from "@/components/common/Status/TStatus.vue";
import TButton from "@/components/common/Button/TButton.vue";
import TOverviewRightPanelItem from "./TOverviewRightPanelItem.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { modal, showError } from "@/modal";
import { useRoute, useRouter } from "vue-router";
import { computed, toRefs } from "@vue/reactivity";
import { ResourceService } from "@/api/grpc";
import { Runtime } from "@/api/common/theila.pb";
export default {
  components: { TStatus, TButton, TOverviewRightPanelItem, TIcon },
  props: {
    nodesItems: Object,
    clustersItems: Object,
    currVersion: String,
    upgradesList: Object,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const { clustersItems, upgradesList, nodesItems } = toRefs(props);
    const link = document.createElement("a");

    const openUpgrade = () => {
      modal.value = null;
      router.push(
        router.currentRoute.value.query.cluster
          ? {
              query: {
                cluster: route.query.cluster,
                namespace: route.query.namespace,
                uid: route.query.uid,
                modal: "upgrade",
              },
            }
          : { query: { modal: "upgrade" } }
      );
    };

    const currentCluster = computed(() => {
      return clustersItems.value.find((elem) => {
        return elem?.metadata?.name == router?.currentRoute.value.query.cluster;
      });
    });

    const downloadTalosConfig = async () => {
      try {
        const response = await ResourceService.GetConfig(
          {
            name: currentCluster.value?.metadata?.name,
            uid: currentCluster.value?.metadata?.uid,
            namespace: currentCluster.value?.metadata?.namespace,
          },
          {
            runtime: Runtime.Talos,
          }
        );

        link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(
          response
        )}`;
        link.download = `${currentCluster.value?.metadata?.name}-talosconfig.yaml`;
        link.click();
      } catch (e) {
        showError("Failed to download Talos config", e.toString());
      }
    };

    const downloadKubeconfig = async () => {
      try {
        const response = await ResourceService.GetConfig(
          {
            name: currentCluster.value?.metadata?.name,
            uid: currentCluster.value?.metadata?.uid,
            namespace: currentCluster.value?.metadata?.namespace,
          },
          {
            runtime: Runtime.Kubernetes,
          }
        );

        link.href = `data:application/octet-stream;charset=utf-16le;base64,${btoa(
          response
        )}`;
        link.download = `${currentCluster.value?.metadata?.name}-kubeconfig.yaml`;
        link.click();
      } catch (e) {
        showError("Failed to download Kubeconfig", e.toString());
      }
    };
    return {
      openUpgrade,
      currentCluster,
      downloadTalosConfig,
      downloadKubeconfig,
      lastUpgrade: computed(() => {
        return upgradesList.value?.at(-1);
      }),
      clusterStatus: computed(() => {
        let status = "Health Unknown";
        if (currentCluster.value?.status?.phase === "Provisioned")
          status = "Healthy";
        nodesItems.value?.forEach((item) => {
          if (item?.status?.conditions?.at(-1).status == "True")
            status = "Healthy";
        });
        return status;
      }),
    };
  },
};
</script>

<style scoped>
.divider {
  @apply w-full bg-naturals-N4;
  height: 1px;
}
.overview__right-box {
  @apply py-5 bg-naturals-N2 w-full h-auto rounded pb-0;
  max-width: 20%;
  min-width: 270px;
}
@media screen and (max-width: 1024px) {
  .overview__right-box {
    max-width: 20%;
    min-width: 215px;
  }
}
.overview__right-box-wrapper {
  @apply flex-col lg:px-6 px-2;
}
.overview__right-box-wrapper--moved {
  @apply pt-5;
}
.overview__details-title {
  @apply text-xs text-naturals-N13 mb-5;
}

.overview__item-icon {
  @apply w-4 h-4 fill-current text-naturals-N13;
  min-width: 16px;
}
.overview__item-button--red {
  @apply text-red-R1;
}
.overview__deatils-item {
  @apply w-full flex justify-between items-center;
  margin-bottom: 19px;
}
</style>
