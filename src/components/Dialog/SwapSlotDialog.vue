<template>
  <div v-if="currentStep">
    <h2 class="tw-text-2xl tw-text-black tw-font-medium">Request to swap slot</h2>
    <div class="tw-space-y-2 tw-pt-4 tw-text-base">
      <p>Your current slot is {{ slotNumber }}.</p>
      <p class="tw-text-[#586283]">Select the number you’ll like to swap it with. You will be notified when the participant accepts or rejects.</p>
    </div>

    <div class="tw-flex tw-item-center tw-gap-5 tw-flex-wrap tw-my-10 tw-overflow-y-auto tw-max-h-[500px]">
      <label
        v-for="(option, index) in options"
        :for="`option-${index}`"
        :key="index"
        :class="[
          'tw-h-[50px] tw-w-[50px] tw-inline-flex tw-justify-center tw-items-center tw-text-lg tw-text-black tw-cursor-pointer tw-border tw-border-[#AAB2CC] tw-rounded-2xl',
          option === slotNumber ? 'tw-opacity-50 tw-cursor-not-allowed tw-bg-[#AAB2CC]' : option === selectedOption ? 'tw-bg-black tw-text-white' : '',
        ]">
        {{ option }}
        <input type="radio" name="swapSlot" class="tw-hidden" :id="`option-${index}`" :value="option" v-model="selectedOption" :disabled="option === slotNumber" />
      </label>
    </div>

    <Button :label="btn" @click="submitRequest" :disabled="!selectedOption || isLoading" :loading="isLoading" />
  </div>

  <div v-else class="md:tw-pt-4 tw-text-center">
    <div class="tw-space-y-3 tw-pb-12 tw-text-center">
      <img src="/images/slotsent.svg" alt="icon" class="tw-inline-block tw-w-4/5 md:tw-w-full" />
      <h5 class="tw-text-[28px] tw-text-black">Request sent!</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Your request to swap slot has been sent. You will be notified when the participant accepts or rejects.</p>
    </div>
    <Button label="Alright!" @click="closeDialog" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";

export default {
  components: { Button },
  props: {
    btn: { type: String, default: "Send request" },
    slotNumber: { type: Number, default: null },
    totalSlots: { type: Number, default: 0 },
  },

  setup(props) {
    const currentStep = ref(true);
    const selectedOption = ref(null);
    const isLoading = ref(false);

    const options = computed(() => Array.from({ length: props.totalSlots }, (_, i) => i + 1));

    const submitRequest = () => {
      if (selectedOption.value) {
        isLoading.value = true;

        if (props.btn === "Send request") {
          eventBus.emit("requested", {
            slot: selectedOption.value,
            callback: (response) => {
              isLoading.value = false;
              selectedOption.value = null;
              if (response) {
                currentStep.value = false;
              }
            },
          });
        } else {
          eventBus.emit("selected", selectedOption.value);
          eventBus.emit("close-dialog");
        }
      }
    };

    const closeDialog = () => {
      eventBus.emit("close-dialog");
    };

    return { currentStep, selectedOption, options, submitRequest, closeDialog, isLoading };
  },
};
</script>
