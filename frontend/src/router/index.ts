// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWebHistory, createRouter } from "vue-router";
import Clusters from "../views/Clusters.vue";
import Servers from "../views/Servers.vue";
import Nodes from "../views/Nodes.vue";
import SidebarRoot from "../views/SidebarRoot.vue";
import SidebarCluster from "../views/SidebarCluster.vue";

const withPrefix = (prefix, routes) => 
    routes.map( (route) => {
        route.path = prefix + route.path;
        return route;
    });

const routes = [
  {
    path: "/",
    name: "Clusters",
    components: {
      default: Clusters,
      sidebar: SidebarRoot,
    },
  },
  {
    path: "/servers",
    name: "Servers",
    components: {
      default: Servers,
      sidebar: SidebarRoot,
    },
  },
  ...withPrefix("/:namespace/:cluster/:uid", [
    {
      path: "/nodes",
      name: "Nodes",
      components: {
        default: Nodes,
        sidebar: SidebarCluster,
      },
    }
  ]),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
