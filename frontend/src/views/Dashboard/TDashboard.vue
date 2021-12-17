<template>
  <div class="board">
    <div class="board__input">
      <t-input type="secondary" placeholder="Search cluster by name..." />
    </div>
    <ul class="board__heading">
      <li class="board__heading-item">Name</li>
      <li class="board__heading-item">Node Count</li>
      <li class="board__heading-item">Kubernetes Version</li>
      <li class="board__heading-item">Created</li>
    </ul>
    <t-dashboard-row
      class="board__row"
      :openInstallModal="openInstallModal"
      :openUpgradeModal="openUpgradeModal"
    />
    <t-dashboard-row
      :openUpgradeModal="openUpgradeModal"
      :openInstallModal="openInstallModal"
      class="board__row"
      isClusterAPIInstalled
    />
    <t-dashboard-row
      class="board__row"
      :openInstallModal="openInstallModal"
      :openUpgradeModal="openUpgradeModal"
    />
    <t-dashboard-install-modal
      :isModalOpen="isInstallModalOpen"
      @onPressExitButton="() => (isInstallModalOpen = false)"
      @onPressCancelButton="() => (isInstallModalOpen = false)"
      @onPressContinueButton="onPressContinueButton"
    />
    <t-upgrade-kubernetes-modal
      @onPressExitButton="() => (isUpgradeModalOpen = false)"
      @onPressCancelButton="() => (isUpgradeModalOpen = false)"
      v-show="isUpgradeModalOpen"
      clusterName="talos-GCP-US-oprkf"
    />
    <t-dashboard-bottom-menu :amountChecked="2" />
  </div>
</template>

<script>
import TInput from "@/components/common/TInput/TInput.vue";
import TDashboardRow from "./components/TDashboardRow.vue";
import TDashboardInstallModal from "./components/TDashboardInstallModal.vue";
import { ref } from "@vue/reactivity";
import TDashboardBottomMenu from "./components/TDashboardBottomMenu.vue";
import TUpgradeKubernetesModal from "@/components/views/TUpgradeKubernetesModal/TUpgradeKubernetesModal.vue";
export default {
  components: {
    TInput,
    TDashboardRow,
    TDashboardInstallModal,
    TDashboardBottomMenu,
    TUpgradeKubernetesModal,
  },
  setup() {
    const isInstallModalOpen = ref(false);
    const isUpgradeModalOpen = ref(false);
    const openInstallModal = () => {
      isInstallModalOpen.value = true;
    };
    const onPressContinueButton = (providerValue) => {
      console.log(providerValue);
    };
    const openUpgradeModal = () => {
      isUpgradeModalOpen.value = true;
    };
    return {
      isInstallModalOpen,
      openInstallModal,
      onPressContinueButton,
      isUpgradeModalOpen,
      openUpgradeModal,
    };
  },
};
</script>

<style scoped>
.board__input {
  margin-bottom: 35px;
  width: 200px;
}
.board__heading {
  @apply flex items-center justify-between;
  padding-right: 120px;
}
.board__heading-item {
  @apply text-sm text-naturals-N13 mb-5;
}
.board__heading-item:first-of-type {
  flex-basis: 44%;
}
.board__heading-item:nth-child(2) {
  @apply text-right;
  flex-basis: 20%;
}
.board__heading-item:nth-child(3) {
  @apply text-right;
  flex-basis: 27%;
}
.board__heading-item:nth-child(4) {
  @apply text-right;
  flex-basis: 22%;
}
.board__row:not(:last-of-type) {
  @apply mb-4;
}
</style>
