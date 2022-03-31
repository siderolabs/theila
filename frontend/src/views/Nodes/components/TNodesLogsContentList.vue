<template>
  <div class="logs__list">
    <div class="logs__list-heading">
      <div class="logs__list-heading-wrapper">
        <p v-if="isDateColVisible" class="logs__list-heading-name">Date</p>
        <p v-if="isTimeColVisible" class="logs__list-heading-name">Time</p>
        <p class="logs__list-heading-name">Message</p>
      </div>
      <div class="logs__list-checkbox">
        <t-checkbox
          label="Follow Logs"
          :checked="follow"
          @click="() => (follow = !follow)"
        />
      </div>
    </div>
    <ul
      class="logs__view"
      :class="{ 'logs__view--short': $route.params.service === 'dmesg' }"
      ref="logView"
    >
      <li class="logs__item" v-for="(log, index) in filteredLogs" :key="index">
        <div v-if="isDateColVisible" class="logs__item-date">
          {{ log.date }}
        </div>
        <div v-if="isTimeColVisible" class="logs__item-time">
          {{ log.time }}
        </div>
        <div class="logs__item-message">
          <WordHighlighter
            :query="searchOption"
            :textToHighlight="log.message"
            :highlightStyle="{ 'background-color': 'white' }"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import TCheckbox from "@/components/common/Checkbox/TCheckbox.vue";
import { computed, ref, toRefs } from "@vue/reactivity";
import { onMounted, onUpdated, watch } from "@vue/runtime-core";
import WordHighlighter from "vue-word-highlighter";

export default {
  components: {
    TCheckbox,
    WordHighlighter,
  },
  props: {
    logs: Array,
    searchOption: String,
  },
  setup(props) {
    const follow = ref(true);
    const logView: any = ref(null);
    const { searchOption, logs } = toRefs(props);
    const scrollToBottom = () => {
      if (!logView.value || !follow.value) return;
      logView.value.scrollTop = logView.value.scrollHeight;
    };
    const filteredLogs = computed(() => {
      const filteredItems =
        searchOption.value?.length === 0
          ? logs.value
          : logs?.value?.filter((elem: any) => {
              return elem?.includes(searchOption.value);
            });
      return filteredItems!.map((item: any) => {
        return {
          date:
            // eslint-disable-next-line no-useless-escape
            item.match(/(\d{4})(\/|\-)(\d{2})(\/|\-)(\d{2})/) === null
              ? ""
              : // eslint-disable-next-line no-useless-escape
                item.match(/(\d{4})(\/|\-)(\d{2})(\/|\-)(\d{2})/)[0],
          time:
            // eslint-disable-next-line no-useless-escape
            item.match(/(\d{2})(\:)(\d{2})(\:)(\d{2})/) === null
              ? ""
              : // eslint-disable-next-line no-useless-escape
                item.match(/(\d{2})(\:)(\d{2})(\:)(\d{2})/)[0],
          message: item,
        };
      });
    });

    onMounted(scrollToBottom);
    onUpdated(scrollToBottom);
    watch(follow, scrollToBottom);
    return {
      follow,
      logView,
      filteredLogs,
      isDateColVisible: computed(() => {
        return filteredLogs.value
          .map((item: any) => {
            return item.date === "" ? false : true;
          })
          .includes(true);
      }),
      isTimeColVisible: computed(() => {
        return filteredLogs.value
          .map((item: any) => {
            return item.time === "" ? false : true;
          })
          .includes(true);
      }),
    };
  },
};
</script>

<style scoped>
.logs__list {
  @apply flex flex-col;
  flex-grow: 1;
}
.logs__list-heading {
  @apply flex w-full bg-naturals-N2 justify-between items-center;
  padding: 10px 16px;
  border-radius: 2px;
}
.logs__list-heading-wrapper {
  @apply flex w-full;
}
.logs__list-heading-name {
  @apply text-xs text-naturals-N13 w-full;
  min-width: 10%;
  max-width: 100px;
}
.logs__view {
  @apply flex flex-col w-full;
  flex-grow: 1;
  padding-bottom: 0px;
  height: 100px;
  overflow: auto;
}

.logs__item {
  @apply flex w-full;
  padding: 5px 0px 5px 16px;
}
.logs__item-date {
  @apply text-xs text-naturals-N9 font-roboto w-full;
  min-width: 9.5%;
  max-width: 100px;
}
.logs__item-time {
  @apply text-xs text-naturals-N9 font-roboto w-full;
  min-width: 9.5%;
  max-width: 100px;
}
.logs__item-message {
  @apply w-full text-xs text-naturals-N9 font-roboto break-all;
}
</style>
