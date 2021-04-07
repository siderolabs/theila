<template>
  <div>
    <div>
      <button type="button" class="
                            inline-flex 
                            justify-center 
                            w-full 
                            rounded-md
                            border
                            border-gray-500
                            shadow-sm
                            px-2
                            py-1
                            bg-gray-900
                            focus: bg-gray-750
                            text-sm
                            font-medium
                            text-gray-300
                            focus:outline-none
                            focus:border-gray-500" id="options-menu" aria-expanded="true" aria-haspopup="true" @click="open = !open">
        {{ selected }}
        <!-- Heroicon name: solid/chevron-down -->
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!--
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
    -->
    <div v-if="open" class="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div class="py-1" role="none">
        <a v-for="item in options" @click="select(item)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" v-bind:key="item">{{ item }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    options: Array,
  },
  
  data() {
    return {
      open: false,
      selected: this.options[0] || "none",
    }
  },

  methods: {
    select(item: any) {
      this.selected = item;
      this.open = false;
    }
  }
})
export default class Dropdown extends Vue {}
</script>
