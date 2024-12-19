<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Confirm Email -->
    <form @submit.prevent="goToVerify" v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Confirm email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Please, confirm your email address before verification. A code will be sent to confirm you own the email.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input placeholder="Email Address" v-model="form.email" size="medium" />
        <Button type="submit" label="Continue" size="medium" class="tw-w-full" />
      </div>
    </form>

    <!-- Verify Email -->
    <form @submit.prevent v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">We sent a 6-digit code to {{ form.email }}. Please enter the code to verify your email address.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input placeholder="Your 6-digit code" v-model="form.otp" size="medium" />
        <Button @click="completeVerification" type="submit" label="Submit" size="medium" class="tw-w-full" />
        <Button @click="sendCode" label="Resend code" size="medium" class="tw-w-full !tw-text-black" link />
      </div>
    </form>

    <!-- Email Verified -->
    <div v-if="currentStep === 'verified'" class="md:tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12">
        <img src="/images/mail-message.svg" alt="icon" class="tw-w-4/5 md:tw-w-full" />
        <h5 class="tw-text-[28px] tw-text-black">Email verified!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">Well done, {{ user.first_name }} ! You have successfully verified your email address. You can proceed to verify your phone number.</p>
      </div>
      <div class="tw-space-y-8">
        <Button @click="openPhoneVerification" label="Verify phone number" size="medium" class="tw-w-full" />
        <Button @click="closeDialog" label="I’ll do it later." size="medium" class="tw-w-full !tw-text-black" link />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import eventBus from "@/eventBus";
import ConfirmPhoneDialog from "@/components/Dialog/ConfirmPhoneDialog.vue";
import { useClient } from "@/stores/client";
import { useUserStore } from "@/stores/user.js";
import { useNotificationStore } from "@/stores/notification";

export default {
  components: {
    Button,
    ConfirmPhoneDialog,
    Input,
  },

  setup() {
    const userStore = useUserStore();
    const client = useClient();
    const notificationStore = useNotificationStore();
    const user = computed(() => userStore.user);

    const currentStep = ref("confirm");
    const form = reactive({
      email: userStore.user.email,
      otp: "",
    });

    const sendCode = async () => {
      const res = await client.http({ method: "post", path: "/resend_email_verification", data: { email: form.email } });

      if (res) {
        notificationStore.showNotification({
          type: "success",
          message: "Email Sent successfully.",
        });

        return;
      }
      notificationStore.showNotification({
        type: "error",
        message: "Email was not sent successfully. Please try again.",
      });
    };

    const goToVerify = () => {
      currentStep.value = "verify";
      sendCode();
    };

    const completeVerification = async () => {
      const res = await client.http({
        method: "get",
        path: "/verify_email",
        data: { email: userStore.user.email, token: form.otp },
      });
      if (res) {
        currentStep.value = "verified";
      }
    };

    const closeDialog = () => {
      eventBus.emit("close-dialog");
    };

    const openPhoneVerification = () => {
      eventBus.emit("open-dialog", {
        default: ConfirmPhoneDialog,
        position: "right",
      });
    };

    return {
      currentStep,
      form,
      user,
      sendCode,
      goToVerify,
      completeVerification,
      closeDialog,
      openPhoneVerification,
    };
  },
};
</script>

<style></style>
