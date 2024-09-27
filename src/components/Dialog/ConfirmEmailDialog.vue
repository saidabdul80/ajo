<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Confirm Email -->
    <div v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Confirm email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Please, confirm your email address before verification. A code will be
        sent to confirm you own the email.
      </p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input placeholder="Email Address" v-model="form.email" size="medium" />
        <Button
          label="Continue"
          size="medium"
          class="tw-w-full"
          @click="goToVerify" />
      </div>
    </div>

    <!-- Verify Email -->
    <div v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify email address</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        We sent a 6-digit code to {{ form.email }}. Please enter the code to
        verify your email address.
      </p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input
          placeholder="Your 6-digit code"
          v-model="form.otp"
          size="medium" />
        <Button
          label="Submit"
          size="medium"
          class="tw-w-full"
          @click="verifyEmail" />
        <Button
          label="Resend code"
          size="medium"
          class="tw-w-full !tw-text-black"
          link />
      </div>
    </div>

    <!-- Email Verified -->
    <div v-if="currentStep === 'verified'" class="md:tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12">
        <img
          src="/images/mail-message.svg"
          alt="icon"
          class="tw-w-4/5 md:tw-w-full" />
        <h5 class="tw-text-[28px] tw-text-black">Email verified!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">
          Well done, Rhoda! You have successfully verified your email address.
          You can proceed to verify your phone number.
        </p>
      </div>
      <div class="tw-space-y-8">
        <Button label="Verify phone number" size="medium" class="tw-w-full" />
        <Button
          @click="openDialogWithContent"
          label="I’ll do it later."
          size="medium"
          class="tw-w-full !tw-text-black"
          link />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import eventBus from "@/eventBus";

export default {
  components: {
    Button,
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

    openDialogWithContent() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>

<style></style>
