<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-9">
    <div class="tw-text-center">
      <img class="tw-inline-block" src="/images/sand-clock.svg" alt="icon" />
    </div>
    <div class="tw-text-center tw-max-w-[40ch] tw-space-y-2">
      <h4 class="tw-text-lg tw-text-black">
        Complete account set-up to start Ajo
      </h4>
      <p class="tw-text-[#333333]">
        Hi {{ userStore.full_name }}, you cannot start Ajo yet as you have not
        verified your email address and phone number.
      </p>
    </div>
    <Button
      @click="openDialogWithContent"
      label="Complete account set-up"
      size="medium"
      class="tw-w-full" />
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user.js";

import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import ConfirmEmailDialog from "@/components/Dialog/ConfirmEmailDialog.vue";

export default {
  components: {
    Button,
    ConfirmEmailDialog,
  },

  data() {
    return {
      userStore: useUserStore().user,
    };
  },

  methods: {
    openDialogWithContent() {
      eventBus.emit("open-dialog", {
        default: ConfirmEmailDialog,
        position: "right",
      });
    },
  },
};
</script>

<style></style>
