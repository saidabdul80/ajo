<template> 
    <PButton
    @click="navigateToStartAjo"
    icon="pi pi-plus"
    label="Start new Ajo" /> 
</template>

<script>
import { useUserStore } from "@/stores/user.js";

import PButton from "@/components/Button.vue";
import PendingVerificationDialog from "./Dialog/PendingVerificationDialog.vue";

export default {
  name: "Header",
  components: {
    PButton,
    PendingVerificationDialog,
  },
  data() {
    return {
      userStore: useUserStore(),
    };
  },

  methods: {
    navigateToStartAjo() {
      const { is_verified_email, is_verified_phone_number } =
        this.userStore.user;

      if (!is_verified_email && is_verified_phone_number) {
      } else {
        this.$globals.to("start");
        // eventBus.emit("open-dialog", {
        //   default: PendingVerificationDialog,
        //   title: "Pending verifications...",
        //   position: "center",
        // });
      }
    },
  }
};
</script>
