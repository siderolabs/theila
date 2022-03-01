// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ref, Ref, Component } from 'vue';
import TNotification from '@/components/common/Notification/TNotification.vue';

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
      type:'error',
      error: true,
    }
  }
};

export const showInfo = (title: string, body: string) => {
  modal.value = {
    component: TNotification,
    props: {
      title: title,
      body: body,
      type:'info',
      info: true,
    }
  }
};

export const showSuccess = (title: string, body: string) => {
  modal.value = {
    component: TNotification,
    props: {
      title: title,
      body: body,
      type:'success',
      success: true
    }
  }
};
export const showInProgress = (title: string, body: string, abort?: (()=>void) | null, isButtonHidden:Boolean = false) => {
  modal.value = {
    component: TNotification,
    props: {
      title: title,
      body: body,
      type: 'in-progress',
      buttonTitle: 'Abort',
      abort: abort,
      isButtonHidden: isButtonHidden,
    }
  }
};