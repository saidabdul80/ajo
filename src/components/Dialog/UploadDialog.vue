<template>
  <div :class="[currentStep !== 'verified' && 'md:tw-pt-28']">
    <!-- Select Document -->
    <div v-if="currentStep === 'confirm'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">Select a means of identification</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">You will need to upload the selected document. Make sure the document is readily available.</p>
      <div class="tw-space-y-8 tw-pt-7">
        <div class="tw-flex tw-flex-col tw-gap-4">
          <div class="tw-flex tw-flex-col tw-items-start tw-gap-5" v-for="document in filteredDocumentTypes" :key="document.value">
            <div>
              <RadioButton v-model="uploadDocument" :inputId="document.name" name="document" :value="document.value" variant="filled" />
              <label :for="document.name" class="tw-ml-2">{{ document.name }}</label>
              <a v-if="user?.[document.type + '_url']" target="_blank" class="tw-text-[blue]/60 tw-ms-3 hover:tw-underline" :href="user?.[document.type + '_url']">View</a>
            </div>

            <Input v-if="document.value === 7 && uploadDocument === 7" placeholder="Please, specify here..." v-model="customDocumentName" />
          </div>
        </div>
        <Button label="Continue" size="medium" class="tw-w-full" :disabled="!uploadDocument" @click="goToVerify" />
      </div>
    </div>

    <!-- Document Upload -->
    <div v-if="currentStep === 'verify'" class="tw-space-y-2 tw-pb-12">
      <h5 class="tw-text-[28px] tw-text-black">{{ uploadDocument === 7 ? customDocumentName : documentName }} Slip</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Upload your document here.</p>
      <div class="tw-space-y-8 tw-py-10">
        <FileUpload v-model="file" />
        <Button :loading="loading" label="Continue" size="medium" class="tw-w-full" @click="verifyDocument" :disabled="loading" />
      </div>
    </div>

    <!-- Document Uploaded -->
    <div v-if="currentStep === 'verified'" class="md:tw-pt-10 tw-text-center">
      <div class="tw-space-y-2 tw-pb-12 tw-text-center">
        <img src="/images/account-set.svg" alt="icon" class="tw-inline-block tw-w-4/5 md:tw-w-full" />
        <h5 class="tw-text-[28px] tw-text-black">Account set-up completed!</h5>
        <p class="tw-text-[#586283] tw-max-w-[40ch]">You’re done! You have successfully completed all verifications. You can start exploring Ajo by Cowris.</p>
      </div>
      <div class="tw-space-y-8">
        <Button @click="closeDialog" label="Alright" size="medium" class="tw-w-full" />
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import FileUpload from "@/components/FileUpload.vue";
import RadioButton from "primevue/radiobutton";
import { useClient } from "@/stores/client";
import { useUserStore } from "@/stores/user.js";
export default {
  components: {
    Button,
    Input,
    RadioButton,
    FileUpload,
  },

  data() {
    return {
      loading: false,
      user: useUserStore().user,
      currentStep: "confirm",
      uploadDocument: "",
      customDocumentName: "",
      userCountry: "Nigeria",
      file: null,
      fileType: null,
      uploadDocumentTypes: [
        { type: "nin_slip", name: "National Identification Number (NIN) Slip", value: 1, countries: ["Nigeria"] },
        { type: "international_passport", name: "International Passport", value: 2, countries: ["Canada", "Nigeria"] },
        { type: "utility_bills", name: "Utility Bills", value: 3, countries: ["Nigeria"] },
        { type: "drivers_license", name: "Driver's License", value: 4, countries: ["Canada"] },
        { type: "permanent_residence_card", name: "Permanent Residence Card", value: 5, countries: ["Canada"] },
        { type: "proof_of_address", name: "Proof of Address", value: 6, countries: ["Canada"] },
        { type: "others", name: "Others", value: 7, countries: ["Canada"] },
      ],
    };
  },

  computed: {
    filteredDocumentTypes() {
      return this.uploadDocumentTypes.filter((doc) => !doc.countries || doc.countries.includes(this.userCountry));
    },

    documentName() {
      const selected = this.uploadDocumentTypes.find((doc) => doc.value === this.uploadDocument);
      this.fileType = selected ? selected.type : null;
      return selected ? selected.name : "";
    },
  },

  methods: {
    goToVerify() {
      if (this.uploadDocument === 7 && !this.customDocumentName) {
        alert("Please specify the document name.");
        return;
      }
      this.currentStep = "verify";
    },

    async verifyDocument() {
      if (!this.file) {
        alert("Please upload a document.");
        return;
      }
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("id", useUserStore().user.id);
      formData.append("type", this.fileType);
      this.loading = true;
      const res = await useClient().http({ method: "post", path: "/upload_documents", data: formData });
      this.loading = false;
      setTimeout(() => {
        this.$router.go();
      }, 1000);
      if (res) {
        this.currentStep = "verified";
      }
      this.currentStep = "verified";
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>
