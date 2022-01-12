<template>
  <div class="nodes-list__item">
    <p class="nodes-list__item-name">
      <router-link
        :to="{ name: 'Overview', params: { node: ip }, query: getQuery() }"
      >
        {{ item?.metadata?.name }}
      </router-link>
    </p>

    <p class="nodes-list__item-info nodes-list__item-info--first">
      {{ ip }}
    </p>
    <p class="nodes-list__item-info">
      {{ os }}
    </p>
    <div class="nodes-list__item-roles">
      <t-tag
        class="nodes-list__item-role"
        v-for="role in roles"
        :key="role"
        :name="role"
      />
    </div>
    <div class="nodes-list__item-status">
      <t-status :title="status" />
    </div>
    <div class="nodes-list__item-menu">
      <t-actions-box class="nodes-list__action-box">
        <div class="nodes-list__actions-list">
          <div class="nodes-list__box-actions-item" @click="rebootNode">
            <t-icon class="nodes-list__actions-item-icon" icon="reboot" />
            <span class="nodes-list__actions-item-text">Reboot</span>
          </div>
          <div class="nodes-list__box-actions-item" @click="resetNode">
            <t-icon class="nodes-list__actions-item-icon" icon="reset" />
            <span class="nodes-list__actions-item-text">Reset</span>
          </div>
        </div>
      </t-actions-box>
    </div>
  </div>
</template>

<script lang="ts">
import TStatus from "@/components/common/Status/TStatus.vue";
import TTag from "@/components/common/Tag/TTag.vue";
import TActionsBox from "@/components/common/ActionsBox/TActionsBox.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { computed, toRef } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { getStatus } from "@/methods";

export default {
  components: { TTag, TStatus, TActionsBox, TIcon },
  props: {
    item: Object,
  },
  setup(props) {
    const item = toRef(props, "item");
    const router = useRouter();

    const getField = (...args) => {
      let res: any = item.value;
      for (const k of args) {
        if (!res[k]) return null;

        res = res[k];
      }

      return res;
    };
    const os = computed(() => {
      return getField("status", "nodeInfo", "osImage") || "";
    });

    const ip = computed(() => {
      const addresses: any = getField("status", "addresses");
      if (!addresses) return "unknown";

      let addr;
      for (const a of addresses) {
        if (a.type == "InternalIP") {
          addr = a.address;
        }

        if (a.type == "ExternalIP") {
          addr = a.address;
          break;
        }
      }

      return addr;
    });

    const status = computed(() => getStatus(item.value));

    const roles = computed(() => {
      const roles: any = [];

      for (const label in item.value?.metadata.labels) {
        if (label.indexOf("node-role.kubernetes.io/") != -1) {
          roles.push(label.split("/")[1]);
        }
      }

      return roles;
    });
    const isTalos = computed(() => {
      return os.value.indexOf("Talos") != -1;
    });

    const route = useRoute();

    const getQuery = () => {
      const query: any = {};

      if (route.query.cluster && route.query.namespace && route.query.uid) {
        query.cluster = route.query.cluster;
        query.namespace = route.query.namespace || "default";
        query.uid = route.query.uid;
      }

      return query;
    };

    const rebootNode = async () => {
      router.push({
        query: {
          modal: "reboot",
          node: ip.value,
          ...route.query,
        },
      });
    };

    const resetNode = async () => {
      router.push({
        query: {
          modal: "reset",
          node: ip.value,
          ...route.query,
        },
      });
    };
    return {
      os,
      ip,
      roles,
      status,
      isTalos,
      rebootNode,
      resetNode,
      getQuery,
    };
  },
};
</script>

<style scoped>
.nodes-list__item {
  @apply flex items-center border-b border-naturals-N4;
  padding: 19px 16px;
}
.nodes-list__item-name {
  @apply text-xs w-full text-naturals-N14 font-medium hover:text-naturals-N9 transition;
  max-width: 25%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.nodes-list__item-info {
  @apply text-xs w-full text-naturals-N9 overflow-ellipsis pr-2;
  overflow: hidden;
  white-space: nowrap;
  max-width: 20%;
}
.nodes-list__item-info--first {
  padding-left: 15px;
}
.nodes-list__item-status {
  @apply w-full;
  max-width: 18.5%;
}
.nodes-list__item-roles {
  @apply flex items-center w-full flex-wrap;
  max-width: 20%;
}
.nodes-list__item-role {
  margin-bottom: 2px;
}
.nodes-list__item-role:not(:last-of-type) {
  margin-right: 6px;
}
.nodes-list__actions-list {
  @apply bg-naturals-N3 rounded border border-naturals-N4;
}
.nodes-list__box-actions-item {
  @apply flex items-center cursor-pointer w-full;
  padding: 17px 14px;
}
.nodes-list__box-actions-item:first-of-type {
  padding: 17px 14px 6.5px 14px;
}
.nodes-list__actions-item-icon {
  @apply w-4 h-4 fill-current text-naturals-N9 transition-colors;
  margin-right: 6px;
}
.nodes-list__actions-item-text {
  @apply text-xs text-naturals-N9 transition-colors;
}
.nodes-list__box-actions-item:hover .nodes-list__actions-item-icon {
  @apply text-naturals-N12;
}
.nodes-list__box-actions-item:hover .nodes-list__actions-item-text {
  @apply text-naturals-N12;
}
</style>
