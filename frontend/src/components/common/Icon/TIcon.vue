<!--
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

<template>
  <component :is="getIcon"></component>
</template>
<script>
import { defineAsyncComponent } from "vue";
const getName = (name) => `icon-${name}`;
export default {
  name: "Icon",
  props: {
    icon: {
      type: String,
      default: "action-horizontal",
    },
  },
  components: {
    [getName("action-horizontal")]: defineAsyncComponent(() =>
      import("../../icons/IconActionHorizontal.vue")
    ),
    [getName("dropdown")]: defineAsyncComponent(() =>
      import("../../icons/IconDropdown.vue")
    ),
    [getName("cloud-connection")]: defineAsyncComponent(() =>
      import("../../icons/IconCloudConnection.vue")
    ),
    [getName("arrow-right-square")]: defineAsyncComponent(() =>
      import("../../icons/IconArrowRightSquare.vue")
    ),
    [getName("box")]: defineAsyncComponent(() =>
      import("../../icons/IconBox.vue")
    ),
    [getName("minus")]: defineAsyncComponent(() =>
      import("../../icons/IconMinus.vue")
    ),
    [getName("plus")]: defineAsyncComponent(() =>
      import("../../icons/IconPlus.vue")
    ),
    [getName("loading")]: defineAsyncComponent(() =>
      import("../../icons/IconLoading.vue")
    ),
    [getName("check-in-circle")]: defineAsyncComponent(() =>
      import("../../icons/IconCheckInCircle.vue")
    ),
    [getName("upload")]: defineAsyncComponent(() =>
      import("../../icons/IconUpload.vue")
    ),
    [getName("arrow-down")]: defineAsyncComponent(() =>
      import("../../icons/IconArrowDown.vue")
    ),
    [getName("arrow-up")]: defineAsyncComponent(() =>
      import("../../icons/IconArrowUp.vue")
    ),
    [getName("arrow-right")]: defineAsyncComponent(() =>
      import("../../icons/IconArrowRight.vue")
    ),
    [getName("long-arrow-top")]: defineAsyncComponent(() =>
      import("../../icons/IconLongArrowTop.vue")
    ),
    [getName("long-arrow-down")]: defineAsyncComponent(() =>
      import("../../icons/IconLongArrowDown.vue")
    ),
    [getName("copy")]: defineAsyncComponent(() =>
      import("../../icons/IconCopy.vue")
    ),
    [getName("delete")]: defineAsyncComponent(() =>
      import("../../icons/IconDelete.vue")
    ),
    [getName("settings")]: defineAsyncComponent(() =>
      import("../../icons/IconSettings.vue")
    ),
    [getName("close")]: defineAsyncComponent(() =>
      import("../../icons/IconClose.vue")
    ),
    [getName("error")]: defineAsyncComponent(() =>
      import("../../icons/IconError.vue")
    ),
    [getName("info")]: defineAsyncComponent(() =>
      import("../../icons/IconInfo.vue")
    ),
    [getName("check-in-circle-classic")]: defineAsyncComponent(() =>
      import("../../icons/IconCheckInCircleClassic.vue")
    ),
    [getName("overview")]: defineAsyncComponent(() =>
      import("../../icons/IconOverview.vue")
    ),
    [getName("nodes")]: defineAsyncComponent(() =>
      import("../../icons/IconNodes.vue")
    ),
    [getName("podes")]: defineAsyncComponent(() =>
      import("../../icons/IconPodes.vue")
    ),
    [getName("clusters")]: defineAsyncComponent(() =>
      import("../../icons/IconClusters.vue")
    ),
    [getName("dot")]: defineAsyncComponent(() =>
      import("../../icons/IconDot.vue")
    ),
    [getName("time")]: defineAsyncComponent(() =>
      import("../../icons/IconTime.vue")
    ),
    [getName("drop-up")]: defineAsyncComponent(() =>
      import("../../icons/IconDropUp.vue")
    ),
    [getName("search")]: defineAsyncComponent(() =>
      import("../../icons/IconSearch.vue")
    ),
    [getName("pin")]: defineAsyncComponent(() =>
      import("../../icons/IconPin.vue")
    ),
    [getName("arrow-left")]: defineAsyncComponent(() =>
      import("../../icons/IconArrowLeft.vue")
    ),
    [getName("check")]: defineAsyncComponent(() =>
      import("../../icons/IconCheck.vue")
    ),
    [getName("cube-config")]: defineAsyncComponent(() =>
      import("../../icons/IconCubeConfig.vue")
    ),
    [getName("talos-config")]: defineAsyncComponent(() =>
      import("../../icons/IconTalosConfig.vue")
    ),
    [getName("kubernetes")]: defineAsyncComponent(() =>
      import("../../icons/IconKubernetes.vue")
    ),
    [getName("edit")]: defineAsyncComponent(() =>
      import("../../icons/IconEdit.vue")
    ),
    [getName("unlink")]: defineAsyncComponent(() =>
      import("../../icons/IconUnlink.vue")
    ),
    [getName("refresh")]: defineAsyncComponent(() =>
      import("../../icons/IconRefresh.vue")
    ),
    [getName("long-arrow-left")]: defineAsyncComponent(() =>
      import("../../icons/IconLongArrowLeft.vue")
    ),
    [getName("long-arrow-right")]: defineAsyncComponent(() =>
      import("../../icons/IconLongArrowRight.vue")
    ),
    [getName("warning-clear")]: defineAsyncComponent(() =>
      import("../../icons/IconWarningClear.vue")
    ),
    [getName("dashboard")]: defineAsyncComponent(() =>
      import("../../icons/IconDashboard.vue")
    ),
    [getName("reset")]: defineAsyncComponent(() =>
      import("../../icons/IconReset.vue")
    ),
    [getName("reboot")]: defineAsyncComponent(() =>
      import("../../icons/IconReboot.vue")
    ),
    [getName("change")]: defineAsyncComponent(() =>
      import("../../icons/IconChange.vue")
    ),
    [getName("action-vertical")]: defineAsyncComponent(() =>
      import("../../icons/IconActionVertical.vue")
    ),
    [getName("ongoing-tasks")]: defineAsyncComponent(() =>
      import("../../icons/IconOngoingTasks.vue")
    ),
     [getName("header-logo")]: defineAsyncComponent(() =>
      import("../../icons/IconHeaderLogo.vue")
    ),
     [getName("home")]: defineAsyncComponent(() =>
      import("../../icons/IconHome.vue")
    ),
  },
  computed: {
    getIcon() {
      return getName(this.icon);
    },
  },
};
</script>
