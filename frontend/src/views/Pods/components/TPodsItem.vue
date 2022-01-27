<template>
  <div class="row" :class="{ opened: isDropdownOpened }">
    <t-slide-down-wrapper :maxHeight="150" :isSliderOpened="isDropdownOpened">
      <template v-slot:head
        ><ul class="row__wrapper">
          <li class="row__item">
            <t-icon
              @click="() => (isDropdownOpened = !isDropdownOpened)"
              class="row__arrow"
              :class="{ 'row__arrow-right--pushed': isDropdownOpened }"
              icon="drop-up"
            />
            <span>{{ namespace }}</span>
          </li>
          <li class="row__item">{{ name }}</li>
          <li class="row__item">
            <t-status :title="phase" />
          </li>
          <li class="row__item row__item--spaced">
            <span>{{ nodeName }}</span>
          </li>
        </ul>
      </template>
      <template v-slot:body>
        <div class="row__info-box">
          <div class="row__info-item">
            <p class="row__info-title">Restarts</p>
            <p class="row__info-value">{{ restartCount }}</p>
          </div>
          <div class="row__info-item">
            <p class="row__info-title">Ready Containers</p>
            <p class="row__info-value">{{ readyContainers?.length }}</p>
          </div>
          <div class="row__info-item">
            <p class="row__info-title">Age</p>
            <p class="row__info-value">{{ age }}</p>
          </div>
          <div class="row__info-item">
            <p class="row__info-title">Pod IP</p>
            <p class="row__info-value">{{ podIP }}</p>
          </div>
        </div>
      </template>
    </t-slide-down-wrapper>
    <!-- Todo -->
    <!-- <t-actions-box class="row__action-box">
      <div class="box__actions-list">
        <div class="row__box-actions-item">
          <t-icon class="row__actions-item-icon" icon="log" />
          <span class="row__actions-item-text">View Logs</span>
        </div>
        <div class="row__box-actions-item">
          <t-icon class="row__actions-item-icon" icon="terminal" />
          <span class="row__actions-item-text">Open Terminal</span>
        </div>
        <div class="row__box-actions-item row__box-actions-item--last">
          <t-icon
            class="row__actions-item-icon row__actions-item-icon--delete"
            icon="delete"
          />
          <span class="row__actions-item-text row__actions-item-text--delete"
            >Delete</span
          >
        </div>
      </div>
    </t-actions-box> -->
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import { computed, ref } from "@vue/reactivity";
import TStatus from "@/components/common/Status/TStatus.vue";
// import TActionsBox from "@/components/common/ActionsBox/TActionsBox.vue";
import TSlideDownWrapper from "@/components/common/SlideDownWrapper/TSlideDownWrapper.vue";
export default {
  components: {
    TIcon,
    TStatus,
    // TActionsBox,
    TSlideDownWrapper,
  },
  props: {
    searchOption: String,
    namespace: String,
    name: String,
    nodeName: String,
    phase: String,
    podIP: String,
    age: String,
    containerStatuses: {
      type: Array,
    },
  },
  setup(props) {
    const isDropdownOpened = ref(false);

    const readyContainers = computed(() =>
      props?.containerStatuses?.filter((item: any) => item?.ready === true)
    );
    const restartCount = computed(() =>
      props.containerStatuses?.reduce((amount, reducer: any) => {
        return amount + reducer.restartCount;
      }, 0)
    );
    return {
      isDropdownOpened,
      readyContainers,
      restartCount,
    };
  },
};
</script>

<style scoped>
.row {
  @apply relative w-full border border-transparent  flex flex-col items-center mb-1 transition-all duration-500;
  min-width: 450px;
  padding: 19px 14px 19px 8px;
  border-bottom: 1px solid rgba(39, 41, 50, var(--tw-border-opacity));
  border-radius: 4px 4px 0 0;
}

.row:last-of-type {
  border-bottom: transparent;
}
.opened {
  @apply rounded border-naturals-N5;
}

.opened:last-of-type {
  border-bottom: 1px solid rgba(44, 46, 56, var(--tw-border-opacity));
}
.row__wrapper {
  @apply w-full flex justify-start items-center;
}

.row__item {
  @apply text-xs text-naturals-N13 flex items-center;
}
.row__item:nth-child(1) {
  width: 18.1%;
}
.row__item:nth-child(2) {
  width: 32.1%;
}
.row__item:nth-child(3) {
  width: 16.5%;
}
.row__item:nth-child(4) {
  width: 33%;
}
.row__item--spaced {
  @apply flex justify-between;
}
.row__arrow {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer mr-1;
  transform: rotate(-180deg);
  width: 24px;
  height: 24px;
}
.row__arrow-right--pushed {
  transform: rotate(0deg);
}
.row__action-box {
  @apply absolute right-4;
}
.row__box-actions-item {
  @apply flex items-center cursor-pointer w-full;
  padding: 17px 14px;
}
.row__box-actions-item:first-of-type {
  padding: 17px 14px 6.5px 14px;
}
.row__box-actions-item:last-of-type {
  @apply border-t border-naturals-N4;
}
.row__actions-item-icon {
  @apply w-4 h-4 fill-current text-naturals-N9 transition-colors;
  margin-right: 6px;
}
.row__actions-item-icon--delete {
  @apply text-red-R1;
}
.row__actions-item-text {
  @apply text-xs text-naturals-N9 transition-colors;
}
.row__actions-item-text--delete {
  @apply text-red-R1;
}

.row__box-actions-item:hover .row__actions-item-icon {
  @apply text-naturals-N12;
}
.row__box-actions-item:hover .row__actions-item-text {
  @apply text-naturals-N12;
}
.row__box-actions-item:hover .row__actions-item-icon--delete {
  @apply text-red-600;
}
.row__box-actions-item:hover .row__actions-item-text--delete {
  @apply text-red-600;
}
.row__info-box {
  @apply flex items-center;
  padding-top: 26px;
}
.row__info-item {
  @apply text-xs text-naturals-N13 flex flex-col;
}
.row__info-item:nth-child(1) {
  width: 18.1%;
  padding-left: 28px;
}
.row__info-item:nth-child(2) {
  width: 32.1%;
}
.row__info-item:nth-child(3) {
  width: 16.5%;
}
.row__info-item:nth-child(4) {
  width: 33%;
}
.row__info-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 7px;
}
.row__info-value {
  @apply text-xs text-naturals-N9;
}
.box__actions-list {
  @apply bg-naturals-N3 rounded border border-naturals-N4 flex justify-center flex-col items-start z-20;
  min-width: 161px;
}
</style>
