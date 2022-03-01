<template>
  <t-watch
    :resource="{ type: TaskStatusType, namespace: upgradeID }"
    theila
    :context="context"
    :recordsNotificationStatus="false"
    :isSpinnerActive="false"
  >
    <template #default="items">
      <header class="theHeader">
        <div class="theHeader__nav-wrapper">
          <div class="theHeader__logo-wrapper">
            <router-link to="/">
              <t-icon class="theHeader__icon" icon="header-logo" />
            </router-link>
          </div>
          <!-- Todo -->
          <!-- <nav class="theHeader__nav">
        <router-link class="theHeader__dashboard-wrapper" to="/dashboard">
          <t-button
            class="theHeader__nav-name"
            icon="home"
            iconPosition="left"
            type="subtle"
            >Dashboard</t-button
          >
        </router-link>
      </nav> -->
        </div>

        <t-dropdown-notifications
          title="Ongoing Tasks"
          hasLoader
          :isLoading="isLoadingPhase(items)"
        >
          <t-header-task-item
            v-show="isLoadingPhase(items)"
            :title="'Upgrading ' + currentClusterName"
            :time="items?.items?.at(-1)?.metadata?.updated"
            :description="''"
          />
        </t-dropdown-notifications>
      </header>
    </template>
  </t-watch>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import THeaderTaskItem from "./THeaderTaskItem/THeaderTaskItem.vue";
import TDropdownNotifications from "@/components/common/Dropdown/TDropdownNotifications.vue";
import { computed, onMounted, Ref, ref } from "@vue/runtime-core";
import { getContext } from "@/context";
import TWatch from "@/components/common/Watch/TWatch.vue";
import { TaskStatusType } from "@/api/resources";
import { getUpgradeID } from "@/methods";

export default {
  components: { TIcon, THeaderTaskItem, TDropdownNotifications, TWatch },
  setup() {
    const upgradeID: Ref<string> = ref("");
    const context = computed(() => getContext());
    const isLoadingPhase = (items) => {
      return items?.items?.at(-1)?.spec?.phase == "1";
    };
    onMounted(async () => {
      upgradeID.value = await getUpgradeID();
    });
    return {
      context,
      TaskStatusType,
      upgradeID,
      currentClusterName: computed(() =>
        context.value?.cluster
          ? context.value?.cluster?.name
          : context.value?.name
      ),
      isLoadingPhase,
      contextName: context.value.name,
    };
  },
};
</script>

<style scoped>
.theHeader {
  @apply px-6 py-3 flex justify-between items-center bg-naturals-N1 border-b border-naturals-N4;
  max-height: 52px;
}
.theHeader__icon {
  width: 87px;
  height: 26px;
}
.theHeader__logo-wrapper {
  @apply mr-12 flex self-center;
}
.theHeader__nav-wrapper {
  @apply flex justify-start;
}
.theHeader__nav {
  @apply flex justify-start;
}
.theHeader__dashboard-wrapper {
  @apply flex justify-start items-center;
}
.theHeader__dashboard-wrapper:hover > .theHeader__nav-icon {
  @apply fill-current text-primary-P3;
}
.theHeader__dashboard-wrapper:hover > .theHeader__nav-name {
  @apply text-primary-P3;
}
.theHeader__dashboard-wrapper:active > .theHeader__nav-icon {
  @apply fill-current text-primary-P4;
}
.theHeader__dashboard-wrapper:active > .theHeader__nav-name {
  @apply text-primary-P4;
}
.theHeader__nav-icon {
  @apply mr-2 flex justify-center items-center fill-current text-naturals-N13 transition;
  width: 16px;
  height: 16px;
}
.theHeader__nav-name {
  @apply text-naturals-N13 text-base font-medium transition;
}
</style>
