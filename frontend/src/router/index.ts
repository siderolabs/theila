// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWebHistory, createRouter } from "vue-router";
import Clusters from "../views/Clusters.vue";
import Servers from "../views/Servers.vue";
import Nodes from "../views/cluster/Nodes.vue";
import Pods from "../views/cluster/Pods.vue";
import Services from "../views/node/Services.vue";
import SidebarRoot from "../views/SidebarRoot.vue";
import SidebarCluster from "../views/SidebarCluster.vue";
import SidebarNode from "../views/SidebarNode.vue";

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
      meta: {
        breadcrumbs: [
          { text: "Clusters", to: "/" },
        ]
      }
    },
    {
      path: "/pods",
      name: "Pods",
      components: {
        default: Pods,
        sidebar: SidebarCluster,
      },
      meta: {
        breadcrumbs: [
          { text: "Clusters", to: "/" },
        ]
      }
    }
  ]),
  ...withPrefix("/:namespace/:cluster/:uid/node/:node", [
    {
      path: "/services",
      name: "Services",
      components: {
        default: Services,
        sidebar: SidebarNode,
      },
      meta: {
        breadcrumbs: [
          { text: "Clusters", to: "/" },
          { text: "{cluster} Nodes", to: "/{namespace}/{cluster}/{uid}/nodes" },
        ]
      }
    }
  ]),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
