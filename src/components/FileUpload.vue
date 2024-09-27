<template>
  <div
    class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-h-[180px] tw-border tw-border-black tw-rounded-lg tw-border-dashed"
    @dragover.prevent
    @dragenter.prevent
    @drop="handleDrop"
    @click="triggerFileInput">
    <div class="tw-text-center tw-space-y-2">
      <img
        src="/images/cloud-add.svg"
        alt="upload icon"
        class="tw-inline-block" />
      <h5 class="tw-text-lg tw-text-black">Drag and drop or Click to upload</h5>
      <p class="tw-text-[#333333]">PDF, JPG or PNG file up to 20mb</p>
    </div>

    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      accept=".pdf,.jpg,.jpeg,.png,.gif"
      style="display: none" />
  </div>
  <div class="tw-flex tw-items-center tw-justify-between">
    <div class="tw-flex tw-items-center tw-gap-2">
      <img class="tw-inline-block" src="/images/attach-square.svg" alt="icon" />
      <p>{{ uploadDocumentName ? uploadDocumentName : "No file added" }}</p>
    </div>

    <button
      @click="clearUpload"
      v-if="uploadDocumentName"
      class="tw-text-[#D80027]">
      Remove
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadDocumentName: "",
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && this.isValidFileType(file)) {
        this.uploadFile(file);
      } else {
        alert("Invalid file type. Please upload a document.");
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && this.isValidFileType(file)) {
        this.uploadFile(file);
      } else {
        alert("Invalid file type. Please upload a document.");
      }
    },
    isValidFileType(file) {
      const validTypes = [
        // Document types
        "application/pdf",

        // Image types
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      return validTypes.includes(file.type);
    },
    uploadFile(file) {
      this.uploadDocumentName = file.name;

      if (file.type.startsWith("image/")) {
      }
    },

    clearUpload() {
      this.uploadDocumentName = "";
      this.$refs.fileInput.value = "";
    },
  },
};
</script>

<style scoped>
.drop-area {
  width: 100%;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
