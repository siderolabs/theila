<template>
  <div class="item" :class="isDropdownOpened && 'item__opened'">
    <div class="item__wrapper">
      <div class="item__icon-wrapper" @click="toggleDropdown">
        <t-icon
          class="item__arrow-right"
          :class="isDropdownOpened && 'item__arrow-right--pushed'"
          icon="drop-right"
        />
      </div>
      <p
        class="item__name"
        :class="isNameChecked && 'item__name--checked'"
        @click="toggleNameCheckStatus"
      >
        {{ name }}
        <t-icon
          class="item__check"
          icon="check"
          :class="isNameChecked && 'item__check--checked'"
        />
      </p>
    </div>
    <t-animation>
      <div v-show="isDropdownOpened" class="item__list">
        <div class="item item__list-item">
          <t-side-bar-cluster-dropdown-sub-item :id="0" name="cluster 2" />
        </div>
      </div>
    </t-animation>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "../../../common/Icon/TIcon.vue";
import TAnimation from "../../../common/Animation/TAnimation.vue";
import TSideBarClusterDropdownSubItem from "./TSideBarClusterDropdownSubItem.vue";
export default {
  components: { TIcon, TAnimation, TSideBarClusterDropdownSubItem },
  props: {
    name: String,
  },
  setup() {
    let isDropdownOpened = ref(false);
    let isNameChecked = ref(false);
    const toggleDropdown = () =>
      (isDropdownOpened.value = !isDropdownOpened.value);
    const toggleNameCheckStatus = () =>
      (isNameChecked.value = !isNameChecked.value);

    return {
      isDropdownOpened,
      toggleDropdown,
      isNameChecked,
      toggleNameCheckStatus,
    };
  },
};
</script>

<style scoped>
.item {
  @apply flex-col border-b border-naturals-N3 transition-all duration-300;
}
.item__opened {
  @apply bg-naturals-N3;
}
.item__wrapper {
  @apply flex items-center py-3 cursor-pointer;
  padding: 7px 6px 7px 6px;
}
.item__arrow-right {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300;
  margin-right: 6px;
  width: 24px;
  height: 24px;
}
.item__arrow-right--pushed {
  transform: rotate(90deg);
}
.item__name {
  @apply relative w-full text-xs text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 flex flex-nowrap items-center;
  padding: 6px 19px 6px 6px;
}
.item__name--checked {
  @apply text-naturals-N14;
}
.item__name:hover .item__check {
  @apply visible;
}
.item__check {
  @apply w-3 h-3 fill-current text-naturals-N9 transition-all absolute;
  right: 10px;
  visibility: hidden;
}
.item__check--checked {
  @apply text-naturals-N14 visible;
}
</style>
