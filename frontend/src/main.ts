// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createApp } from 'vue'
import App from './App.vue'
import { Vue } from 'vue-property-decorator';

import { CategoryServiceFactory,CategoryConfiguration,LogLevel } from "typescript-logging";

CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

createApp(App).mount('#app')
