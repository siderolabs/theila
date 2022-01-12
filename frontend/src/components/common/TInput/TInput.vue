<template>
  <label
    @click.prevent="
      () => {
        isFocused = true;
        $refs.input.focus();
      }
    "
    v-click-outside="() => (isFocused = false)"
    class="input-box"
    :class="[type, { focused: isFocused }]"
  >
    <t-icon class="input-box__icon" icon="search" />
    <input
      @input="() => $emit('input', inputValue)"
      ref="input"
      v-model="inputValue"
      type="text"
      class="input-box__input"
      @focus="isFocused = true"
      @blur="blurHandler"
      :placeholder="placeholder"
    />
    <div class="input-box__icon-wrapper" @click.prevent="clearInput">
      <t-icon
        v-if="type === 'secondary'"
        :class="{ SVGHidden: !isFocused }"
        class="input-box__icon-close"
        icon="close"
      />
    </div>
  </label>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import TIcon from "../Icon/TIcon.vue";
import vClickOutside from "click-outside-vue3";

export default {
  components: { TIcon },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    placeholder: String,
    type: {
      validator(value: string) {
        return ["primary", "secondary"].indexOf(value) !== -1;
      },
      default: "primary",
    },
  },
  setup(props, context) {
    const isFocused = ref(false);
    const inputValue = ref("");
    const input = ref(null);
    const clearInput = () => {
      inputValue.value = "";
      context.emit("clearInput", inputValue.value);
    };
    const blurHandler = () => {
      isFocused.value = false;
    };
    return {
      isFocused,
      inputValue,
      clearInput,
      input,
      blurHandler,
    };
  },
};
</script>

<style scoped>
.input-box {
  @apply flex justify-start items-center p-2 border border-naturals-N8 rounded h-8 transition-all;
}
.input-box__icon {
  @apply fill-current text-naturals-N8 mr-2 transition-all cursor-pointer;
  min-width: 16px;
  height: 16px;
}
.input-box__icon-close {
  @apply fill-current text-naturals-N8 transition-all cursor-pointer;
  height: 16px;
}
.input-box__input {
  @apply bg-transparent border-none outline-none w-full text-naturals-N13 focus:outline-none  focus:border-transparent text-xs transition-all placeholder-naturals-N8;
}
.input-box__icon-wrapper {
  min-width: 16px;
}
.secondary {
  @apply border-transparent;
}
.secondary .input-box__input {
  width: 80%;
}
.focused {
  @apply border border-solid border-naturals-N5 pr-2;
}
.focused .input-box__icon {
  @apply text-naturals-N14;
  min-width: 16px;
  height: 16px;
}
.SVGHidden {
  visibility: hidden;
}
</style>
