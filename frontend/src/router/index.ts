// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWebHistory, createRouter } from "vue-router";
import Clusters from "../views/Clusters.vue";
import Servers from "../views/Servers.vue";
import Demo from "../views/Demo.vue";

const routes = [
  {
    path: "/",
    name: "Clusters",
    component: Clusters,
  },
  {
    path: "/servers",
    name: "Servers",
    component: Servers,
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
