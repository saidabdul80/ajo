<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Confirm Phone -->
    <div v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Enter phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Add your phone number to complete account set-up. A code will be sent to confirm you own the phone number.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <vue-tel-input v-model="form.phone" :dropdownOptions="{ showSearchBox: true, showFlags: true }" :inputOptions="{ showDialCode: true }" class="tw-w-full !tw-rounded-2xl tw-text-base tw-py-3 tw-h-[48px]">
          <template #arrow-icon>
            <img src="/images/arrow-down.svg" alt="Custom Icon" />
          </template>
        </vue-tel-input>
        <Button :loading="loaidng" label="Continue" size="medium" class="tw-w-full" @click="goToVerify" />
      </div>
    </div>

    <!-- Verify Phone -->
    <form @submit.prevent="verifyPhone" v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Verify phone number</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Add your phone number to complete account set-up. aWe sent a 6-digit code to {{ form.phone }}. Please enter the code to verify your phone number.</p>
      <div class="tw-space-y-8 tw-pt-4">
        <Input placeholder="Your 6-digit code" v-model="form.otp" size="medium" />
        <Button  :loading="loaidng" type="submit" label="Submit" size="medium" class="tw-w-full" />
        <Button  label="Resend code" size="medium" class="tw-w-full !tw-text-black" link />
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
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import eventBus from "@/eventBus";
import UploadDialog from "@/components/Dialog/UploadDialog.vue";
import { useClient } from "@/stores/client";
import { useNotificationStore } from "@/stores/notification";

export default {
  components: {
    Button,
    Input,
    UploadDialog,
  },

  data() {
    return {
      currentStep: "confirm",
      form: {
        phone: "",
        otp: "",
      },
      loaidng: false,
    };
  },

  methods: {
    goToVerify() {
      if(!this.form.phone || this.form.phone.length < 10){
         const notificationStore = useNotificationStore();
         notificationStore.showNotification({
           type: "error",
           message: "Please enter Phone number. or length too short",
         });
        return;
      }
      this.loaidng = true;

      const res = useClient().http({method:'post', path:'/resend_phone_number_verification', data: {phone_number:this.form.phone?.replaceAll(' ','')}}) 
      this.loaidng = false
      if(res){
        this.currentStep = "verify";
        const notificationStore = useNotificationStore();
         notificationStore.showNotification({
           type: "success",
           message: "OTP sent successfully.",
         });
      }
    },

    verifyPhone() {
      if(!this.form.otp){
         const notificationStore = useNotificationStore();
         notificationStore.showNotification({
           type: "error",
           message: "Please enter the 6-digit code.",
         });
        return;
      }
      this.loaidng = true;
      const res = useClient().http({method:'post', path:'/confirm_phone_number_verification', data: {phone_number:this.form.phone?.replaceAll(' ',''), otp:this.form.otp}})
      this.loaidng = false
      if(res){
        this.currentStep = "verified";
        const notificationStore = useNotificationStore();
         notificationStore.showNotification({
           type: "success",
           message: "Verified successfully.",
         });
      }
    },

    openDialogWithContent() {
      eventBus.emit("close-dialog");
    },

    openUploadVerification() {
      eventBus.emit("open-dialog", {
        default: UploadDialog,
        position: "right",
      });
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
