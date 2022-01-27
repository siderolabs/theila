<template>
  <div class="tag">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style scoped>
.tag {
  @apply bg-naturals-N4 rounded text-xs text-naturals-N9;
  word-break: break-all;
  padding: 4px 6px 4px 6px;
}
</style>
