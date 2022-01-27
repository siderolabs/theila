// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { createWebHistory, createRouter } from "vue-router";
import Clusters from "../views/Clusters.vue";
import Servers from "../views/Servers/TServers.vue";
import Dashboard from "../views/Dashboard/TDashboard.vue";
import TKubernetes from "../views/Kubernetes/TKubernetes.vue";
import TUpgradeKubernetesModal from '@/components/views/TUpgradeKubernetesModal/TUpgradeKubernetesModal.vue';
import Nodes from "../views/Nodes/TNodes.vue";
import Pods from "../views/cluster/Pods.vue";
import TPods from "../views/Pods/TPods.vue";
import Overview from "../views/Nodes/TNodesOverview.vue";
import OverviewPage from "../views/Overview/Overview.vue";
import Monitor from "../views/Nodes/TNodesMonitor.vue";
import Logs from "../views/Nodes/TNodesLogs.vue";
import SidebarRoot from "../views/SidebarRoot.vue";
import SidebarCluster from "../views/SidebarCluster.vue";
import SidebarNode from "../views/SidebarNode.vue";
import TSidebarNodesLogs from "../components/views/SideBar/components/TSideBarNodesLogs.vue";
import Settings from "../views/Settings.vue";
import TReboot from "../components/views/Reboot/TReboot.vue";
import TReset from "../components/views/Reset/TReset.vue";
import Upgrade from "../views/Upgrade.vue";
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
    crumbs.push(
      {
        text: `All Nodes`,
        to: { name: "Nodes", query: route.query },
      },
      {
        text: `${route.params.node}`,
        to: { name: "Overview", query: route.query },
      }
    );
  }
  if (route.params.service) {
    crumbs.push({
      text: `${route.params.service} Logs`,
      to: { name: "Logs", query: route.query },
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
      default: TPods,
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
      default: TKubernetes,
    },
  },
  {
    path: "/overview",
    name: "OverviewPage",
    components: {
      default: OverviewPage,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: {
      default: Dashboard,
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
  reboot: TReboot,
  upgrade: TUpgradeKubernetesModal,
  reset: TReset,
};

export { modals };
export default router;
