<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="container-modal" v-if="view" @click.self="close">
    <div class="py-5">
      <div class="px-5">
        <h3 class="mb-2 text-lg leading-6 font-medium text-talos-gray-900 dark:text-talos-gray-100" id="modal-title">{{ view.title }}</h3>
      </div>
      <component :is="view.component"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { modals } from '../router';

@Options({
  data() {
    return {
      view: null,
    }
  },

  mounted() {
    this.updateState();
  },

  watch: {
    '$route'() {
      this.updateState();
    }
  },

  methods: {
    updateState() {
      const modal = this.$route.query.modal ? modals[this.$route.query.modal] : null;

      if(modal) {
        this.view = modal;
      } else {
        this.view = null;
      }
    },

    close() {
      this.$router.replace({ query: {
        modal: undefined,
      }});
    }
  }
})
export default class TModal extends Vue {}
</script>

<style scoped>
.container-modal {
  @apply fixed bg-talos-gray-200 dark:bg-black bg-opacity-50 dark:bg-opacity-50 w-screen h-screen flex items-center justify-center transition-all transition;
}

.container-modal > * {
  @apply align-middle w-full max-w-3xl bg-white dark:bg-talos-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform;
}
</style>
