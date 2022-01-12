<template>
  <div class="overview">
    <div class="overview__heading">
      <t-breadcrumbs
        class="overview__breadcrumbs"
        :nodeName="item[0]?.metadata?.name"
      />
      <div class="overview__heading-buttons">
        <t-button
          class="overview__heading-button"
          icon="reboot"
          iconPosition="left"
          type="secondary"
          @click="rebootNode"
          >Reboot</t-button
        >
        <t-button
          class="overview__heading-button"
          icon="reset"
          iconPosition="left"
          type="secondary"
          @click="resetNode"
          >Reset</t-button
        >
      </div>
    </div>
    <t-nodes-content-type
      class="overview__content-types"
      type="overview"
      :ip="$route.params.node"
    />
    <ul class="overview__data-list">
      <li class="overview__data-item">
        <h4 class="overview__data-heading">Kubernetes</h4>
        <div class="overview__data-row">
          <p class="overview__data-name">Hostname</p>
          <p class="overview__data">{{ item[0]?.metadata?.name }}</p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">Kubelet Version</p>
          <p class="overview__data">
            {{ item[0]?.status?.nodeInfo?.kubeletVersion }}
          </p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">OS</p>
          <p class="overview__data">
            {{ item[0]?.status?.nodeInfo?.operatingSystem }}
          </p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">Roles</p>
          <div class="overview__data-roles">
            <t-tag
              class="overview__data-role"
              v-for="role in roles"
              :key="role"
              :name="role"
            />
          </div>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">Status</p>
          <div class="overview__data">
            <t-status :title="status" />
          </div>
        </div>
      </li>
      <li class="overview__data-item">
        <h4 class="overview__data-heading">Node</h4>
        <div class="overview__data-row">
          <p class="overview__data-name">IP</p>
          <p class="overview__data">{{ $route.params.node }}</p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">OS</p>
          <p class="overview__data">{{ item[0]?.status?.nodeInfo?.osImage }}</p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">Architecture</p>
          <p class="overview__data">
            {{ item[0]?.status?.nodeInfo?.architecture }}
          </p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">Kernel Version</p>
          <p class="overview__data">
            {{ item[0]?.status?.nodeInfo?.kernelVersion }}
          </p>
        </div>
        <div class="overview__data-row">
          <p class="overview__data-name">
            Container Runtime Version
            {{ item[0]?.status?.nodeInfo?.containerRuntimeVersion }}
          </p>
        </div>
      </li>
    </ul>
    <t-watch
      :resource="{ type: 'services' }"
      itemName="Service"
      talos
      :context="getContext()"
    >
      <template #default="services">
        <div class="overview__services">
          <div class="overview__services-heading">
            <span class="overview__services-title">Services</span>
            <span class="overview__services-amount">{{
              services.items.length
            }}</span>
          </div>
          <ul class="overview__table-header">
            <li class="overview__table-name overview__table-name--id">ID</li>
            <li class="overview__table-name overview__table-name--running">
              Running
            </li>
            <li class="overview__table-name overview__table-name--health">
              Health
            </li>
          </ul>
          <t-group-animation>
            <ul
              v-for="service in services.items"
              :key="service?.metadata?.id"
              class="overview__table-item"
            >
              <li class="overview__item-value overview__item-value--id">
                {{ service?.metadata?.id }}
              </li>
              <li class="overview__item-value overview__item-value--running">
                <t-status
                  class="overview__status"
                  :title="service?.spec?.running ? 'Running' : 'Not Running'"
                />
              </li>
              <li class="overview__item-value overview__item-value--health">
                <t-status
                  class="overview__status"
                  :title="getServiceHealthStatus(service)"
                />
              </li>
              <li class="overview__item-value overview__item-value--logs">
                <t-button
                  class="overview__item-button"
                  icon="arrow-right"
                  type="subtle"
                  @click="
                    () =>
                      $router.push({
                        name: 'Logs',
                        query: {
                          cluster: $route.query.cluster,
                          namespace: $route.query.namespace,
                          uid: $route.query.uid,
                        },
                        params: {
                          node: $route.params.node,
                          service: service.metadata.id,
                        },
                      })
                  "
                  >View Log</t-button
                >
              </li>
            </ul>
          </t-group-animation>
        </div>
      </template>
    </t-watch>
  </div>
</template>

<script lang="ts">
import TBreadcrumbs from "@/components/TBreadcrumbs.vue";
import { computed, toRef } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import TButton from "@/components/common/Button/TButton.vue";
import TNodesContentType from "./TNodesContentType.vue";
import TTag from "@/components/common/Tag/TTag.vue";
import TStatus from "@/components/common/Status/TStatus.vue";
import { getContext } from "@/context";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TGroupAnimation from "@/components/common/Animation/TGroupAnimation.vue";
import { getServiceHealthStatus, getStatus } from "@/methods";
export default {
  components: {
    TBreadcrumbs,
    TButton,
    TNodesContentType,
    TTag,
    TStatus,
    TWatch,
    TGroupAnimation,
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const nodesList = toRef(props, "items");
    const route = useRoute();
    const router = useRouter();
    const rebootNode = async () => {
      router.push({
        query: {
          modal: "reboot",
          node: route.params.node,
          ...route.query,
        },
      });
    };

    const resetNode = async () => {
      router.push({
        query: {
          modal: "reset",
          node: route.params.node,
          ...route.query,
        },
      });
    };
    const getItem = () => {
      return nodesList.value.filter((item) => {
        let addr;
        for (const a of item.status.addresses) {
          if (a.type == "InternalIP") {
            addr = a.address;
          }

          if (a.type == "ExternalIP") {
            addr = a.address;
            break;
          }
        }
        return addr == route.params.node;
      });
    };

    return {
      getContext,
      rebootNode,
      resetNode,
      getServiceHealthStatus,
      item: computed(() => getItem()),
      roles: computed(() => {
        const roles: any = [];
        for (const label in getItem()[0]?.metadata?.labels) {
          if (label.indexOf("node-role.kubernetes.io/") != -1) {
            roles.push(label.split("/")[1]);
          }
        }
        return roles;
      }),
      status: computed(() => getStatus(getItem()[0])),
    };
  },
};
</script>

<style scoped>
.overview__heading {
  @apply flex w-full justify-between mb-9 flex-row flex-wrap;
}
.overview__breadcrumbs {
  @apply xl:mb-0 mb-3;
}
.overview__heading-buttons {
  @apply flex;
}
.overview__heading-button {
  @apply text-naturals-N13;
}
.overview__heading-button:nth-child(1) {
  border-radius: 4px 0 0 4px;
}
.overview__heading-button:nth-child(2) {
  border-radius: 0 4px 4px 0;
}
.overview__content-types {
  @apply mb-6;
}
.overview__data-list {
  @apply flex flex-col justify-start items-stretch xl:flex-row xl:justify-between xl:items-start mb-10;
}
.overview__data-item {
  @apply bg-naturals-N2 w-full rounded mb-6;
  align-self: stretch;
  max-width: 100%;
}
@media screen and (min-width: 1280px) {
  .overview__data-item {
    max-width: 49%;
    @apply mb-0;
  }
}
.overview__data-heading {
  @apply px-4 py-3 border-b border-naturals-N4 w-full text-xs text-naturals-N13;
  font-size: 13px;
}
.overview__data-row {
  @apply w-full flex justify-between items-center;
  padding: 14px 16px 10px 16px;
}
.overview__data-row:last-of-type {
  padding-bottom: 12px;
}
.overview__data-name {
  @apply text-xs text-naturals-N11;
}
.overview__data {
  @apply text-xs text-naturals-N13;
}
.overview__data-roles {
  @apply flex;
}
.overview__data-role:not(:last-of-type) {
  margin-right: 6px;
}
.overview__services-heading {
  @apply mb-4;
}
.overview__services-title {
  @apply text-base text-naturals-N13 mr-2;
}
.overview__services-amount {
  @apply text-xs text-naturals-N12 bg-naturals-N5;
  border-radius: 30px;
  padding: 3px 7px;
}
.overview__table-header {
  @apply flex bg-naturals-N2 rounded-sm;
  padding: 10px 16px;
}
.overview__table-name {
  @apply text-xs text-naturals-N13 w-full;
}
.overview__table-name--id {
  width: 100%;
  max-width: 55%;
}
.overview__table-name--running {
  width: 18%;
}
.overview__table-name--health {
  width: 18%;
}
.overview__table-item {
  @apply flex items-center border-b border-naturals-N4;
  padding: 19px 16px;
}
.overview__item-value {
  @apply text-xs text-naturals-N14 w-full;
}
.overview__item-value--id {
  width: 100%;
  max-width: 55%;
}
.overview__item-value--running {
  width: 18%;
}
.overview__item-value--health {
  width: 18%;
}
@media screen and (max-width: 1280px) {
  .overview__table-name--running {
    width: 50%;
  }
  .overview__table-name--health {
    width: 73%;
  }
  .overview__item-value--running {
    width: 50%;
  }
  .overview__item-value--health {
    width: 50%;
  }
}
.overview__item-value--logs {
  @apply flex justify-end;
  width: auto;
}
.overview__item-button {
  @apply min-w-max;
}
</style>
