<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Confirm Phone -->
    <div @submit.prevent v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Confirm phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Please, confirm your phone number before verification. A code will be sent to confirm you own the number.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <vue-tel-input
          v-model="form.phone"
          :dropdownOptions="{ showSearchBox: true, showFlags: true }"
          :inputOptions="{ showDialCode: true }"
          class="tw-w-full !tw-rounded-2xl tw-text-base tw-py-3 tw-h-[48px]">
          <template #arrow-icon>
            <img src="/images/arrow-down.svg" alt="Custom Icon" />
          </template>
        </vue-tel-input>
        <Button :loading="isCounting" @click="resendOTP" type="submit" label="Continue" size="medium" class="tw-w-full" :disabled="isCounting" />
      </div>
    </div>

    <!-- Verify Phone -->
    <form @submit.prevent v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">We sent a 6-digit code to {{ form.phone }}. Please enter the code to verify your phone number.</p>

      <div class="tw-space-y-3 tw-pt-4">
        <Input placeholder="Your 6-digit code" v-model="form.otp" size="medium" class="tw-mb-3" />
        <Button @click="verifyPhone" :loading="loading" type="submit" label="Submit" size="medium" class="tw-w-full" :disabled="loading || !form.otp" />
        <Button
          @click="resendOTP"
          :loading="isCounting"
          :label="isCounting ? `Resend (${timeLeft})` : 'Resend'"
          size="medium"
          class="tw-w-full !tw-text-black"
          :outlined="true"
          :disabled="isCounting" />
      </div>
    </form>

    <!-- Phone Verified -->
    <div v-if="currentStep === 'verified'" class="md:tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12 tw-text-center">
        <img src="/images/confirm-phone.svg" alt="icon" class="tw-inline-block tw-w-4/5 md:tw-w-full" />
        <h5 class="tw-text-[28px] tw-text-black">Number verified!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">You have successfully verified your phone number. You can proceed to upload a means of identification.</p>
      </div>
      <div class="tw-space-y-8">
        <Button @click="openUploadVerification" label="Upload means of identification" size="medium" class="tw-w-full" />
        <Button @click="openDialogWithContent" label="I’ll do it later." size="medium" class="tw-w-full !tw-text-black" link />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user.js";
import eventBus from "@/eventBus";
import UploadDialog from "@/components/Dialog/UploadDialog.vue";
import { useClient } from "@/stores/client";
import { useNotificationStore } from "@/stores/notification";
import { useGlobalsStore } from "@/stores/globals";
import useCountdown from "@/composable/useCountDown.js";

export default {
  components: {
    Button,
    Input,
    UploadDialog,
  },
  setup() {
    const currentStep = ref("confirm");
    const globalStore = useGlobalsStore();
    const userStore = useUserStore();
    const user = computed(() => userStore.user);
    const { timeLeft, isCounting, startCountdown } = useCountdown(30);

    const form = ref({
      phone: user?.value?.phone_number?.replaceAll(" ", "") || "",
      otp: "",
    });

    const loading = ref(false);

    const sendOTP = async () => {
      const res = await useClient().http({
        method: "post",
        path: "/resend_phone_number_verification",
        data: { phone_number: form.value.phone },
      });

      return res;
    };

    const resendOTP = async () => {
      const res = await sendOTP();

      if (res) {
        startCountdown();
        currentStep.value = "verify";
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "OTP sent successfully.",
        });
      }
    };

    const verifyPhone = async () => {
      if (!form.value.otp) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "error",
          message: "Please enter the 6-digit code.",
        });
        return;
      }

      const res = await useClient().http({
        method: "post",
        path: "/confirm_phone_number_verification",
        data: { phone_number: form.value.phone, otp: form.value.otp },
      });

      if (res) {
        currentStep.value = "verified";
        globalStore.bootstrap();
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Verified successfully.",
        });
      }
    };

    const openDialogWithContent = () => {
      eventBus.emit("close-dialog");
    };

    const openUploadVerification = () => {
      eventBus.emit("open-dialog", {
        default: UploadDialog,
        position: "right",
      });
    };

    return {
      currentStep,
      form,
      user,
      loading,
      resendOTP,
      verifyPhone,
      openDialogWithContent,
      openUploadVerification,
      timeLeft,
      isCounting,
    };
  },
};
</script>

<style>
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: black;
}

.vti__dropdown:hover {
  background-color: transparent;
}

.vti__flag {
  flex-shrink: 0;
}
</style>
