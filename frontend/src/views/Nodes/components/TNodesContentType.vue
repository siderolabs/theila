<template>
  <ul class="content">
    <li class="content__item" :class="{ active: type === 'overview' }">
      <router-link
        :to="{ name: 'Overview', params: { node: ip }, query: getQuery() }"
      >
        Overview
      </router-link>
    </li>
    <li class="content__item" :class="{ active: type === 'monitor' }">
      <router-link
        :to="{ name: 'Monitor', params: { node: ip }, query: getQuery() }"
      >
        Monitor
      </router-link>
    </li>
    <li class="content__item" :class="{ active: type === 'dmesg' }">
      <router-link
        :to="{
          name: 'Logs',
          params: { node: ip, service: 'dmesg' },
          query: getQuery(),
        }"
      >
        Dmesg
      </router-link>
    </li>
  </ul>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  props: {
    type: {
      validator: function (value) {
        return ["overview", "monitor", "dmesg"].indexOf(value) !== -1;
      },
    },
    ip: String || Number,
  },
  setup() {
    const route = useRoute();
    const getQuery = () => {
      const query = {};

      if (route.query.cluster && route.query.namespace && route.query.uid) {
        query.cluster = route.query.cluster;
        query.namespace = route.query.namespace || "default";
        query.uid = route.query.uid;
      }

      return query;
    };
    return {
      getQuery,
    };
  },
};
</script>

<style scoped>
.content {
  @apply w-full border-b border-naturals-N4 flex;
  padding-bottom: 14px;
}
.content__item {
  @apply text-sm text-naturals-N9 mr-6;
}
.active {
  @apply text-naturals-N13 relative;
}
.active::before {
  @apply block absolute bg-primary-P3 w-full;
  content: "";
  height: 2px;
  bottom: -15px;
}
</style>
