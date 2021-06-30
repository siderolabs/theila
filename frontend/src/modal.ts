// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ref, Ref, Component } from 'vue';
import TNotification from './components/TNotification.vue';

export type Modal = {
  component: Component,
  props?: Object,
};

export const modal: Ref<any> = ref(null);

export const showError = (title: string, body: string) => {
  modal.value = {
    component: TNotification,
    props: {
      title: title,
      body: body,
      error: true,
    }
  }
};
