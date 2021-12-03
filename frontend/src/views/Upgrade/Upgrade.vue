<template>
  <div class="upgrade">
    <t-upgrade-heading
      upgradeFrom="1.21.3-alpha.1"
      upgradeTo="1.21.4"
      duration="00:03:44"
      startedAt="08/01/2021, 12:17:58 PM PDT"
    />
    <t-input
      @input="getInputValue"
      class="uprgade__input"
      placeholder="Search Logs..."
      type="secondary"
    />
    <div class="upgrade__table">
      <div class="upgrade__table-heading">
        <p class="upgrade__table-title">Phase</p>
        <p class="upgrade__table-title">Pods updated</p>
        <p class="upgrade__table-title">Progress</p>
      </div>
      <t-upgrade-table-box
        v-for="(box, idx) in mockUpdatesData"
        :key="idx"
        :name="box.name"
        :label="box.status"
        :podsMax="box.podsMax"
        :podsUpdated="box.podsUpdated"
        :progressMaxValue="box.progressMaxValue"
        :progressCurrentValue="box.progressCurrentValue"
        :progressLogs="box.progressLogs"
        :logs="box.logs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TInput from "@/components/common/TInput/TInput.vue";
import TUpgradeHeading from "./components/TUpgradeHeading.vue";
import TUpgradeTableBox from "./components/TUpgradeTableBox/TUpgradeTableBox.vue";

export default {
  components: { TUpgradeHeading, TInput, TUpgradeTableBox },
  setup() {
    const getInputValue = (e) => {
      console.log(e);
    };
    // Remove data below after API installation
    const mockUpdatesData = [
      {
        status: "waiting",
        name: "kube-apiserver",
        podsMax: 10,
        podsUpdated: 4,
        progressMaxValue: 213,
        progressCurrentValue: 124,
        progressLogs: {
          title: "kube-scheduler",
          logs: [
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "loading",
            },
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "check-in-circle-classic",
            },
            {
              name: "coredns-6ff77786fb-zztkm",
              status: "time",
            },
          ],
        },
        logs: [
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
        ],
      },
      {
        status: "in-progress",
        name: "kube-apiserver",
        podsMax: 10,
        podsUpdated: 4,
        progressMaxValue: 213,
        progressCurrentValue: 0,
        logs: [
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
        ],
      },
      {
        status: "complete",
        name: "kube-apiserver",
        podsMax: 10,
        podsUpdated: 4,
        progressMaxValue: 213,
        progressCurrentValue: 64,
        progressLogs: {
          title: "kube-scheduler",
          logs: [
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "loading",
            },
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "check-in-circle-classic",
            },
            {
              name: "coredns-6ff77786fb-zztkm",
              status: "time",
            },
          ],
        },
        logs: [
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
        ],
      },
      {
        status: "attention",
        name: "kube-apiserver",
        podsMax: 10,
        podsUpdated: 4,
        progressMaxValue: 213,
        progressCurrentValue: 134,
        progressLogs: {
          title: "kube-scheduler",
          logs: [
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "loading",
            },
            {
              name: "aws-cloud-controller-manager-kmxtb",
              status: "check-in-circle-classic",
            },
            {
              name: "coredns-6ff77786fb-zztkm",
              status: "time",
            },
          ],
        },
        logs: [
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: false,
          },
          {
            date: "12/01/2021",
            time: "17:00:12",
            info: "user: warning:  [2021-10-04T10:10:54.140381769Z]: [talos] adjusting time (slew) by 107.94728ms via 198.199.75.250, state TIME_OK, status",
            isError: true,
          },
        ],
      },
    ];
    return {
      mockUpdatesData,
      getInputValue,
    };
  },
};
</script>

<style scoped>
.upgrade {
  @apply flex-col;
}
.uprgade__input {
  margin-bottom: 26px;
  width: 232px;
}
.upgrade__table {
  @apply w-full flex-col relative;
  z-index: 1;
}
.upgrade__table-heading {
  @apply w-full flex justify-between bg-naturals-N2 rounded-sm mb-3 relative;
  z-index: 10;
  padding: 10px 77px;
}
.upgrade__table::before {
  @apply bg-naturals-N4  absolute;
  content: "";
  display: block;
  z-index: 0;
  left: 15px;
  top: 0px;
  width: 1px;
  height: 62px;
}
.upgrade__table-title {
  @apply text-xs text-naturals-N13;
  flex-basis: 33.3%;
}
</style>
