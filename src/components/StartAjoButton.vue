<template>
  <div class="Xl:tw-max-w-[170px] tw-w-full">
    <PButton @click="navigateToStartAjo" icon="pi pi-plus" label="Start new Ajo" />
  </div>
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
      if (user.value.is_verified_email && user.value.is_verified_phone_number && (user.value.drivers_license_url || user.value.international_passport_url || user.value.nin_slip_url)) {
        globals.to("/app/start");
        return;
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
