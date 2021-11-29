// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWebHistory, createRouter } from "vue-router";
import Clusters from "../views/Clusters.vue";
import Servers from "../views/Servers.vue";
import Nodes from "../views/cluster/Nodes.vue";
import Pods from "../views/cluster/Pods.vue";
import Overview from "../views/node/Overview.vue";
import Monitor from "../views/node/Monitor.vue";
import Logs from "../views/node/Logs.vue";
import SidebarRoot from "../views/SidebarRoot.vue";
import SidebarCluster from "../views/SidebarCluster.vue";
import SidebarNode from "../views/SidebarNode.vue";
import TSidebarNodesLogs from "../components/views/SideBar/components/TSideBarNodesLogs.vue";
import Settings from "../views/Settings.vue";
import Reboot from "../views/Reboot.vue";
import Reset from "../views/Reset.vue";
import Upgrade from "../views/Upgrade.vue";
import { useRoute } from "vue-router";
import { context } from "../context";

const withPrefix = (prefix, routes) =>
  routes.map((route) => {
    route.path = prefix + route.path;
    return route;
  });

export function getBreadcrumbs(route) {
  const crumbs: Object[] = [];

  if (
    route.query &&
    route.query.cluster &&
    route.query.uid &&
    route.query.namespace
  ) {
    crumbs.push({
      text: "Clusters",
      to: "/clusters",
    });
  }

  if (route.params.node) {
    crumbs.push({
      text: `${route.query.cluster ||
        (context.current.value
          ? context.current.value.cluster
          : "Current Cluster")} Nodes`,
      to: { name: "Nodes", query: route.query },
    });
  }

  return crumbs;
}

export function getSidebar(route) {
  if (route.params.node) {
    return SidebarNode;
  }

  if (route.query.cluster && route.query.uid && route.query.namespace) {
    return SidebarCluster;
  }

  return SidebarRoot;
}

export function getTSideBarNodesLogs(route) {
  if (route.params.node) {
    return TSidebarNodesLogs;
  }
}

const routes = [
  {
    path: "/",
    name: "Nodes",
    components: {
      default: Nodes,
    },
  },
  {
    path: "/pods",
    name: "Pods",
    components: {
      default: Pods,
    },
  },
  {
    path: "/clusters",
    name: "Clusters",
    components: {
      default: Clusters,
    },
  },
  {
    path: "/servers",
    name: "Servers",
    components: {
      default: Servers,
    },
  },
  {
    path: "/upgrade",
    name: "Upgrade Kubernetes",
    components: {
      default: Servers,
    },
  },
  {
    path: "/overview",
    name: "Overview",
    components: {
      default: Servers,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: {
      default: Servers,
    },
  },
  ...withPrefix("/node/:node", [
    {
      path: "/overview",
      name: "Overview",
      components: {
        default: Overview,
      },
    },
    {
      path: "/monitor",
      name: "Monitor",
      components: {
        default: Monitor,
      },
    },
    {
      path: "/logs/:service",
      name: "Logs",
      components: {
        default: Logs,
      },
    },
  ]),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const modals = {
  settings: Settings,
  reboot: Reboot,
  upgrade: Upgrade,
  reset: Reset,
};

export { modals };
export default router;
