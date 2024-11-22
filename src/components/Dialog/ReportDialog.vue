<template>
  <div class="tw-space-y-8 tw-pt-8" v-if="currentSlide">
    <div class="tw-space-y-2">
      <h2 class="tw-text-2xl tw-text-[#000000]">Report an issue</h2>
      <p class="tw-text-[#586283]">Let us know if there is an issue with the transaction.</p>
    </div>

    <Textarea v-model="message" autoResize rows="8" cols="30" class="tw-w-full tw-text-base !tw-border-[#AAB2CC] !tw-rounded-2xl !tw-p-3" placeholder="Give detailed report here..." />

    <div>
      <Button label="Submit Report" @click="handleReport" />
      <Button label="Cancel" color="link" @click="closeDialog" />
    </div>
  </div>

  <div v-else>
    <div class="tw-space-y-2 tw-pb-12 tw-text-center">
      <img src="/images/report.svg" alt="icon" class="tw-inline-block tw-w-4/5 md:tw-w-full" />
      <h5 class="tw-text-[28px] tw-text-black">Report submitted!</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">We are so sorry you had to face the issue. Our support team has received your report. They will check and they will reach out to you soon.</p>
    </div>

    <Button label="Alright !" class="tw-w-full" @click="closeDialog" />
  </div>
</template>
<script>
import eventBus from "@/eventBus";
import Textarea from "primevue/textarea";
import Button from "@/components/Button.vue";

export default {
  components: {
    Textarea,
    Button,
  },

  data() {
    return {
      message: "",
      currentSlide: true,
    };
  },

  methods: {
    closeDialog() {
      eventBus.emit("close-dialog");
    },

    handleReport() {
      this.currentSlide = false;
    },
  },
};
</script>

<style>
.p-popover:before {
  display: none;
}
</style>
