<template>
  <div v-if="participants && participants.length > 0" class="tw-w-full tw-bg-white tw-p-6 tw-border tw-border-[#E8EBEF] tw-space-y-3">
    <h4 class="tw-text-xl tw-text-[#0F1419]">Participants ({{ participants.length }})</h4>

    <p class="tw-text-base tw-text-[#333333]">Participants will be be able to withdraw their contributions in the order of number assigned below. You can request to swap slot.</p>

    <ul class="tw-space-y-6 tw-pt-4">
      <li v-for="(participant, index) in participants" class="tw-flex tw-items-center tw-gap-3" :key="participant.id">
        <p class="tw-w-8 tw-h-8 tw-shrink-0 tw-inline-flex tw-items-center tw-justify-center tw-bg-[#36454F] tw-rounded-full tw-text-white tw-font-medium">{{ index + 1 }}</p>
        <p class="tw-text-base tw-text-[#000000]">{{ participant.email }}</p>
      </li>
    </ul>

    <div class="tw-pt-5">
      <Button @click="handleSwapSlot" label="Request to swap slot" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import SwapSlotDialog from "@/components/Dialog/SwapSlotDialog.vue";

export default {
  components: {
    Button,
  },

  props: {
    participants: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const handleSwapSlot = () => {
      eventBus.emit("open-dialog", {
        default: SwapSlotDialog,
        position: "right",
      });
    };

    return {
      handleSwapSlot,
    };
  },
};
</script>
