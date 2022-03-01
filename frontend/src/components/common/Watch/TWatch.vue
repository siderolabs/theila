<template>
  <div class="watch" v-if="!!resourceWatch">
    <div
      v-if="isSpinnerActive && loading"
      class="flex flex-row justify-center items-center w-full h-full"
    >
      <t-spinner class="spinner" />
    </div>
    <t-alert
      v-else-if="errorNotificationStatus && err"
      title="Failed to Fetch Data"
      type="error"
    >
      {{ err }}.
    </t-alert>
    <t-alert
      v-else-if="recordsNotificationStatus && items.length == 0"
      type="info"
      title="No Records"
      >No entries of the requested resource type are found on the
      server.</t-alert
    >
    <div v-else class="wrapper">
      <slot :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import Watch from "@/api/watch";
import { context as ctx } from "@/context";
import { ref } from "@vue/reactivity";
import TAlert from "@/components/TAlert.vue";
import TSpinner from "@/components/common/Spinner/TSpinner.vue";
export default {
  components: { TAlert, TSpinner },
  props: {
    context: Object,
    resource: Object,
    kubernetes: Boolean,
    talos: Boolean,
    watch: Object,
    itemName: String,
    theila: Boolean,
    recordsNotificationStatus: {
      type: Boolean,
      default: true,
    },
    errorNotificationStatus: {
      type: Boolean,
      default: true,
    },
    isSpinnerActive: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const resourceWatch = props.watch
      ? props.watch
      : new Watch(ctx.api, ref([]));
    resourceWatch.setup(props, context);

    return {
      items: resourceWatch.items,
      err: resourceWatch.err,
      loading: resourceWatch.loading,
      running: resourceWatch.running,
      sortFn: resourceWatch.sort,
      resourceWatch,
    };
  },
};
</script>

<style scoped>
.watch {
  @apply w-full h-full;
}
.wrapper {
  @apply w-full h-full;
}
.spinner {
  @apply absolute top-2/4;
}
</style>
