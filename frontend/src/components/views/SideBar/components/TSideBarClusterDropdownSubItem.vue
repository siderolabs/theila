<template>
  <router-link
    :to="{
      name: 'Nodes',
      query: {
        cluster: item?.metadata?.name,
        namespace: item?.metadata?.namespace,
        uid: item?.metadata?.uid,
      },
    }"
    class="block overflow-visible"
  >
    <p
      class="name"
      :class="(isItemSelected && 'name__checked', !isLoading && 'name__pushed')"
      @click="$emit('click', id)"
    >
      <t-icon
        v-show="isLoading"
        class="name__loading animate-spin"
        icon="loading"
        :class="{ 'name__check--checked': isItemSelected }"
      />
      {{ name }}
      <t-icon
        class="name__check"
        icon="check"
        :class="{ 'name__check--checked': isItemSelected }"
      />
    </p>
  </router-link>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import { useRoute } from "vue-router";
import { computed, toRefs } from "@vue/reactivity";
export default {
  components: { TIcon },
  props: {
    id: String,
    name: String,
    isLoading: {
      type: Boolean,
      default: false,
    },
    item: Object,
  },
  setup(props) {
    const { name } = toRefs(props);
    const route = useRoute();
    return {
      isItemSelected: computed(() => {
        return route.query.cluster == name.value ? true : false;
      }),
    };
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
