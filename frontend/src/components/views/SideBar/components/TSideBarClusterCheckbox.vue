<template>
  <RadioGroup class="checkbox" v-model="checkbox">
    <RadioGroupOption class="checkbox__left" v-slot="{ checked }" value="All">
      <span :class="{ checkbox__active: checked }">All</span>
    </RadioGroupOption>
    <RadioGroupOption
      class="checkbox__right"
      v-slot="{ checked }"
      value="Hosts Only"
    >
      <span :class="{ checkbox__active: checked }">Hosts Only</span>
    </RadioGroupOption>
  </RadioGroup>
</template>

<script>
import { ref } from "vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";

export default {
  components: { RadioGroup, RadioGroupOption },

  setup() {
    const checkbox = ref("All");

    return { checkbox };
  },
};
</script>

<style scoped>
.checkbox {
  @apply flex justify-between items-center w-full bg-naturals-N3 rounded;
  max-width: 180px;
  padding: 2px;
}
.checkbox__left {
  @apply flex h-5 items-center justify-center rounded w-1/2 text-xs  text-naturals-N8 cursor-pointer;
  font-size: 10px;
}
.checkbox__right {
  @apply flex h-5 items-center justify-center rounded w-1/2 text-xs text-naturals-N8 cursor-pointer;
  font-size: 10px;
}
.checkbox__active {
  @apply w-full h-full rounded bg-naturals-N4 text-naturals-N12 flex items-center justify-center;
}
</style>
