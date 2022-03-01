<template>
  <div class="item" :class="isDropdownOpened && 'item__opened'" ref="elemRef">
    <div class="item__wrapper">
      <div
        v-show="isClusterDropdownSubItemsVisible"
        class="item__icon-wrapper"
        @click="toggleDropdown"
      >
        <t-icon
          class="item__arrow-right"
          :class="isDropdownOpened && 'item__arrow-right--pushed'"
          icon="drop-right"
        />
      </div>
      <p
        @click="switchContext(context)"
        class="item__name"
        :class="isNameChecked && 'item__name--checked'"
      >
        {{ name }}
        <t-icon
          class="item__check"
          icon="check"
          :class="isNameChecked && 'item__check--checked'"
        />
      </p>
    </div>
    <t-animation>
      <div
        v-show="isClusterDropdownSubItemsVisible"
        v-if="isDropdownOpened"
        class="item__list"
      >
        <div class="item item__list-item">
          <t-side-bar-cluster-dropdown-sub-item
            v-for="item in clustersItems.items"
            :key="item?.metadata?.name"
            :id="item?.metadata?.uid"
            :name="item?.metadata?.name"
            :item="item"
          />
        </div>
      </div>
    </t-animation>
  </div>
</template>

<script lang="ts">
import { computed, ref, toRefs } from "@vue/reactivity";
import TIcon from "@/components/common/Icon/TIcon.vue";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import TSideBarClusterDropdownSubItem from "./TSideBarClusterDropdownSubItem.vue";
import { changeContext, getContext } from "@/context";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  components: { TIcon, TAnimation, TSideBarClusterDropdownSubItem },
  props: {
    name: String,
    isNameChecked: Boolean,
    context: Object,
    clusters: Object,
  },
  setup(props) {
    const { clusters, name } = toRefs(props);
    const context = getContext();
    const isCheckedContext = ref(context.name == name.value);
    const ctx = getContext();
    let isDropdownOpened = ref();
    const router = useRouter();
    const toggleDropdown = () =>
      (isDropdownOpened.value = !isDropdownOpened.value);
    const switchContext = (c) => {
      changeContext(c);
      router.push("/");
    };
    const elemRef = ref<any>(null);

    onMounted(() => {
      if (isCheckedContext.value) elemRef.value?.scrollIntoView();
    });
    return {
      isDropdownOpened,
      toggleDropdown,
      switchContext,
      isClusterDropdownSubItemsVisible: computed(() => props.name == ctx.name),
      clustersItems: clusters.value,
      elemRef,
    };
  },
};
</script>

<style scoped>
.item {
  @apply flex-col border-b border-naturals-N3 transition-all duration-300;
}
.item__opened {
  @apply bg-naturals-N3;
}
.item__wrapper {
  @apply flex items-center py-3 cursor-pointer;
  padding: 7px 6px 7px 6px;
}
.item__arrow-right {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300;
  margin-right: 6px;
  width: 24px;
  height: 24px;
}
.item__arrow-right--pushed {
  transform: rotate(90deg);
}
.item__name {
  @apply relative w-full text-xs text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 flex flex-nowrap items-center;
  padding: 6px 19px 6px 6px;
}
.item__name--checked {
  @apply text-naturals-N14;
}
.item__name:hover .item__check {
  @apply visible;
}
.item__check {
  @apply w-3 h-3 fill-current text-naturals-N9 transition-all absolute;
  right: 10px;
  visibility: hidden;
}
.item__check--checked {
  @apply text-naturals-N14 visible;
}
</style>
