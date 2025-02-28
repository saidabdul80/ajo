<template>
  <form @submit.prevent="handlePasswordChange" v-if="currentStep === 0">
    <h5 class="tw-text-[28px] tw-text-black">Change password</h5>
    <p class="tw-text-[#586283] tw-max-w-[40ch]">Enter your current and new password.</p>
    <div class="tw-space-y-7 tw-pt-4">
      <Password :feedback="false" placeholder="Current password" v-model="form.currentPassword" :disabled="isLoading" />
      <Password :feedback="true" placeholder="New password" v-model="form.newPassword" :disabled="isLoading" />
      <Password :feedback="false" placeholder="Confirm new password" v-model="form.confirmNewPassword" :disabled="isLoading" />
      <Button type="submit" label="Update password" size="medium" class="tw-w-full" :loading="isLoading" :disabled="isLoading" />
    </div>
  </form>

  <form @submit.prevent="verifyOTP" v-else-if="currentStep === 1">
    <h5 class="tw-text-[28px] tw-text-black">Enter OTP for Password Change</h5>
    <p class="tw-text-[#586283] tw-max-w-[40ch]">Enter the one-time password sent to your email.</p>
    <div class="tw-space-y-7 tw-pt-4">
      <Input placeholder="Enter OTP" v-model="form.otp" :disabled="isVerifying" />
      <Button type="submit" label="Verify OTP" size="medium" class="tw-w-full" :loading="isVerifying" :disabled="isVerifying" />
    </div>
  </form>

  <div v-else-if="currentStep === 2">
    <div class="tw-space-y-4 tw-pb-12 tw-text-center">
      <div class="tw-max-w-[300px] tw-mx-auto">
        <img src="/images/protection.svg" alt="icon" class="tw-w-full" />
      </div>
      <h5 class="tw-text-[28px] tw-text-black">Password changed</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Your password has been successfully changed. You can log in with your new password.</p>
      <div class="tw-pt-7">
        <Button label="Log in" @click="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Password from "@/components/Password.vue";
import { useNotificationStore } from "@/stores/notification";
import { useClient } from "@/stores/client";

export default {
  components: {
    Button,
    Input,
    Password,
  },

  setup() {
    const currentStep = ref(0);
    const notificationStore = useNotificationStore();
    const isLoading = ref(false);
    const isVerifying = ref(false);

    const form = reactive({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      otp: "",
    });

    const handlePasswordChange = async () => {
      isLoading.value = true;

      try {
        if (!form.currentPassword) {
          notificationStore.showNotification({
            type: "error",
            message: "Please enter your current password",
          });
          return;
        }

        if (!form.newPassword) {
          notificationStore.showNotification({
            type: "error",
            message: "Please enter a new password",
          });
          return;
        }

        if (form.newPassword !== form.confirmNewPassword) {
          notificationStore.showNotification({
            type: "error",
            message: "New passwords do not match",
          });
          return;
        }

        const data = {
          password: form.newPassword,
          password_confirmation: form.confirmNewPassword,
          old_password: form.currentPassword,
        };

        const response = await useClient().http({
          method: "post",
          path: "/change_password",
          data: data,
        });

        if (response.status === 200 || response) {
          currentStep.value = 1;
        }
      } catch (error) {
        notificationStore.showNotification({
          type: "error",
          message: error.message || "Failed to change password",
        });
      } finally {
        isLoading.value = false;
      }
    };

    const verifyOTP = async () => {
      isVerifying.value = true;

      try {
        if (!form.otp) {
          notificationStore.showNotification({
            type: "error",
            message: "Please enter the OTP",
          });
          return;
        }

        const data = {
          password: form.newPassword,
          password_confirmation: form.confirmNewPassword,
          otp: form.otp,
        };

        const response = await useClient().http({
          method: "post",
          path: "/confirm_change_password",
          data: data,
        });

        if (response.status === 200 || response) {
          currentStep.value = 2;
        }
      } catch (error) {
        notificationStore.showNotification({
          type: "error",
          message: error.message || "Failed to verify OTP",
        });
      } finally {
        isVerifying.value = false;
      }
    };

    const handleLogin = () => {
      eventBus.emit("close-dialog");
      // Optionally redirect to login page
      // router.push('/login');
    };

    return {
      currentStep,
      form,
      isLoading,
      isVerifying,
      handlePasswordChange,
      verifyOTP,
      handleLogin,
    };
  },
};
</script>
