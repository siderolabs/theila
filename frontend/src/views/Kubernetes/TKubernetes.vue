<template>
  <div class="kubernetes">
    <t-watch
      :resource="{ type: TaskStatusType, namespace: upgradeID }"
      theila
      :context="getContext()"
      :recordsNotificationStatus="false"
    >
      <template #default="items">
        <div class="kubernetes__heading">
          <div class="kubernetes__heading-box">
            <p class="kubernetes__title">Upgrade Kubernetes</p>
            <p class="kubernetes__subtitle">
              This is the history of your updates
            </p>
          </div>
          <t-button
            @click="openUpgrade"
            class="kubernetes__button"
            type="secondary"
            icon="upload"
            iconPosition="left"
            >Upgrade Kubernetes</t-button
          >
        </div>
        <div class="modal-wrapper">
          <t-modal />
        </div>
        <t-kubernetes-content :items="items"
      /></template>
    </t-watch>
  </div>
</template>

<script lang="ts">
import { getContext } from "@/context";
import { DefaultNamespace, TaskStatusType } from "@/api/resources";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TKubernetesContent from "./TKubernetesContent.vue";
import TButton from "@/components/common/Button/TButton.vue";
import { useRouter } from "vue-router";
import TModal from "@/components/TModal.vue";
import { modal } from "@/modal";
import { onMounted, ref, Ref } from "@vue/runtime-core";
import { ContextService } from "@/api/grpc";

export default {
  components: { TWatch, TKubernetesContent, TButton, TModal },
  setup() {
    const router = useRouter();
    const upgradeID: Ref<string> = ref("");
    const openUpgrade = () => {
      modal.value = null;
      router.push({ query: { modal: "upgrade" } });
    };
    const ctx = getContext();
    const contextName = ctx.name;

    onMounted(async () => {
      const response = await ContextService.List();
      upgradeID.value = ctx.cluster
        ? ctx.cluster.uid
        : null || contextName || response?.currentContext;
    });
    return {
      getContext,
      openUpgrade,
      DefaultNamespace,
      TaskStatusType,
      upgradeID,
    };
  },
};
</script>

<style scoped>
.kubernetes {
  @apply flex flex-col h-full;
}
.kubernetes__heading {
  @apply flex w-full justify-between items-center flex-wrap;
  margin-bottom: 29px;
}
.kubernetes__heading-box {
  @apply flex items-center flex-wrap;
}
@media screen and (max-width: 800px) {
  .kubernetes__heading-box {
    @apply mb-3;
  }
}
.kubernetes__title {
  @apply text-xl text-naturals-N14;
  margin-right: 14px;
}
.kubernetes__subtitle {
  @apply text-xl text-naturals-N10;
  font-size: 14px;
}
.kubernetes__button {
  align-self: end;
}
.modal-wrapper {
  min-height: 10px;
  @apply mb-4;
}
</style>
