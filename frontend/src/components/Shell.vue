<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="flex flex-row w-screen h-screen font-sans antialiased bg-white dark:bg-talos-gray-900 text-talos-gray-900 dark:text-white">
    <div class="flex flex-col justify-between flex-none h-full py-2 select-none bg-talos-gray-200 w-72 dark:bg-talos-gray-800">
      <slot name="menu"></slot>
    </div>
    <div class="flex flex-col w-full h-full bg-white dark:bg-talos-gray-900 py-2 px-4">
      <slot name="content"></slot>
    </div>
  </div>
</template>
