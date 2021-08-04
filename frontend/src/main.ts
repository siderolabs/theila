// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import "@stardazed/streams-polyfill";
import { createApp } from 'vue';
import './index.css';
import App from './App.vue'
import { Vue } from 'vue-property-decorator';
import router from './router';

createApp(App).use(router).mount('#app')
