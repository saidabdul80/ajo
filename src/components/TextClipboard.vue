<template>
  <div class="tw-flex tw-items-center tw-gap-2">
    <p class="tw-tex-base tw-text-black tw-font-semibold">{{ text }}</p>

    <button @click="copyToClipboard" v-if="!copySuccess" class="tw-w-8 tw-h-8">
      <img src="/images/copy.svg" class="tw-inline-block" alt="copy" />
    </button>

    <p v-if="copySuccess" class="tw-w-8 tw-h-8">
      <img
        src="/images/double-tick.svg"
        class="tw-inline-block"
        alt="copy"
        width="100%" />
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copySuccess: "",
    };
  },
  props: {
    text: {
      type: String,
      require: true,
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard
        .writeText(this.text)
        .then(() => {
          this.copySuccess = "Text copied to clipboard!";

          setTimeout(() => {
            this.copySuccess = "";
          }, 2000);
        })
        .catch(() => {
          this.copySuccess = "Failed to copy text.";
        });
    },
  },
};
</script>

<style></style>
