<!--
This Runtime Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->
<template>
  <div class="modal__wrapper" @click.self="close">
    <div class="modal">
      <div class="modal__heading">
        <h3 id="modal-title" class="modal__name">Reset the Node {{ node }}</h3>
        <t-icon class="modal__exit" icon="close" />
      </div>
      <p class="modal__subtitle">
        This operation will reset the EPHEMERAL partition on the node.
      </p>

      <div class="modal__buttons-box">
        <div class="modal__checkbox-wrapper">
          <t-checkbox
            class="modal__checkbox"
            @click="() => (graceful = !graceful)"
            :checked="graceful"
            label="Graceful"
          />
          <t-checkbox
            class="modal__checkbox"
            @click="() => (reboot = !reboot)"
            :checked="reboot"
            label="Reboot"
          />
        </div>
        <div class="modal__buttons-wrapper">
          <t-button @click="close" class="modal__button" type="secondary"
            >Cancel</t-button
          >
          <t-button
            @click="reset"
            :disabled="!node || state === 'Resetting'"
            class="modal__button"
            >{{ state }}</t-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "@/components/common/Button/TButton.vue";
import TCheckbox from "@/components/common/Checkbox/TCheckbox.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MachineService } from "@/api/grpc";
import { Runtime } from "@/api/common/theila.pb";
import { showError } from "@/modal";
import { getContext } from "@/context";

export default {
  components: {
    TButton,
    TCheckbox,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = ref("Reset");
    const graceful = ref(true);
    const reboot = ref(true);

    const close = () => {
      router.go(-1);
    };

    const context = getContext();
    context.nodes = [route.query.node as string];

    return {
      node: route.query.node,
      state,
      close,
      graceful,
      reboot,
      reset: async () => {
        state.value = "Resetting";

        try {
          const res = await MachineService.Reset(
            {
              reboot: reboot.value,
              graceful: graceful.value,
              systemPartitionsToWipe: [
                {
                  label: "EPHEMERAL",
                  wipe: true,
                },
              ],
            },
            {
              runtime: Runtime.Talos,
              context: context,
            }
          );

          const errors: string[] = [];
          for (const message of res.messages) {
            if (message.metadata.error)
              errors.push(
                `${message.metadata.hostname || route.query.node} ${
                  message.metadata.error
                }`
              );
          }

          if (errors.length > 0) throw new Error(errors.join(", "));

          close();
        } catch (e: any) {
          close();

          showError("Failed to Issue Reset", e.toString());
        }
      },
    };
  },
};
</script>

<style scoped>
.modal {
  @apply rounded bg-naturals-N2 p-8 z-30;
  width: 390px;
}
.modal__wrapper {
  @apply fixed top-0 bottom-0 left-0 right-0 w-full h-full flex justify-center items-center  z-30;
  background-color: rgba(16, 17, 24, 0.5);
}
.modal__heading {
  @apply flex justify-between items-center;
  margin-bottom: 13px;
}
.modal__name {
  @apply text-base text-naturals-N14;
}
.modal__subtitle {
  @apply text-xs text-naturals-N9;
  margin-bottom: 19px;
}
.modal__subtitle--light {
  @apply text-xs text-naturals-N13;
}
.modal__exit {
  @apply fill-current text-naturals-N7 cursor-pointer transition-colors hover:text-naturals-N8 w-6 h-6;
}
.modal__buttons-box {
  @apply flex justify-between w-full;
}
.modal__button:nth-child(1) {
  @apply mr-4;
}
.modal__checkbox:nth-child(1) {
  @apply mr-4;
}
.modal__checkbox-wrapper {
  @apply flex  items-center;
}
.modal__buttons-wrapper {
  @apply flex;
}
</style>
