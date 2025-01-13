import { computed, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";
import ConfirmEmailDialog from "@/components/Dialog/ConfirmEmailDialog.vue";
import ConfirmPhoneDialog from "@/components/Dialog/ConfirmPhoneDialog.vue";
import UploadDialog from "@/components/Dialog/UploadDialog.vue";
import { markRaw } from "vue";

export const useCurrentNotification = () => {
  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  const documentRequirements = reactive([
    { key: "nin_slip_url", name: "NIN Slip" },
    { key: "international_passport_url", name: "International Passport" },
  ]);

  const notifications = reactive([
    {
      state: () => !user.value.is_verified_email,
      message: "Verify your email address to explore Ajo by Cowris.",
      label: "Verify Email",
      dialog: markRaw(ConfirmEmailDialog),
    },
    {
      state: () => !user.value.is_verified_phone_number,
      message: "Verify your phone number to explore Ajo by Cowris.",
      label: "Verify Phone",
      dialog: markRaw(ConfirmPhoneDialog),
    },
    {
      state: () => !documentRequirements.some((doc) => user.value[doc.key]),
      message: "Upload your document to explore Ajo by Cowris.",
      label: "Upload Document",
      dialog: markRaw(UploadDialog),
    },
  ]);

  const currentNotification = computed(() => notifications.find((notification) => notification.state()));

  return {
    currentNotification,
    user,
  };
};
