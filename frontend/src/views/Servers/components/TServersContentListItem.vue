<template>
  <li class="list__heading-item" :class="{ opened: isDropdownOpened }">
    <t-slide-down-wrapper :maxHeight="150" :isSliderOpened="isDropdownOpened">
      <template v-slot:head>
        <div class="list__item-top">
          <t-icon
            @click="() => (isDropdownOpened = !isDropdownOpened)"
            class="list__item-arrow"
            :class="{ 'list__item-arrow-right--pushed': isDropdownOpened }"
            icon="drop-up"
          />
          <div class="list__item-data">
            <p class="list__item-name">{{ item?.metadata?.uid }}</p>
            <p v-if="item?.spec?.system" class="list__item-description">
              <span>{{ item?.spec?.system?.manufacturer }}&nbsp;</span>
              <span>{{ item?.spec?.system?.productName }}&nbsp;</span>
              <span>{{ cpu }}</span>
            </p>
          </div>
          <div class="list__item-created">{{ created }}</div>
          <div class="list__item-status">
            <t-status :title="item?.status?.ready ? 'Ready' : 'Failed'" />
          </div>
          <div class="list__item-power">
            <t-status
              :title="(item?.status || {})?.power === 'on' ? 'On' : 'Off'"
            />
          </div>
          <t-actions-box class="list__action-box">
            <div class="box__actions-list">
              <div class="list__box-actions-item" @click="() => acceptServer()">
                <t-button
                  :disabled="item?.spec?.accepted"
                  isLightHover
                  type="subtle"
                  icon="log"
                  iconPosition="left"
                  >Accept Server</t-button
                >
              </div>
            </div>
          </t-actions-box>
        </div>
      </template>
      <template v-slot:body>
        <div class="list__item-bottom">
          <div class="list__item-labels">
            <p v-if="item?.metadata?.labels" class="list__item-label-title">
              Labels
            </p>
            <t-tag
              v-for="(value, key, index) in item?.metadata?.labels"
              :key="index"
              class="list__item-label"
              :name="key + ':' + value"
            />
          </div>

          <div class="list__item-bottom-accepted">
            <p class="list__item-bottom-accepted-title">Accepted</p>
            <t-status :title="item?.spec?.accepted ? 'True' : 'False'" />
          </div>
          <div class="list__item-bottom-hostname">
            <p class="list__item-bottom-hostname-title">Hostname</p>
            <p class="list__item-hostname-description">
              {{ item?.spec?.hostname }}
            </p>
          </div>
          <div class="list__item-bottom-clean">
            <p class="list__item-bottom-clean-title">Clean</p>
            <t-status
              :title="item?.status && item?.status?.isClean ? 'True' : 'False'"
            />
          </div>
          <div class="list__item-bottom-allocated">
            <p class="list__item-bottom-allocated-title">Allocated</p>
            <t-status
              :title="item?.status && item?.status?.inUse ? 'True' : 'False'"
            />
          </div>
        </div>
      </template>
    </t-slide-down-wrapper>
  </li>
</template>

<script lang="ts">
import TSlideDownWrapper from "@/components/common/SlideDownWrapper/TSlideDownWrapper.vue";
import { DateTime } from "luxon";
import TStatus from "@/components/common/Status/TStatus.vue";
import TActionsBox from "@/components/common/ActionsBox/TActionsBox.vue";
import TTag from "@/components/common/Tag/TTag.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { computed, ref, toRefs } from "@vue/reactivity";
import { ResourceService } from "@/api/grpc";
import { KubernetesResourceType } from "@/api/resources";
import { Runtime } from "@/api/common/theila.pb";
import { showError } from "@/modal";
import TButton from "@/components/common/Button/TButton.vue";

export default {
  components: { TSlideDownWrapper, TStatus, TActionsBox, TIcon, TTag, TButton },
  props: {
    item: Object,
  },
  setup(props) {
    const isDropdownOpened = ref(false);
    const { item } = toRefs(props);

    const created = computed(() => {
      return DateTime.fromISO(props?.item!["metadata"]["creationTimestamp"])
        .setLocale("eng")
        .toRelative();
    });
    const cpu = computed(() => {
      return (item.value!["spec"]["cpu"] || {})["version"];
    });
    return {
      isDropdownOpened,
      created,
      cpu,
      acceptServer: async () => {
        if (item.value!["spec"]["accepted"]) return;

        const spec: any = {};

        Object.assign(spec, item.value);

        spec.spec["accepted"] = true;

        try {
          await ResourceService.Update(
            {
              metadata: {
                type: KubernetesResourceType,
              },
              spec: spec,
            },
            {
              runtime: Runtime.Kubernetes,
            }
          );
        } catch (e: any) {
          showError(
            `Failed to accept the server ${item.value!["metadata"]["name"]}`,
            e.toString()
          );
        }
      },
    };
  },
};
</script>

<style scoped>
.list__heading-item {
  @apply relative w-full border border-transparent  flex flex-col items-center mb-1 transition-all duration-500;
  min-width: 450px;
  padding: 12px 8px 17px;
  border-bottom: 1px solid rgba(39, 41, 50, var(--tw-border-opacity));
  border-radius: 4px 4px 0 0;
}
.opened {
  @apply rounded border-naturals-N5;
}

.opened:last-of-type {
  border-bottom: 1px solid rgba(44, 46, 56, var(--tw-border-opacity));
}
.list__item-top {
  @apply flex items-center relative;
}
.list__item-arrow {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer mr-1 self-start;
  transform: rotate(-180deg);
  width: 24px;
  height: 24px;
}
.list__item-arrow-right--pushed {
  transform: rotate(0deg);
}
.list__item-data {
  @apply flex flex-col pr-1;
  width: 38.3%;
}
.list__item-name {
  @apply text-xs text-naturals-N14 overflow-ellipsis overflow-hidden whitespace-nowrap w-full;
}
.list__item-description {
  @apply text-xs text-naturals-N9 overflow-ellipsis overflow-hidden whitespace-nowrap w-full;
  padding-top: 6px;
}
.list__item-hostname-description {
  @apply text-xs text-naturals-N9 overflow-ellipsis overflow-hidden whitespace-nowrap w-full;
}
.list__item-created {
  @apply text-xs text-naturals-N9;
  width: 19.8%;
}
.list__item-status {
  width: 19.8%;
}
.list__item-power {
  width: 17%;
}
.list__action-box {
  @apply absolute right-5;
  top: calc(50% - 12px);
}
.list__box-actions-item {
  @apply flex items-center cursor-pointer w-full whitespace-nowrap bg-naturals-N3 rounded border border-naturals-N4;
  padding: 11px 14px;
}
.list__actions-item-text {
  @apply text-xs text-naturals-N9 transition-colors;
}
.list__box-actions-item:hover .list__actions-item-text {
  @apply text-naturals-N12;
}
.list__item-bottom {
  @apply flex pl-7 w-full;
  padding: 26px 24px 0 28px;
}
.list__item-labels {
  @apply flex flex-col;
  width: 39.6%;
}
.list__item-label-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 9px;
}
.list__item-label {
  margin-bottom: 6px;
  width: fit-content;
}
.list__item-bottom-accepted {
  @apply flex flex-col;
  width: 20.5%;
}
.list__item-bottom-accepted-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 9px;
}
.list__item-bottom-hostname {
  @apply flex flex-col;
  width: 20.5%;
}
.list__item-bottom-hostname-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 9px;
}
.list__item-bottom-clean {
  @apply flex flex-col pl-1;
  width: 16.5%;
}
.list__item-bottom-clean-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 9px;
}
.list__item-bottom-allocated {
  @apply flex flex-col;
}
.list__item-bottom-allocated-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 9px;
}
</style>
