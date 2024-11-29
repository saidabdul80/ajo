<template>
  <PButton @click="navigateToStartAjo" icon="pi pi-plus" label="Start new Ajo" />
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
      this.$globals.to("/app/start");
    },
  },
};
</script>
