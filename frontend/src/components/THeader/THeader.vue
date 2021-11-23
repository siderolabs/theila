<template>
  <header class="theHeader">
    <div class="theHeader__nav-wrapper">
      <div class="theHeader__logo-wrapper">
        <router-link to="/">
          <t-icon class="theHeader__icon" icon="header-logo" />
        </router-link>
      </div>
      <nav class="theHeader__nav">
        <router-link class="theHeader__dashboard-wrapper" to="/dashboard">
          <t-button
            class="theHeader__nav-name"
            icon="home"
            iconPosition="left"
            type="subtle"
            >Dashboard</t-button
          >
        </router-link>
      </nav>
    </div>
    <t-dropdown title="Ongoing Tasks" hasLoader>
      <t-header-task-item
        v-for="(task, index) in tasksList"
        :title="task.title"
        :time="task.time"
        :description="task.description"
        :key="index"
      />
    </t-dropdown>
  </header>
</template>

<script>
import TButton from "../common/Button/TButton.vue";
import TDropdown from "../common/Dropdown/TDropdown.vue";
import TIcon from "../common/Icon/TIcon.vue";
import THeaderTaskItem from "./THeaderTaskItem/THeaderTaskItem.vue";

export default {
  components: { TIcon, TDropdown, TButton, THeaderTaskItem },
  setup() {
    const tasksList = [
      {
        title: "Disconnected talos-prod-US-bbkgi (5 nodes)",
        time: "06:12:22",
        description:
          "kubernetes.namespace.name=’istio-system’and kubkubernetes.namespace.name=’istio-system’and kubkubernetes.namespace.name=’istio-system’and kub",
      },
      {
        title: "Disconnected talos-prod-US-bbkgi (5 nodes)",
        time: "06:12:22",
        description:
          "kubernetes.namespace.name=’istio-system’and kubkubernetes.namespace.name=’istio-system’and kubkubernetes.namespace.name=’istio-system’and kub",
      },
    ];
    return {
      tasksList,
    };
  },
};
</script>

<style scoped>
.theHeader {
  @apply px-6 py-3 flex justify-between items-center bg-naturals-N1 border-b border-naturals-N4;
}
.theHeader__icon {
  width: 87px;
  height: 26px;
}
.theHeader__logo-wrapper {
  @apply mr-14;
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
