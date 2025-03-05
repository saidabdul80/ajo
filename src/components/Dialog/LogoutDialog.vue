<template>
  <div class="tw-text-center">
    <h2 class="tw-text-2xl tw-font-medium tw-text-black">Log out</h2>
    <p clas="tw-text-[#333333] tw-pt-4">Are you sure you want to log out?</p>

    <div class="tw-flex tw-flex-col tw-gap-5 tw-pt-8">
      <Button label="Yes, log out" color="danger" @click="logout" />
      <Button label="No, go back" color="link" @click="closeDialog" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import { useAuthStore } from "@/stores/auth.js";

export default {
  components: {
    Button,
  },

  setup() {
    const authStore = useAuthStore();

    const closeDialog = () => {
      eventBus.emit("close-dialog");
    };

    const logout = () => {
      closeDialog();
      authStore.logout();
    };

    return {
      logout,
      closeDialog,
    };
  },
};
</script>
