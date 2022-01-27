<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="container-modal" v-if="view">
    <component :is="view" v-bind="props" />
  </div>
</template>

<script lang="ts">
import { watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { modals } from "../router";
import { modal } from "../modal";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const view = ref(null);
    const props = ref({});

    const updateState = () => {
      if (modal.value) {
        view.value = modal.value.component;
        props.value = modal.value.props || {};

        return;
      }

      props.value = {};
      view.value = route.query.modal
        ? modals[route.query.modal as string]
        : null;
    };

    watch(
      () => route.query.modal,
      () => {
        if (route.query.modal) modal.value = null;

        updateState();
      }
    );

    // modals which do not need to be tied to the URI
    watch(modal, () => {
      updateState();
    });

    updateState();

    return {
      view,
      props,
      close() {
        router.go(-1);
      },
    };
  },
};
</script>

<style scoped>
.container-modal {
  @apply z-20 flex justify-center items-center;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.container-modal > * {
  @apply align-middle  rounded-lg text-left;
}
</style>
