// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ref, watch } from "vue";

const systemTheme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
const theme = ref(localStorage.theme || "system");

const match = window.matchMedia('(prefers-color-scheme: dark)');

if (match.addEventListener) {
  match.addEventListener('change', e => {
    systemTheme.value = e.matches ? "dark" : "light";
  });
}

watch(
  theme,
  (v) => {
    localStorage.theme = v;
  }
)

export { theme, systemTheme };
