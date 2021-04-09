<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

<template>
  <div v-if="loading" class="m-4 justify-center text-gray-300">Loading...</div>
  <div v-else class="border border-gray-500 rounded-md text-gray-300">
    <div v-if="err" class="m-4 justify-center text-gray-300">{{ err }}</div>
    <div v-else-if="items.length == 0" class="m-4 justify-center">No Records</div>
    <template v-else>
      <div class="m-3" v-for="item in items" v-bind:key="item.metadata.name">{{ item.metadata.name }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { context } from '../context';
import { Source, Kind, Message } from '../api/message';

@Options({
  props: {
    source: Source,
    resource: String,
    idField: String
  },

  data() {
    return {
      items: [],
      loading: false,
      err: null,
      watch: null,
    };
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

  async beforeDestroy() {
    await this.unsubscribe();
  },

  methods: {
    findIndex(obj) {
      return this.items.findIndex(element => this.getID(element) == this.getID(obj));
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

          this.watch = context.api.watch(this.source, this.resource);

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
      switch(message.kind) {
        case Kind.EventItemAdd:
          if(this.findIndex(message.spec) != -1) {
            return;
          }

          this.items.push(message.spec);
          break;
        case Kind.EventItemDelete:
          index = this.findIndex(message.spec);
          if(index == -1) {
            return;
          }
          this.items.splice(index, 1);
          break;
        case Kind.EventItemUpdate:
          index = this.findIndex(message.spec["old"]);
          if(index == -1) {
            return;
          }
          this.items[index] = message.spec["new"];
          break;
        case Kind.EventError:
          this.items = [];
          this.unsubscribe();
          this.err = message.spec;
      }
    }
  }
})
export default class ListView extends Vue {}
</script>
