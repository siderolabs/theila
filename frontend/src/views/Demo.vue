<template>
  <div class="space-y-2">
    <div class="px-3 py-2 mb-2">
      <h1 class="text-lg tracking-tight text-talos-gray-900 dark:text-white font-bold">Components Demo</h1>
    </div>
    <div class="space-x-4 space-y-2">
      <t-button primary>Primary Button</t-button>
      <t-button>Secondary Button</t-button>
      <t-button>
        <span>Close</span>
        <x-circle-icon class="w-4 h-4"/>
      </t-button>
      <t-input placeholder="Input example"/>
    </div>
    <div class="space-x-4 space-y-2">
      <t-button primary small>Primary Button</t-button>
      <t-button small>Secondary Button</t-button>
      <t-spinner class="inline-block"/>
    </div>
  </div>
</template>

<script type="ts">
import { Options, Vue } from 'vue-class-component';
import StackedList from '../components/StackedList.vue';
import TButton from "../components/TButton.vue";
import TInput from "../components/TInput.vue";
import TSpinner from "../components/TSpinner.vue";
import {
  CheckCircleIcon,
  DotsHorizontalIcon,
  XCircleIcon
} from '@heroicons/vue/solid';

@Options({
  components: {
    StackedList,
    CheckCircleIcon,
    DotsHorizontalIcon,
    XCircleIcon,
    TButton,
    TInput,
    TSpinner,
  },

  data() {
    return {
      options: [
        "Kubernetes",
        "Talos",
      ],
    };
  }
})
export default class Demo extends Vue{}
</script>
