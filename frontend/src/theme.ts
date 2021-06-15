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

export function isDark(mode: string): boolean {
  for(let i = 0; i < 2; i++) {
    switch(mode) {
      case "system":
        mode = systemTheme.value;
        break;
      case "dark":
        return true;
      case "light":
        return false;
    }
  }

  return false;
}

export { theme, systemTheme };
