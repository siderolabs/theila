<template>
  <div class="overview__right-box">
    <div class="overview__right-box-wrapper">
      <h3 class="overview__details-title">Cluster Details</h3>
      <t-overview-right-panel-item name="Nodes" value="5" />
      <t-overview-right-panel-item name="Created" value="2020-08-08 21:41:19" />
      <t-overview-right-panel-item name="Status">
        <t-status
          iconType="check-in-circle-classic"
          color="#69C297"
          title="Healthy"
        />
      </t-overview-right-panel-item>
      <t-overview-right-panel-item name="Host" value="host.cluster.153">
        <t-icon class="overview__item-icon" icon="external-link" />
      </t-overview-right-panel-item>
    </div>
    <div class="divider" />
    <div class="overview__right-box-wrapper overview__right-box-wrapper--moved">
      <h3 class="overview__details-title">Kubernetes</h3>
      <t-overview-right-panel-item name="Version" value="v1.14.3" />
      <t-overview-right-panel-item name="Updated" value="2020-08-08 21:41:19" />
      <div class="overview__deatils-item">
        <t-button
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
    <div class="overview__right-box-wrapper overview__right-box-wrapper--moved">
      <div class="overview__deatils-item">
        <t-button
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
          class="overview__item-button"
          type="primary"
          fluid
          icon="key"
          iconPosition="left"
          >Download Talos Config</t-button
        >
      </div>
    </div>
    <div class="divider" />
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
    </div>
  </div>
</template>

<script>
import TStatus from "@/components/common/Status/TStatus.vue";
import TButton from "@/components/common/Button/TButton.vue";
import TOverviewRightPanelItem from "./TOverviewRightPanelItem.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
export default {
  components: { TStatus, TButton, TOverviewRightPanelItem, TIcon },
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
  margin-top: 63px;
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
}
.overview__item-button--red {
  @apply text-red-R1;
}
.overview__deatils-item {
  @apply w-full flex justify-between items-center;
  margin-bottom: 19px;
}
</style>
