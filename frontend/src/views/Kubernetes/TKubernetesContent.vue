<template>
  <div class="list" :class="{ short: isModalOpened }">
    <ul class="list__heading">
      <li class="list__heading-item">Upgrade to</li>
      <li class="list__heading-item">Upgrade from</li>
      <li class="list__heading-item">Duration</li>
      <li class="list__heading-item">Started At</li>
      <li class="list__heading-item">Status</li>
    </ul>
    <div
      v-show="items.items.length !== 0"
      class="list__item"
      v-for="(item, id) in items.items"
      :key="id"
    >
      <div class="list__item-to">{{ item?.spec?.toversion }}</div>
      <div class="list__item-from">{{ item?.spec?.fromversion }}</div>
      <div class="list__item-duration">
        {{ getDuration(item?.metadata?.created, item?.metadata?.updated) }}
      </div>
      <div class="list__item-started">{{ item?.metadata?.updated }}</div>
      <div class="list__item-status"><t-status :title="getStatus(item)" /></div>
      <div class="list__item-details">
        <!-- Todo -->
        <!-- <t-button icon="arrow-right" iconPosition="right" type="subtle"
          >View Details</t-button
        > -->
      </div>
    </div>
    <div v-show="items.items.length === 0" class="list__empty-state-box">
      <div class="info">
        <div class="info__wrapper">
          <t-icon class="info__icon" icon="upgrade-empty-state" />
          <h3 class="info__title">
            You have not yet updated the Kubernetes for this cluster
          </h3>
          <p class="info__subtitle">
            After the update, information about it will appear here
          </p>
          <t-button
            @click="openUpgrade"
            class="info__button"
            type="secondary"
            icon="upload"
            iconPosition="left"
            >Upgrade Kubernetes</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "@/components/common/Button/TButton.vue";
import TStatus from "@/components/common/Status/TStatus.vue";
import { modal } from "@/modal";
import { useRouter } from "vue-router";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { computed } from "@vue/reactivity";
import { DateTime, Duration } from "luxon";

export default {
  components: { TButton, TStatus, TIcon },
  props: {
    items: Object,
  },
  setup() {
    const router = useRouter();

    const getDuration = (start, finish) => {
      if (!!start && !!finish) {
        return Duration.fromObject({
          seconds:
            DateTime.fromMillis(DateTime.fromISO(finish).ts) / 1000 -
            DateTime.fromMillis(DateTime.fromISO(start).ts) / 1000,
        }).toFormat("mm'm' ss's'");
      }
    };
    const getStatus = (item) => {
      return item?.spec?.error
        ? "Failed"
        : +item?.spec?.phase === 1
        ? "Running"
        : +item?.spec?.phase === -1
        ? "Unrecognized"
        : "Completed";
    };
    const openUpgrade = () => {
      modal.value = null;
      router.push({ query: { modal: "upgrade" } });
    };

    return {
      getStatus,
      openUpgrade,
      getDuration,
      isModalOpened: computed(() => modal.value !== null),
    };
  },
};
</script>

<style scoped>
.list {
  @apply flex flex-col overflow-auto;
  max-height: calc(100vh - 195px);
}
.short {
  max-height: calc(100vh - 263px);
}
@media screen and (max-width: 800px) {
  .list {
    @apply flex flex-col overflow-auto;
    max-height: calc(100vh - 235px);
  }
  .short {
    max-height: calc(100vh - 312px);
  }
}
.list__heading {
  @apply flex rounded-sm bg-naturals-N2 sticky top-0;
  padding: 10px 16px;
}
.list__heading-item {
  @apply text-xs text-naturals-N13;
}
.list__heading-item:nth-child(1) {
  width: 15%;
}
.list__heading-item:nth-child(2) {
  width: 15%;
}
.list__heading-item:nth-child(3) {
  width: 15%;
}
.list__heading-item:nth-child(4) {
  width: 25%;
}
.list__heading-item:nth-child(5) {
  width: 20%;
}
.list__item {
  @apply flex;
  padding: 19px 16px;
}
.list__item-to {
  @apply text-xs text-naturals-N14;
  width: 15%;
}
.list__item-from {
  @apply text-xs text-naturals-N9;
  width: 15%;
}
.list__item-duration {
  @apply text-xs text-naturals-N9;
  width: 15%;
}
.list__item-started {
  @apply text-xs text-naturals-N9;
  width: 25%;
}
.list__item-status {
  width: 20%;
}
.list__item-details {
  @apply flex justify-end items-center;
  flex-grow: 1;
}
.info {
  @apply w-full flex justify-center items-center pt-20;
}
.info__wrapper {
  @apply flex-col items-center justify-start;
}
.info__icon {
  margin: 40px auto;
}
.info__title {
  @apply text-xl text-naturals-N14 mb-3 text-center;
  font-size: 18px;
}
.info__subtitle {
  @apply text-xs text-naturals-N11 mb-9 text-center;
}
.info__button {
  margin: 0 auto;
}
</style>
