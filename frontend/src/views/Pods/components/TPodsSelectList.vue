<template>
  <div class="menu">
    <Listbox v-model="selectedItem">
      <ListboxButton class="menu__button">
        <div>
          <span class="menu__button-version"
            ><span class="menu__phase">Phase:</span>{{ selectedItem }}</span
          >
        </div>
        <t-icon class="menu__arrow" icon="arrow-down" />
      </ListboxButton>
      <t-animation>
        <ListboxOptions class="menu__items">
          <div class="menu__items-wrapper">
            <div
              @click="$emit('checkedValue', item)"
              v-for="(item, idx) in TPodsViewFilterOptionsArray"
              :key="idx"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                class="menu__item"
                :value="item"
              >
                <div class="menu__item-wrapper">
                  <span class="menu__item-text" :class="{ active: active }"
                    >{{ item }}
                  </span>
                  <t-icon
                    icon="check"
                    class="menu__check-icon"
                    v-show="selected"
                  />
                </div>
              </ListboxOption>
            </div>
          </div>
        </ListboxOptions>
      </t-animation>
    </Listbox>
  </div>
</template>

<script lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { ref } from "@vue/reactivity";
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import { TPodsViewFilterOptions } from "@/constants";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    TIcon,
    TAnimation,
  },
  emits: ["checkedValue"],
  setup() {
    const selectedItem = ref(TPodsViewFilterOptions.ALL);
    const TPodsViewFilterOptionsArray = Object.values(TPodsViewFilterOptions);

    return {
      selectedItem,
      TPodsViewFilterOptionsArray,
    };
  },
};
</script>

<style scoped>
.menu {
  @apply mb-8 relative z-20;
  min-width: 135px;
}
.menu__button {
  @apply w-full bg-naturals-N2 rounded border border-naturals-N7 flex justify-between items-center text-xs text-naturals-N14;
  padding: 9px 12px;
  height: 32px;
}
.menu__button-version {
  margin-right: 8px;
}
.menu__phase {
  @apply text-xs text-naturals-N9 mr-1;
}
.menu__arrow {
  @apply fill-current text-naturals-N9 transition-all duration-300;
  width: 16px;
  height: 16px;
}
.menu__items {
  @apply flex flex-col rounded bg-naturals-N3 border border-naturals-N4 absolute w-full;
  top: 36px;
  padding: 0 6px;
  max-height: 237px;
}
.menu__item {
  @apply text-xs text-naturals-N9 cursor-pointer;
  padding: 6px 12px;
}
.menu__item-wrapper {
  @apply flex justify-between items-center;
}
.menu__item-text {
  @apply transition-all;
  margin-right: 8px;
}
.active {
  @apply text-naturals-N13;
}
.menu__items-wrapper {
  @apply flex flex-col overflow-auto;
  padding-top: 6px;
  padding-bottom: 6px;
}
.menu__check-icon {
  @apply w-3 h-3 fill-current text-naturals-N14;
}
</style>
