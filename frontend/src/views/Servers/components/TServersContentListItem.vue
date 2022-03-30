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
            <p class="list__item-name">
              <WordHighlighter
                :query="searchOption"
                :textToHighlight="item?.metadata?.uid"
                :highlightStyle="{ 'background-color': 'white' }"
              />
            </p>
            <div class="flex gap-1 items-center">
              <p v-if="item?.spec?.hardware" class="list__item-description">
                <span v-if="item.spec.hardware.system">{{ item.spec.hardware.system.manufacturer }} {{ item.spec.hardware.system.productName }}</span>
                <span v-if="item.spec.hardware.compute">, {{ item.spec.hardware.compute.totalCoreCount }} CPUs</span>
                <span v-if="item.spec.hardware.memory">, {{ item.spec.hardware.memory.totalSize }} RAM</span>
                <span v-if="item.spec.hardware.storage">, {{ item.spec.hardware.storage.totalSize }} storage</span>
              </p>
              <p v-else-if="item?.spec?.system" class="list__item-description">
                <span>{{ item?.spec?.system?.manufacturer }}&nbsp;</span>
                <span>{{ item?.spec?.system?.productName }}&nbsp;</span>
                <span>{{ item?.spec?.cpu?.version }}</span>
              </p>
              <span v-if="item?.spec?.hardware">
                <popper hover offsetDistance="10" placement="right-start">
                  <div class="h-3">
                    <t-icon icon="info" class="list__item-info-icon" />
                  </div>
                  <template #content>
                    <div class="list__item-hardware">
                      <template  v-if="item?.spec?.hardware?.system">
                        <p class="list__item-hardware-title">System information</p>
                        <p class="list__item-hardware-description">
                          <span>Manufacturer: {{ item.spec.hardware.system.manufacturer }}<br/></span>
                          <span>Product name: {{ item.spec.hardware.system.productName }}<br/></span>
                          <span v-if="item.spec.hardware.system.version">Version: {{ item.spec.hardware.system.version }}<br/></span>
                          <span v-if="item.spec.hardware.system.serialNumber">Serial number: {{ item.spec.hardware.system.serialNumber }}<br/></span>
                        </p>
                      </template>
                      <template  v-if="item?.spec?.hardware?.compute">
                        <p class="list__item-hardware-title">Compute information</p>
                        <p class="list__item-hardware-description">
                          <span>Total core count: {{ item.spec.hardware.compute.totalCoreCount }}<br/></span>
                          <span>Total thread count: {{ item.spec.hardware.compute.totalThreadCount }}<br/></span>
                          <span>Number of processors: {{ item.spec.hardware.compute.processorCount }}<br/></span>
                          <span v-bind:key="index" v-for="(cpu, index) in item.spec.hardware.compute.processors">
                            CPU {{index}}: {{ cpu.manufacturer }} {{cpu.productName}} ({{cpu.coreCount}} cores @ {{cpu.speed}} MHz, {{cpu.threadCount}} threads)<br/>
                          </span>
                        </p>
                      </template>
                      <template v-if="item?.spec?.hardware?.memory">
                        <p class="list__item-hardware-title">Memory information</p>
                        <p class="list__item-hardware-description">
                          <span>Total memory size: {{ item.spec.hardware.memory.totalSize }}<br/></span>
                          <span>Number of memory modules: {{ item.spec.hardware.memory.moduleCount }}<br/></span>
                          <span v-bind:key="index" v-for="(mem, index) in item.spec.hardware.memory.modules">
                            Memory module {{index}}: {{mem.size}} MB {{mem.type}} @ {{mem.speed}} Mhz<br/>
                          </span>
                        </p>
                      </template>
                      <template v-if="item?.spec?.hardware?.storage">
                        <p class="list__item-hardware-title">Storage information</p>
                        <p class="list__item-hardware-description">
                          <span>Total storage size: {{ item.spec.hardware.storage.totalSize }}<br/></span>
                          <span>Number of storage devices: {{ item.spec.hardware.storage.deviceCount }}<br/></span>
                          <span v-bind:key="index" v-for="(dev, index) in item.spec.hardware.storage.devices">
                            Storage device {{dev.deviceName}}: {{dev.size / 1024 / 1024 / 1024}} GB {{dev.type}}<br/>
                          </span>
                        </p>
                      </template>
                      <template v-if="item?.spec?.hardware?.network">
                        <p class="list__item-hardware-title">Network information</p>
                        <p class="list__item-hardware-description">
                          <span>Number of network interfaces: {{ item.spec.hardware.network.interfaceCount }}<br/></span>
                          <span v-bind:key="index" v-for="(ifc, index) in item.spec.hardware.network.interfaces">
                            Network interface {{ ifc.name }}: {{ifc.mac }} = {{ ifc.addresses || [] }}<br/>
                          </span>
                        </p>
                      </template>
                    </div>
                  </template>
                </popper>
              </span>
            </div>
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
import Popper from "vue3-popper";
import WordHighlighter from "vue-word-highlighter";

export default {
  components: {
    TSlideDownWrapper,
    TStatus,
    TActionsBox,
    TIcon,
    TTag,
    TButton,
    WordHighlighter,
    Popper,
  },
  props: {
    item: Object,
    searchOption: String,
  },
  setup(props) {
    const isDropdownOpened = ref(false);
    const { item } = toRefs(props);

    const created = computed(() => {
      return DateTime.fromISO(props?.item!["metadata"]["creationTimestamp"])
        .setLocale("eng")
        .toRelative();
    });
    return {
      isDropdownOpened,
      created,
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
.list__item-info {
  @apply flex flex-col;
}
.list__item-info-icon {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer mr-1 self-start;
  width: 16px;
}
.list__item-name {
  @apply text-xs text-naturals-N14 overflow-ellipsis overflow-hidden whitespace-nowrap w-full;
}
.list__item-description {
  @apply text-xs text-naturals-N9 overflow-ellipsis overflow-hidden whitespace-nowrap;
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
.list__item-hardware {
  border: 1px solid rgba(39, 41, 50, var(--tw-border-opacity));
  border-radius: 4px;
  background-color: rgba(19, 20, 28, var(--tw-bg-opacity));
  padding: 0.5rem;
}
.list__item-hardware-title {
  @apply text-xs text-naturals-N12;
  margin-bottom: 3px;
}
.list__item-hardware-description {
  @apply text-xs text-naturals-N9 overflow-ellipsis overflow-hidden whitespace-nowrap;
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
