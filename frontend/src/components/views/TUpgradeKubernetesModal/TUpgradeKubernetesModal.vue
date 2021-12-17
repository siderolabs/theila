<template>
  <t-animation>
    <div class="modal__overlay">
      <div class="modal__wrapper" />
      <div class="modal">
        <div class="modal__heading">
          <h3 class="modal__name">Upgrade Kubernetes</h3>
          <t-icon
            class="modal__exit"
            icon="close"
            @click="$emit('onPressExitButton')"
          />
        </div>
        <p class="modal__subtitle">
          Please select the version to which you would like to upgrade cluster:
          <span class="modal__subtitle--light">{{ clusterName }}</span>
        </p>
        <t-upgrade-kubernetes-select-list @checkedValue="changeSelectedValue" />
        <div class="modal__buttons-box">
          <t-button
            @click="$emit('onPressCancelButton')"
            class="modal__button"
            type="secondary"
            >Cancel</t-button
          >
          <t-button
            @click="$emit('onPressUpgradeButton')"
            class="modal__button"
            :disabled="selectListValue.currentVersion"
            >Upgrade Now</t-button
          >
        </div>
      </div>
    </div>
  </t-animation>
</template>

<script lang="ts">
import TButton from "@/components/common/Button/TButton.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TUpgradeKubernetesSelectList from "./TUpgradeKubernetesSelectList.vue";
import { ref } from "@vue/reactivity";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
export default {
  components: { TButton, TIcon, TUpgradeKubernetesSelectList, TAnimation },
  props: {
    clusterName: String,
  },
  setup() {
    const selectListValue = ref({ currentVersion: true });
    const changeSelectedValue = (data) => {
      selectListValue.value = data;
    };
    //Remove mock data below after API connection
    const mockData = [
      { version: "1.22.0-alpha.1" },
      { version: "1.22.0.2", currentVersion: true },
      { version: "1.22.0-alpha.3" },
      { version: "1.22.0-alpha.0" },
    ];
    return {
      selectListValue,
      changeSelectedValue,
      mockData,
    };
  },
};
</script>

<style scoped>
.modal__overlay {
  @apply w-full h-screen fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-50;
}
.modal__wrapper {
  @apply bg-naturals-N0 opacity-70 w-full h-screen absolute top-0 bottom-0 right-0 left-0 z-10;
}
.modal {
  @apply rounded bg-naturals-N2 p-8 z-20;
  width: 390px;
}
.modal__heading {
  @apply flex justify-between items-center;
  margin-bottom: 13px;
}
.modal__name {
  @apply text-base text-naturals-N14;
}
.modal__subtitle {
  @apply text-xs text-naturals-N9;
  margin-bottom: 19px;
}
.modal__subtitle--light {
  @apply text-xs text-naturals-N13;
}
.modal__exit {
  @apply fill-current text-naturals-N7 cursor-pointer transition-colors hover:text-naturals-N8 w-6 h-6;
}
.modal__buttons-box {
  @apply flex justify-end w-full;
}
.modal__button:nth-child(1) {
  @apply mr-4;
}
</style>
