<template>
  <div class="box__wrapper">
    <div class="box__inner">
      <div class="box">
        <t-slide-down-wrapper
          :maxHeight="600"
          :isSliderOpened="isDropdownOpened"
        >
          <template v-slot:head>
            <div class="box__heading">
              <t-label class="box__label" :iconType="label" />
              <div class="box__heading-wrapper">
                <t-icon
                  @click="() => (isDropdownOpened = !isDropdownOpened)"
                  class="box__arrow"
                  :class="{ 'box__arrow-right--pushed': isDropdownOpened }"
                  icon="drop-up"
                />
                <p
                  class="box__name"
                  :class="{ 'box__name--dark': progressCurrentValue === 0 }"
                >
                  {{ name }}
                </p>
              </div>
              <div class="box__amount-box">
                <span>{{ podsUpdated }}</span>
                <span>/</span>
                <span>{{ podsMax }}</span>
              </div>
              <t-progress-bar
                class="box__progress"
                :maxValue="progressMaxValue"
                :currentValue="progressCurrentValue"
                :progressLogs="progressLogs"
              />
            </div>
          </template>
          <template v-slot:body>
            <div class="box__logs">
              <t-system-log
                v-for="(log, idx) in logs"
                :key="idx"
                :date="log.date"
                :time="log.time"
                :info="log.info"
                :isError="log.isError"
              />
            </div>
          </template>
        </t-slide-down-wrapper>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TIcon from "@/components/common/Icon/TIcon.vue";
import TProgressBar from "@/components/common/ProgressBar/TProgressBar.vue";
import { ref } from "@vue/reactivity";
import TSystemLog from "@/components/common/SystemLog/TSystemLog.vue";
import TLabel from "@/components/common/Label/TLabel.vue";
import TSlideDownWrapper from "@/components/common/SlideDownWrapper/TSlideDownWrapper.vue";
export default {
  components: {
    TIcon,
    TProgressBar,
    TSystemLog,
    TLabel,
    TSlideDownWrapper,
  },
  props: {
    label: {
      validator(value: string) {
        return (
          ["complete", "attention", "in-progress", "waiting"].indexOf(value) !==
          -1
        );
      },
      default: "complete",
    },
    name: String,
    podsMax: Number,
    podsUpdated: Number,
    progressMaxValue: Number,
    progressCurrentValue: Number,
    progressLogs: Object,
    logs: Array,
  },
  setup() {
    const isDropdownOpened = ref(false);
    return {
      isDropdownOpened,
    };
  },
};
</script>

<style scoped>
.box__wrapper {
  @apply w-full;
  padding-left: 15px;
}
.box__inner {
  @apply border-l border-naturals-N4 pb-3;
  padding-left: 26px;
}
.box {
  @apply w-full border border-naturals-N5 rounded;
}
.box__heading {
  @apply w-full bg-naturals-N1 flex justify-between items-center border-b border-transparent relative;
  border-radius: 2.5px 2.5px 2.5px 2.5px;
  padding: 19px 16px 19px 8px;
}
.box__heading-wrapper {
  @apply flex items-center w-full;
  max-width: 36.5%;
}
.box__arrow {
  @apply fill-current text-naturals-N11 hover:bg-naturals-N7 transition-all rounded duration-300 cursor-pointer mr-1;
  transform: rotate(-180deg);
  width: 24px;
  height: 24px;
}
.box__arrow-right--pushed {
  transform: rotate(0deg);
}
.box__name {
  @apply text-xs text-naturals-N12;
}
.box__name--dark {
  @apply text-naturals-N9;
}
.box__amount-box {
  @apply text-xs text-naturals-N9 flex items-center pr-1;
  flex-grow: 1;
}
.box__progress {
  max-width: 35.3%;
}
.box__label {
  @apply absolute top-5;
  left: -38px;
}
.box__logs {
  @apply bg-naturals-N0;
  max-height: 424px;
  height: 100%;
  overflow-y: auto;
  border-radius: 0 0 2.5px 2.5px;
}
</style>
