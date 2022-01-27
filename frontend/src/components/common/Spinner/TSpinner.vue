<template>
  <div class="lds-dual-ring"></div>
</template>
<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 32px;
  height: 32px;
  margin: 4px;
  border-radius: 50%;
  border: 3px solid #ff5f2a;
  border-color: #ff5f2a transparent #ff5f2a transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
