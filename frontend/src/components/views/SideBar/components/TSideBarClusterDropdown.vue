<template>
  <t-animation>
    <div class="clusters">
      <div class="clusters__input-box">
        <t-input @input.self="setInputValue" @clearInput="setInputValue" />
      </div>
      <!-- Todo: in progress -->
      <!-- <div class="clusters__checkbox-box">
        <t-side-bar-cluster-checkbox />
      </div> -->
      <t-watch
        :resource="{ type: kubernetes.cluster }"
        kubernetes
        :recordsNotificationStatus="false"
        :errorNotificationStatus="false"
        :isSpinnerActive="false"
      >
        <template #default="items">
          <div class="clusters__list">
            <t-side-bar-cluster-dropdown-item
              v-for="(context, idx) in shownContexts"
              :clusters="items"
              :key="idx"
              :name="context.name"
              :isNameChecked="
                ctx.name == context.name &&
                !router.currentRoute.value.query.cluster
              "
              :context="context"
              :searchOption="searchOption"
            />
          </div>
        </template>
      </t-watch>
    </div>
  </t-animation>
</template>

<script lang="ts">
import TInput from "@/components/common/TInput/TInput.vue";
// import TSideBarClusterCheckbox from "./TSideBarClusterCheckbox.vue";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import TWatch from "@/components/common/Watch/TWatch.vue";
import TSideBarClusterDropdownItem from "./TSideBarClusterDropdownItem.vue";
import { computed, ref, toRefs } from "@vue/reactivity";
import { getContext } from "@/context";
import { useRouter } from "vue-router";
import { kubernetes } from "@/api/resources";
export default {
  components: {
    // TSideBarClusterCheckbox,
    TInput,
    TAnimation,
    TSideBarClusterDropdownItem,
    TWatch,
  },
  props: {
    contexts: Array,
  },
  setup(props) {
    const { contexts } = toRefs(props);
    const ctx = getContext();
    const router = useRouter();
    const shownContexts = ref(contexts.value);
    const inputValue = ref("");
    const setInputValue = (data) => {
      inputValue.value = data;
    };

    return {
      shownContexts: computed(() => {
        return inputValue.value?.length === 0
          ? shownContexts.value
          : shownContexts?.value?.filter((elem: any) => {
              return elem?.name.includes(inputValue.value);
            });
      }),
      ctx,
      router,
      setInputValue,
      searchOption: computed(() => inputValue.value),
      kubernetes,
    };
  },
};
</script>

<style scoped>
.clusters {
  @apply bg-naturals-N2 rounded border border-naturals-N4 absolute z-50;
  left: calc(100% + 8px);
  top: 8px;
  width: 212px;
  height: auto;
  padding-right: 4px;
}
.clusters__input-box {
  @apply p-4 border-b border-naturals-N4;
}
.clusters__checkbox-box {
  @apply w-full flex justify-center;
  padding: 16px 0px 4px;
}
.clusters__list {
  @apply relative flex-col z-10;
  width: 100%;
  height: 364px;
  overflow: auto;
}
</style>
