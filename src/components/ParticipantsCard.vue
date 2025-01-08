<template>
  <div v-if="participants && participants.length > 0" class="tw-w-full tw-bg-white tw-p-6 tw-border tw-border-[#E8EBEF] tw-space-y-3">
    <h4 class="tw-text-xl tw-text-[#0F1419]">Participants ({{ participants.length }})</h4>

    <p class="tw-text-base tw-text-[#333333]">Participants will be able to withdraw their contributions in the order of the number assigned below. You can request to swap slots.</p>

    <ul class="tw-space-y-6 tw-pt-4">
      <li v-for="(participant, index) in participants" :key="participant.id" class="tw-flex tw-items-center tw-gap-3">
        <p
          @click="assignSlot(participant)"
          :class="participant.new_slot ? 'bgR' : 'bgP'"
          class="tw-w-8 tw-h-8 tw-shrink-0 tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-white tw-font-medium">
          {{ participant.slot == null ? "?" : participant.slot }}
        </p>
        <p class="tw-text-base tw-text-[#000000] tw-flex">
          {{ participant.email }}
          <span class="tw-ml-2 tw-flex tw-items-center tw-relative" v-if="participant.slot_request && isAjoOwner">
            <Button
              slotPos="left"
              icon="pi pi-arrow-right-arrow-left"
              :label="participant.slot_request + ' Accept'"
              size="small"
              class="tw-h-6 !tw-text-white"
              color="danger"
              @click="handleSwapSlot"></Button>
          </span>
        </p>
      </li>
    </ul>

    <div class="tw-pt-5" v-if="!isAjoOwner">
      <Button @click="handleSwapSlot" label="Request to swap slot" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import SwapSlotDialog from "@/components/Dialog/SwapSlotDialog.vue";
import { useNotificationStore } from "@/stores/notification";
import { useClient } from "@/stores/client";

export default {
  components: {
    Button,
  },
  props: {
    participants: {
      type: Array,
      required: true,
    },
    isAjoOwner: {
      type: Boolean,
      default: false,
    },
    ajoId: {
      required: true,
    },
  },
  data() {
    return {
      selectedParticipant: null,
    };
  },
  methods: {
    assignSlot(participant) {
      this.selectedParticipant = participant;
      eventBus.emit("open-dialog", {
        default: SwapSlotDialog,
        props: {
          btn: "Assign",
          participant: participant,
          slotNumber: this.selectedParticipant.slot,
        },
        position: "right",
      });
    },
    async proceedToAssign(slot) {
      try {
        const res = await useClient().http({
          method: "post",
          path: "/assign_ajo_slot",
          data: {
            ajo_id: this.ajoId,
            user_id: this.selectedParticipant.user_id,
            slot: slot,
          },
        });
        if (res) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: "success",
            message: "Assigned successfully.",
          });
        }
      } catch (error) {
        console.error("Error assigning slot:", error);
      }
    },
    handleSwapSlot() {
      eventBus.emit("open-dialog", {
        default: SwapSlotDialog,
        position: "right",
      });
    },
  },
  mounted() {
    eventBus.on("selected", this.proceedToAssign);
  },
  beforeUnmount() {
    eventBus.off("selected", this.proceedToAssign);
  },
};
</script>

<style>
.bgP {
  background: #36454f;
}
.bgR {
  background: #c5564f;
}
</style>
