<template>
  <t-animation>
    <div class="menu">
      <div class="menu__amount-box">
        <span class="menu__amount-box--light">{{ amountChecked }}</span>
        <span class="menu__amount-box--light">Clusters</span> selected
      </div>
      <div class="menu__buttons-box">
        <t-button class="menu__button" icon="delete" iconPosition="middle" />
        <t-button class="menu__button" icon="upload" iconPosition="left"
          >Upgrade Kubernetes</t-button
        >
        <t-icon class="menu__exit-button" icon="close" />
      </div>
    </div>
  </t-animation>
</template>

<script lang="ts">
import TAnimation from "@/components/common/Animation/TAnimation.vue";
import TButton from "@/components/common/Button/TButton.vue";
import TIcon from "@/components/common/Icon/TIcon.vue";

export default {
  components: { TAnimation, TButton, TIcon },
  props: {
    amountChecked: Number,
  },
};
</script>

<style scoped>
.menu {
  @apply bg-naturals-N3 p-5 fixed rounded z-20 flex justify-between;
  width: 452px;
  min-height: 56px;
  bottom: 32px;
  left: calc(50% - 226px);
}
.menu__amount-box {
  @apply text-xs text-naturals-N8 flex items-center;
}
.menu__amount-box--light {
  @apply text-naturals-N13 mr-1;
}
.menu__buttons-box {
  @apply flex items-center;
}
.menu__exit-button {
  @apply fill-current text-naturals-N7 w-6 h-6;
}
.menu__button:nth-child(1) {
  @apply fill-current text-red-R1;
}
.menu__button:nth-child(2) {
  @apply text-xs text-naturals-N12 fill-current hover:text-naturals-N14;
  min-width: 168px;
}
.menu__button {
  @apply mr-3;
}
.menu__exit-button {
  @apply fill-current text-naturals-N7 cursor-pointer transition-colors hover:text-naturals-N8 w-6 h-6;
}
</style>
