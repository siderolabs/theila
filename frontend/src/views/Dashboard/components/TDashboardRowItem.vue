<template>
  <div class="item">
    <div class="box__left">
      <div>
        <t-checkbox
          class="box__checkbox"
          :checked="isHostChecked"
          @click="isHostChecked = !isHostChecked"
        />
      </div>
      <div class="box__name-box">
        <p class="box__name">{{ name }}</p>
      </div>
    </div>
    <div class="box__count">{{ count }}</div>
    <div class="box__version">{{ version }}</div>
    <div class="box__created">
      <span class="box__created--text">{{ date }}</span>
      <t-actions-box>
        <div class="box__action-list">
          <li class="box__actions-item">
            <t-icon class="box__actions-item-icon" icon="kube-config" />
            <span class="box__actions-item-text">Download Kubeconfig</span>
          </li>
          <li class="box__actions-item">
            <t-icon class="box__actions-item-icon" icon="key" />
            <span class="box__actions-item-text">Download Talos Config</span>
          </li>
          <li class="box__actions-item">
            <t-icon class="box__actions-item-icon" icon="upload" />
            <span class="box__actions-item-text">Upgrade Kubernetes</span>
          </li>
        </div>
      </t-actions-box>
    </div>
  </div>
</template>

<script lang="ts">
import TCheckbox from "@/components/common/Checkbox/TCheckbox.vue";
import { ref } from "@vue/reactivity";
import TIcon from "@/components/common/Icon/TIcon.vue";
import vClickOutside from "click-outside-vue3";
import TActionsBox from "@/components/common/ActionsBox/TActionsBox.vue";

export default {
  components: { TCheckbox, TIcon, TActionsBox },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    name: String,
    count: Number,
    version: String,
    date: String,
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
.item {
  @apply w-full flex justify-start items-center;
  padding: 22px 32px 22px 45px;
}
.item:not(:last-of-type) {
  @apply border-b border-naturals-N5;
}
.box__left {
  @apply flex items-center;
  flex-basis: 39.1%;
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
  @apply text-xs text-naturals-N12;
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
  flex-basis: 23.5%;
}
.box__created {
  @apply text-xs text-naturals-N12 flex items-center justify-end;
  flex-basis: 22.4%;
}
.box__created--text {
  @apply mr-10;
  padding-right: 17px;
}
.box__actions-item {
  @apply flex items-center cursor-pointer w-full;
}
.box__actions-item {
  padding: 9px 14px;
}

.box__actions-item-icon {
  @apply w-4 h-4 fill-current text-naturals-N9 transition-colors;
  margin-right: 6px;
}
.box__actions-item-text {
  @apply text-xs text-naturals-N9 transition-colors;
}
.box__actions-item:hover .box__actions-item-icon {
  @apply text-naturals-N12;
}
.box__actions-item:hover .box__actions-item-text {
  @apply text-naturals-N12;
}
.box__action-list {
  @apply bg-naturals-N3 rounded border border-naturals-N4 flex justify-center flex-col items-start z-10;
  padding: 12px 0px;
  min-width: 180px;
}
</style>
