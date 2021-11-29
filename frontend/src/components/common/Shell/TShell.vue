<template>
  <div class="shell">
    <div class="shell__menu">
      <slot name="menu"></slot>
    </div>
    <div class="shell__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.shell {
  @apply w-full h-auto flex bg-naturals-N0;
  min-height: calc(100vh - 52px);
}
.shell__content {
  @apply flex justify-start items-start w-full px-6 py-7;
}
</style>
