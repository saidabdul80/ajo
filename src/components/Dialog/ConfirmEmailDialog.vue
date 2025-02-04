<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Verify Email -->
    <form @submit.prevent v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">We sent a 6-digit code to {{ form.email }}. Please enter the code to verify your email address.</p>
      <div class="tw-space-y-3 tw-pt-4">
        <Input placeholder="Your 6-digit code" v-model="form.otp" size="medium" class="tw-mb-3" />
        <Button :loading="loading" @click="completeVerification" type="submit" label="Submit" size="medium" class="tw-w-full" :disabled="loading" />
        <Button
          @click="globals.sendCode()"
          :loading="globals?.sendCodeLoading"
          label="Resend code"
          size="medium"
          class="tw-w-full !tw-text-black"
          :outlined="true"
          :disabled="globals?.sendCodeLoading" />
      </div>
    </form>

    <!-- Email Verified -->
    <div v-if="currentStep === 'verified'" class="md:tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12">
        <img src="/images/mail-message.svg" alt="icon" class="tw-w-4/5 md:tw-w-full" />
        <h5 class="tw-text-[28px] tw-text-black">Email verified!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">Well done, Rhoda! You have successfully verified your email address. You can proceed to verify your phone number.</p>
      </div>
      <div class="tw-space-y-8">
        <Button @click="openPhoneVerification" label="Verify phone number" size="medium" class="tw-w-full" />
        <Button @click="closeDialog" label="I’ll do it later." size="medium" class="tw-w-full !tw-text-black" link />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import eventBus from "@/eventBus";
import ConfirmPhoneDialog from "@/components/Dialog/ConfirmPhoneDialog.vue";

import { useClient } from "@/stores/client";
import { useUserStore } from "@/stores/user.js";
import { useGlobalsStore } from "@/stores/globals";

export default {
  components: {
    Button,
    ConfirmPhoneDialog,
    Input,
  },

  setup() {
    const globals = useGlobalsStore();
    const clientStore = useClient();
    const loading = ref(false);
    const user = computed(() => useUserStore().user);

    const currentStep = ref("verify");
    const form = ref({
      email: user.value.email || "",
      otp: "",
    });

    const completeVerification = async () => {
      loading.value = true;
      const res = await clientStore.http({
        method: "get",
        path: "/verify_email",
        data: {
          email: form.value.email,
          token: form.value.otp,
        },
      });
      loading.value = false;
      if (res) {
        globals.bootstrap();
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

    onMounted(() => {
      globals.sendCode();
    });

    return {
      currentStep,
      form,
      loading,
      globals,
      completeVerification,
      closeDialog,
      openPhoneVerification,
    };
  },
};
</script>
