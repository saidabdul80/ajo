<template>
  <div :class="[currentStep !== 'verified' && 'tw-pt-28']">
    <!-- Confirm Phone -->
    <div v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Enter phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Add your phone number to complete account set-up. A code will be sent to
        confirm you own the phone number.
      </p>
      <div class="tw-space-y-8">
        <!-- <Input
          class="tw-mb-5"
          placeholder="Email Address" 
          v-model="form.phone"
          size="medium" /> -->
        <vue-tel-input
          :dropdownOptions="{ showSearchBox: true, showFlags: true }"
          :inputOptions="{ showDialCode: true }"
          class="tw-w-full !tw-rounded-2xl tw-text-base tw-py-3 tw-h-[54px]">
          <template #arrow-icon>
            <img src="/images/arrow-down.svg" alt="Custom Icon" />
          </template>
        </vue-tel-input>
        <Button
          label="Continue"
          size="medium"
          class="tw-w-full"
          @click="goToVerify" />
      </div>
    </div>

    <!-- Verify Phone -->
    <div v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Add your phone number to complete account set-up. aWe sent a 6-digit
        code to {{ form.phone }}. Please enter the code to verify your phone
        number.
      </p>
      <div class="tw-space-y-8">
        <Input
          placeholder="Your 6-digit code"
          v-model="form.otp"
          size="medium" />
        <Button
          label="Submit"
          size="medium"
          class="tw-w-full"
          @click="verifyPhone" />
        <Button
          label="Resend code"
          size="medium"
          class="tw-w-full !tw-text-black"
          link />
      </div>
    </div>

    <!-- Phone Verified -->
    <div v-if="currentStep === 'verified'" class="tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12 tw-text-center">
        <img
          src="/images/confirm-phone.svg"
          alt="icon"
          class="tw-inline-block" />
        <h5 class="tw-text-[28px] tw-text-black">Number verified!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">
          You have successfully verified your phone number. You can proceed to
          upload a means of identification.
        </p>
      </div>
      <div class="tw-space-y-8">
        <Button
          @click="handlerUpload"
          label="Upload means of identification"
          size="medium"
          class="tw-w-full" />
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
        phone: "",
        otp: "",
      },
    };
  },

  methods: {
    goToVerify() {
      this.currentStep = "verify";
    },

    verifyPhone() {
      this.currentStep = "verified";
    },

    openDialogWithContent() {
      eventBus.emit("close-dialog");
    },

    handlerUpload() {
      this.$emit("change-view", "upload");
    },
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
