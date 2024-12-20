<template>
  <PButton @click="navigateToStartAjo" icon="pi pi-plus" label="Start new Ajo" />
</template>

<script>
import { computed } from "vue";
import eventBus from "@/eventBus";
import { useUserStore } from "@/stores/user.js";
import { useGlobalsStore } from "@/stores/globals.js";

import PButton from "@/components/Button.vue";
import PendingVerificationDialog from "./Dialog/PendingVerificationDialog.vue";

export default {
  name: "Start Ajo",
  components: {
    PButton,
    PendingVerificationDialog,
  },
  setup() {
    const globals = useGlobalsStore();

    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const navigateToStartAjo = () => {
      if (user.is_verified_email && user.is_verified_phone_number && (user.drivers_license_url || user.international_passport_url || user.nin_slip_url)) {
        globals.to("/app/start");
      }

      eventBus.emit("open-dialog", {
        default: PendingVerificationDialog,
        title: "Pending Verification",
        position: "center",
      });
    };

    return {
      userStore,
      navigateToStartAjo,
    };
  },
};
</script>
