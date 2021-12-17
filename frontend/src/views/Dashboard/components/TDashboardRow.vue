<template>
  <div class="box">
    <t-slide-down-wrapper :maxHeight="500" :isSliderOpened="isDropdownOpened">
      <template v-slot:head>
        <div
          class="box__wrapper"
          :class="{ 'box__wrapper--rounded': !isDropdownOpened }"
        >
          <div class="box__left">
            <t-icon
              @click="() => (isDropdownOpened = !isDropdownOpened)"
              class="box__arrow"
              :class="{ 'box__arrow-right--pushed': isDropdownOpened }"
              icon="drop-up"
            />
            <div>
              <t-checkbox
                class="box__checkbox"
                :checked="isHostChecked"
                @click="isHostChecked = !isHostChecked"
              />
            </div>
            <div class="box__name-box">
              <p class="box__name">Host</p>
              <t-info-label
                label="AWS v0.7.0"
                info="This cluster can manage AWS based clusters"
              />
            </div>
          </div>
          <div class="box__count">1</div>
          <div class="box__version">v1.17.9</div>
          <div class="box__created">
            <span class="box__created--text">2020-08-08 21:41:19</span>
            <div class="box__actions" ref="settingsButton">
              <t-actions-box>
                <ul class="box__actions-list">
                  <li class="box-actions-item">
                    <t-icon class="box__actions-item-icon" icon="kube-config" />
                    <span class="box__actions-item-text"
                      >Download Kubeconfig</span
                    >
                  </li>
                  <li class="box-actions-item">
                    <t-icon class="box__actions-item-icon" icon="key" />
                    <span class="box__actions-item-text"
                      >Download Talos Config</span
                    >
                  </li>
                  <li class="box-actions-item" @click="openUpgradeModal">
                    <t-icon class="box__actions-item-icon" icon="upload" />
                    <span class="box__actions-item-text"
                      >Upgrade Kubernetes</span
                    >
                  </li>
                </ul>
              </t-actions-box>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <div class="box__logs">
          <div v-if="isClusterAPIInstalled">
            <t-dashboard-row-item
              name="talos-GCP-US-oprkf"
              :count="1"
              version="v1.17.9"
              date="2020-08-08 21:41:19"
            />
            <t-dashboard-row-item
              name="talos-GCP-US-oprkf"
              :count="1"
              version="v1.17.9"
              date="2020-08-08 21:41:19"
            />
          </div>
          <div v-else class="box__notification">
            <t-icon icon="clusters-big" class="box__cluster-icon" />
            <p class="box__notification-name">
              You don't have ClusterAPI installed
            </p>
            <t-button @click="openInstallModal" class="box__notification-button"
              >Install</t-button
            >
          </div>
        </div>
      </template>
    </t-slide-down-wrapper>
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import { ref } from "@vue/reactivity";
import TCheckbox from "@/components/common/Checkbox/TCheckbox.vue";
import TInfoLabel from "@/components/common/InfoLabel/TInfoLabel.vue";
import vClickOutside from "click-outside-vue3";
import TDashboardRowItem from "./TDashboardRowItem.vue";
import TButton from "@/components/common/Button/TButton.vue";
import TSlideDownWrapper from "@/components/common/SlideDownWrapper/TSlideDownWrapper.vue";
import TActionsBox from "@/components/common/ActionsBox/TActionsBox.vue";
export default {
  components: {
    TIcon,
    TCheckbox,
    TInfoLabel,
    TDashboardRowItem,
    TButton,
    TSlideDownWrapper,
    TActionsBox,
  },
  props: {
    isClusterAPIInstalled: {
      type: Boolean,
      default: false,
    },
    openInstallModal: Function,
    openUpgradeModal: Function,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  setup() {
    const isHostChecked = ref(false);
    const isDropdownOpened = ref(false);
    const isActionsDropdownOpened = ref(false);
    const settingsButton = ref(null);
    const clickOutsideHandler = (e) => {
      if (
        e.target.parentElement !== settingsButton.value &&
        e.target !== settingsButton.value
      ) {
        isActionsDropdownOpened.value = false;
      }
    };
    return {
      isDropdownOpened,
      isActionsDropdownOpened,
      isHostChecked,
      clickOutsideHandler,
      settingsButton,
    };
  },
};
</script>

<style scoped>
.box {
  @apply w-full flex-col border border-naturals-N5 rounded z-0;
}
.box__wrapper {
  @apply w-full flex bg-naturals-N1 rounded justify-start items-center relative;
  padding: 20px 32px 20px 11px;
  border-radius: 4px 4px 0 0;
}
.box__left {
  @apply flex items-center;
  flex-basis: 40%;
}
.box__wrapper--rounded {
  border-radius: 4px;
}
.box__arrow {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer mr-1;
  transform: rotate(-180deg);
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.box__arrow-right--pushed {
  transform: rotate(0deg);
}
.box__name {
  @apply text-xs text-naturals-N12 mb-3;
}
.box__checkbox {
  @apply mr-6;
}
.box__count {
  @apply text-xs text-naturals-N12 text-right;
  flex-basis: 13.5%;
}
.box__version {
  @apply text-xs text-naturals-N12 text-center md:text-right pr-2;
  flex-basis: 23%;
}
.box__created {
  @apply text-xs text-naturals-N12 flex items-center justify-end;
  flex-basis: 22.4%;
}
.box__created--text {
  @apply mr-10;
}
.box__actions-icon {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer;
  width: 24px;
  height: 24px;
}
.box__actions {
  @apply relative;
  flex-basis: 24px;
}
.box__actions-list {
  @apply bg-naturals-N3 rounded border border-naturals-N4 flex justify-center flex-col items-start z-10;
  padding: 12px 0px;
  min-width: 180px;
}
.box-actions-item {
  @apply flex items-center cursor-pointer w-full;
  padding: 9px 14px;
}
.box__actions-item-icon {
  @apply w-4 h-4 fill-current text-naturals-N9 transition-colors;
  margin-right: 6px;
}
.box__actions-item-text {
  @apply text-xs text-naturals-N9 transition-colors;
}
.box-actions-item:hover .box__actions-item-icon {
  @apply text-naturals-N12;
}
.box-actions-item:hover .box__actions-item-text {
  @apply text-naturals-N12;
}
.box__notification {
  @apply w-full flex flex-col items-center justify-center;
  min-height: 240px;
}
.box__cluster-icon {
  margin-bottom: 27px;
}
.box__notification-name {
  @apply text-xs text-naturals-N10;
  margin-bottom: 29px;
}
.box__logs {
  @apply overflow-visible;
}
</style>
