<template>
  <div :class="[currentStep !== 'verified' && 'tw-pt-28']">
    <!-- Select Documnent -->
    <div v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">
        Select a means of identification
      </h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        You will need to upload the selected document. Make sure the document is
        readily available.
      </p>
      <div class="tw-space-y-8 tw-pt-7">
        <div class="tw-flex tw-flex-col tw-gap-4">
          <div class="tw-flex tw-items-center">
            <RadioButton
              v-model="uploadDocument"
              inputId="NIN"
              name="document"
              value="NIN"
              variant="filled" />
            <label for="NIN" class="tw-ml-2"
              >National Identification Number (NIN) Slip</label
            >
          </div>
          <div class="tw-flex tw-items-center">
            <RadioButton
              v-model="uploadDocument"
              inputId="internationalPassport"
              name="document"
              value="internationalPassport"
              variant="filled" />
            <label for="internationalPassport" class="tw-ml-2"
              >International passport</label
            >
          </div>
          <div class="tw-flex tw-items-center">
            <RadioButton
              v-model="uploadDocument"
              inputId="utilityBill"
              name="document"
              value="utilityBill"
              variant="filled" />
            <label for="utilityBill" class="tw-ml-2">Utility bill</label>
          </div>
        </div>
        <Button
          label="Continue"
          size="medium"
          class="tw-w-full"
          :disabled="!uploadDocument"
          @click="goToVerify" />
      </div>
    </div>

    <!-- Document Upload -->
    <div v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">{{ documentName }} Slip</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Upload your document here.
      </p>
      <div class="tw-space-y-8 tw-py-10">
        <FileUpload />
        <Button
          label="Continue"
          size="medium"
          class="tw-w-full"
          @click="verifyDocument" />
      </div>
    </div>

    <!-- Document Uploaded -->
    <div v-if="currentStep === 'verified'" class="tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12 tw-text-center">
        <img src="/images/account-set.svg" alt="icon" class="tw-inline-block" />
        <h5 class="tw-text-[28px] tw-text-black">Account set-up completed!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">
          You’re done! You have successfully completed all verifications. You
          can start exploring Ajo by Cowris.
        </p>
      </div>
      <div class="tw-space-y-8">
        <Button
          @click="openDialogWithContent"
          label="Alright"
          size="medium"
          class="tw-w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import FileUpload from "@/components/FileUpload.vue";
import eventBus from "@/eventBus";
import RadioButton from "primevue/radiobutton";

export default {
  components: {
    Button,
    Input,
    RadioButton,
    FileUpload,
  },

  data() {
    return {
      currentStep: "confirm",
      uploadDocument: "",
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

    verifyDocument() {
      this.currentStep = "verified";
    },

    openDialogWithContent() {
      eventBus.emit("close-dialog");
    },
  },

  computed: {
    documentName() {
      switch (this.uploadDocument) {
        case "NIN":
          return "NIN";
          break;
        case "internationalPassport":
          return "International Passport";

        default:
          return "Utility Bill";
          break;
      }
    },
  },
};
</script>

<style scoped></style>
