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
    <form @submit.prevent="verifyEmail" v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">We sent a 6-digit code to {{ form.email }}. Please enter the code to verify your email address.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input placeholder="Your 6-digit code" v-model="form.otp" size="medium" />
        <Button type="submit" label="Submit" size="medium" class="tw-w-full" />
        <Button label="Resend code" size="medium" class="tw-w-full !tw-text-black" link />
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
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import eventBus from "@/eventBus";
import ConfirmPhoneDialog from "@/components/Dialog/ConfirmPhoneDialog.vue";

export default {
  components: {
    Button,
    ConfirmPhoneDialog,
    Input,
  },

  data() {
    return {
      currentStep: "confirm",
      form: {
        email: "",
        otp: "",
      },
    };
  },

  methods: {
    goToVerify() {
      this.currentStep = "verify";
    },

    verifyEmail() {
      this.currentStep = "verified";
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },

    openPhoneVerification() {
      eventBus.emit("open-dialog", {
        default: ConfirmPhoneDialog,
        position: "right",
      });
    },
  },
};
</script>

<style></style>
