<template>
  <p
    class="name"
    :class="(isChecked && 'name__checked', !isLoading && 'name__pushed')"
    @click="$emit('click', id)"
  >
    <t-icon
      v-show="isLoading"
      class="name__loading animate-spin"
      icon="loading"
      :class="{ 'name__check--checked': isChecked }"
    />
    {{ name }}
    <t-icon
      class="name__check"
      icon="check"
      :class="{ 'name__check--checked': isChecked }"
    />
  </p>
</template>

<script lang="ts">
import TIcon from "../../../common/Icon/TIcon.vue";
export default {
  components: { TIcon },
  props: {
    id: Number,
    name: String,
    isChecked: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.name {
  @apply relative w-full text-xs text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 flex flex-nowrap items-center cursor-pointer;
  padding: 6px 19px 6px 13px;
}
.name__checked {
  @apply text-naturals-N14;
}
.name__pushed {
  @apply pl-11;
}
.name:hover .name__check {
  @apply visible;
}
.name__check {
  @apply w-3 h-3 fill-current text-naturals-N9 transition-all absolute;
  right: 10px;
  visibility: hidden;
}
.name__check--checked {
  @apply text-naturals-N14 visible;
}
.name__loading {
  @apply w-3 h-3;
  margin-right: 5px;
}
</style>
