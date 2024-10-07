<template>
  <div v-if="currentStep">
    <h2 class="tw-text-2xl tw-text-black tw-font-medium">
      Request to swap slot
    </h2>
    <div class="tw-space-y-2 tw-pt-4 tw-text-base">
      <p>Your current slot is {{ slotNumber }}.</p>
      <p class="tw-text-[#586283]">
        Select the number you’ll like to swap it with. You will be notified when
        the participant accepts or rejects.
      </p>
    </div>

    <div
      class="tw-flex tw-item-center tw-gap-5 sm:tw-justify-between tw-flex-wrap tw-my-10">
      <label
        v-for="(option, index) in options"
        :for="`option-${index}`"
        :key="index"
        :class="[
          'tw-h-[50px] tw-w-[50px] tw-inline-flex tw-justify-center tw-items-center tw-text-lg tw-text-black tw-cursor-pointer tw-border tw-border-[#AAB2CC] tw-rounded-2xl',
          option === slotNumber
            ? 'tw-opacity-50 tw-cursor-not-allowed tw-bg-[#AAB2CC]'
            : option === selectedOption
            ? 'tw-bg-black tw-text-white'
            : '',
        ]">
        {{ option }}
        <input
          type="radio"
          name="swapSlot"
          class="tw-hidden"
          :id="`option-${index}`"
          :value="option"
          v-model="selectedOption"
          :disabled="option === slotNumber" />
      </label>
    </div>

    <Button
      label="Send request"
      @click="submitRequest"
      :disabled="!selectedOption" />
  </div>

  <div v-else class="md:tw-pt-4 tw-text-center">
    <div class="tw-space-y-3 tw-pb-12 tw-text-center">
      <img
        src="/images/slotsent.svg"
        alt="icon"
        class="tw-inline-block tw-w-4/5 md:tw-w-full" />
      <h5 class="tw-text-[28px] tw-text-black">Request sent!</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Your request to swap slot has been sent. You will be notified when the
        participant accepts or rejects.
      </p>
    </div>
    <Button label="Alright!" @click="closeDialog" />
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },

  data() {
    return {
      currentStep: true,
      slotNumber: 2,
      options: [1, 2, 3, 4, 5, 6, 7],
      selectedOption: null,
    };
  },

  methods: {
    submitRequest() {
      if (this.selectedOption) {
        this.currentStep = false;
      }
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>
