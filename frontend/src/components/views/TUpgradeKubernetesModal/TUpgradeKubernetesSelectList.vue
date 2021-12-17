<template>
  <div class="menu">
    <Listbox v-model="selectedItem">
      <ListboxButton class="menu__button">
        <div>
          <span class="menu__button-version">{{ selectedItem.version }}</span>
          <span v-show="selectedItem.currentVersion" class="menu__current"
            >Current Version</span
          >
        </div>
        <t-icon class="menu__arrow" icon="arrow-down" />
      </ListboxButton>
      <t-animation>
        <ListboxOptions class="menu__items">
          <div class="menu__items-wrapper">
            <div
              @click="$emit('checkedValue', item)"
              v-for="(item, idx) in mockData"
              :key="idx"
            >
              <ListboxOption
                v-slot="{ active, selected }"
                class="menu__item"
                :value="item"
              >
                <div class="menu__item-wrapper">
                  <span class="menu__item-text" :class="{ active: active }"
                    >{{ item.version }}
                    <span
                      v-if="item.currentVersion"
                      class="menu__current-version"
                      >Current Version</span
                    ></span
                  >
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
    const mockData = [
      { version: "1.22.0-alpha.1" },
      { version: "1.22.0.2", currentVersion: true },
      { version: "1.22.0-alpha.3" },
      { version: "1.22.0-alpha.0" },
    ];
    const selectedItem = ref(mockData[1]);
    return {
      selectedItem,
      mockData,
    };
  },
};
</script>

<style scoped>
.menu {
  @apply mb-8 relative;
}
.menu__button {
  @apply w-full bg-naturals-N2 rounded border border-naturals-N7 flex justify-between items-center text-xs text-naturals-N13;
  padding: 9px 12px;
  height: 32px;
}
.menu__button-version {
  margin-right: 8px;
}
.menu__current {
  @apply text-xs text-naturals-N9;
}
.menu__current-version {
  @apply text-xs text-naturals-N9;
  padding-left: 8px;
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
  padding: 14px 5px;
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
}
.menu__check-icon {
  @apply w-3 h-3 fill-current text-naturals-N14;
}
</style>
