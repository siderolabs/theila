<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div>
    <div v-if="loading" class="flex flex-row justify-center items-center w-full h-full">
      <t-spinner/>
    </div>
    <div v-else class="stacked-list">
      <div v-if="err" class="m-4 justify-center">{{ err }}</div>
      <div v-else-if="items.length == 0" class="m-4 justify-center">No Records</div>
      <template v-else>
        <ul>
          <li v-if="showCount && itemName">
            <div class="px-4 py-4 sm:px-6">
              {{ items.length }} {{ pluralize(itemName, items.length) }}
            </div>
          </li>
          <li v-if="$slots.header" class="table-header">
            <slot name="header"></slot>
          </li>
          <li
            v-for="item in items"
            :key="getID(item)"
            >
            <slot :item="item"></slot>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { context } from "../context";
import { Source, Kind, Message } from "../api/message";
import TSpinner from './TSpinner.vue';
import pluralize from 'pluralize';

@Options({
  components: {
    TSpinner,
  },

  props: {
    provider: Source,
    resource: String,
    namespace: String,
    context: Object,
    idField: String,
    showCount: Boolean,
    itemName: String,
  },

  data() {
    return {
      items: [],
      loading: false,
      err: null,
      watch: null,
    };
  },

  async unmounted() {
    await this.unsubscribe();
  },

  async mounted() {
    this.loading = false;
    this.err = null;

    await this.subscribe();
  },

  watch: { 
    async resource(newVal: string, oldVal: string) {
      if (newVal != oldVal)
        await this.subscribe();
    }
  },

  methods: {
    findIndex(obj) {
      return this.items.findIndex(element => this.getID(element) == this.getID(obj));
    },

    pluralize(noun, count) {
      return pluralize(noun, count);
    },

    async subscribe() {
      if (this.loading) {
        return;
      }

      if (this.resource) {
        this.loading = true;
      }

      try {
        await this.unsubscribe();
        if (this.resource) {
          this.err = null;

          this.watch = context.api.watch(this.provider, {type: this.resource, namespace: this.namespace}, this.context);

          await this.watch.start(this.updateList);
        }
      } catch (err) {
        this.err = err;
        this.watch = null;
      } finally {
        this.loading = false;
      }
    },

    async unsubscribe() {
      // stop watch
      if (this.watch) {
        await this.watch.stop();
        this.watch = null;
      }

      this.items = [];
    },

    getID(obj: any) {
      const parts = this.idField.split(".");

      let res = obj;
      for(let i = 0; i < parts.length - 1; i++) {
        res = obj[parts[i]];
        if(!res) {
          return null;
        }
      }

      return res[parts[parts.length-1]];
    },

    updateList(message: Message) {
      let index;
      if (!message.spec) {
        console.error("got a message with empty spec", message);

        return;
      }

      const spec = JSON.parse(message.spec);

      switch(message.kind) {
        case Kind.EventItemAdd:
          if(this.findIndex(spec) != -1) {
            return;
          }

          this.items.push(spec);
          break;
        case Kind.EventItemDelete:
          index = this.findIndex(spec);
          if(index == -1) {
            return;
          }
          this.items.splice(index, 1);
          break;
        case Kind.EventItemUpdate:
          index = this.findIndex(spec["old"]);
          if(index == -1) {
            return;
          }
          this.items[index] = spec["new"];
          break;
        case Kind.EventError:
          this.items = [];
          this.unsubscribe();
          this.err = spec;
      }
    }
  }
})
export default class StackedList extends Vue {}
</script>

<style>
.stacked-list {
  @apply flex flex-col w-full overflow-hidden bg-white border rounded-md border-talos-gray-300 dark:border-talos-gray-600 dark:bg-talos-gray-900 text-talos-gray-900 dark:text-talos-gray-100;
}

.stacked-list > ul {
  @apply divide-y divide-talos-gray-300 dark:divide-talos-gray-600;
}

li {
  @apply text-sm font-medium truncate text-talos-gray-900 dark:text-talos-gray-100;
}

.stacked-list .table-header > * {
  @apply flex items-center px-4 py-3 sm:px-6 min-w-0 md:grid md:gap-4 uppercase bg-talos-gray-100 dark:bg-talos-gray-700 text-talos-gray-500 dark:text-talos-gray-300;
}
</style>
