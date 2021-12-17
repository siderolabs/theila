<template>
  <t-animation>
    <div v-show="isModalOpen" class="modal">
      <div class="modal__overlay" />
      <div class="modal__box">
        <div class="modal__heading">
          <h3 class="modal__name">Install ClusterAPI</h3>
          <t-icon
            class="modal__exit"
            icon="close"
            @click="$emit('onPressExitButton')"
          />
        </div>
        <p class="modal__subtitle">Choose Provider:</p>
        <RadioGroup class="modal__providers-list" v-model="provider">
          <RadioGroupOption v-slot="{ checked }" value="AWS">
            <div
              class="modal__provider-box"
              :class="{ 'modal__provider-box--checked': checked }"
            >
              <t-icon icon="aws" />
              <p class="modal__provider-name">AWS</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" value="GCP">
            <div
              class="modal__provider-box"
              :class="{ 'modal__provider-box--checked': checked }"
            >
              <t-icon icon="gcp" />
              <p class="modal__provider-name">GCP</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" value="sidero">
            <div
              class="modal__provider-box"
              :class="{ 'modal__provider-box--checked': checked }"
            >
              <t-icon icon="sidero" />
              <p class="modal__provider-name">Sidero</p>
            </div>
          </RadioGroupOption>
        </RadioGroup>
        <div class="modal__buttons-box">
          <t-button
            @click="$emit('onPressCancelButton')"
            class="modal__button"
            type="secondary"
            >Cancel</t-button
          >
          <t-button
            @click.prevent="$emit('onPressContinueButton', provider)"
            class="modal__button"
            :disabled="!provider"
            >Continue</t-button
          >
        </div>
      </div>
    </div>
  </t-animation>
</template>

<script lang="ts">
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { ref } from "@vue/reactivity";
import TButton from "@/components/common/Button/TButton.vue";
export default {
  components: {
    TAnimation,
    TIcon,
    RadioGroup,
    RadioGroupOption,
    TButton,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const provider = ref("");

    return {
      provider,
    };
  },
};
</script>

<style scoped>
.modal {
  @apply h-screen flex justify-center items-center z-50;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.modal__overlay {
  @apply w-full h-full bg-naturals-N0 opacity-70 z-0 absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.modal__box {
  @apply p-8 bg-naturals-N2 rounded opacity-100 z-10;
  min-width: 390px;
  min-height: 283px;
}
.modal__heading {
  @apply flex justify-between items-center;
  margin-bottom: 13px;
}
.modal__name {
  @apply text-base text-naturals-N14;
}
.modal__subtitle {
  @apply text-xs text-naturals-N9;
  margin-bottom: 11px;
}
.modal__exit {
  @apply fill-current text-naturals-N7 cursor-pointer transition-colors hover:text-naturals-N8 w-6 h-6;
}
.modal__providers-list {
  @apply flex justify-between items-center;
  margin-bottom: 26px;
}
.modal__provider-box {
  @apply rounded  border border-naturals-N5 flex flex-col justify-center items-center cursor-pointer transition-all;
  width: 100px;
  height: 100px;
  margin-bottom: 6px;
}
.modal__provider-box--checked {
  @apply border-naturals-N8 bg-naturals-N3;
}
.modal__provider-name {
  @apply text-xs text-naturals-N14;
}

.modal__buttons-box {
  @apply flex justify-end w-full;
}
.modal__button:nth-child(1) {
  @apply mr-4;
}
</style>
