<template>
  <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-9">
    <div class="tw-text-center">
      <img class="tw-inline-block" src="/images/sand-clock.svg" alt="icon" />
    </div>
    <div class="tw-text-center tw-max-w-[40ch] tw-space-y-2">
      <h4 class="tw-text-lg tw-text-black">
        The {{ title }} group has been created!
      </h4>
      <p class="tw-text-[#333333]">
        Your Ajo group has been successfully created. Invites has been sent to
        the emails of other participants and you will be notified when
        aparticipant accepts your invite.
      </p>
    </div>
    <Button
      @click="closeDialog"
      label="Alright!"
      size="medium"
      class="tw-w-full" />
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },

  props: {
    title: String,
  },

  methods: {
    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>

<style></style>
