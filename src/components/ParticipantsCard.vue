<template>
  <div v-if="participants && participants.length > 0" class="tw-w-full tw-bg-white tw-p-6 tw-border tw-border-[#E8EBEF] tw-space-y-3">
    <h4 class="tw-text-xl tw-text-[#0F1419]">Participants ({{ participants.length }})</h4>

    <p class="tw-text-base tw-text-[#333333]">Participants will be able to withdraw their contributions in the order of the number assigned below. You can request to swap slots.</p>

    <ul class="tw-space-y-6 tw-pt-4">
      <li v-for="(participant, index) in participants" :key="participant.id" class="tw-flex tw-items-center tw-gap-3">
        <p
          :id="`slot-${index}`"
          @click="assignSlot(participant)"
          :class="participant.new_slot ? 'bgR' : 'bgP'"
          class="tw-w-8 tw-h-8 tw-cursor-pointer hover:tw-bg-black tw-shrink-0 tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-text-white tw-font-medium">
          {{ participant.slot == null ? "?" : participant.slot }}
        </p>
        <p class="tw-text-base tw-text-[#000000] tw-flex tw-relative">
          {{ participant.email }}
          <span class="tw-absolute tw-ml-2 tw-flex tw-items-center -tw-right-16 z-10" v-if="participant.slot_request && isAjoOwner" :id="`slot-request-${index}`">
            <Button
              slotPos="left"
              icon="pi pi-arrow-right-arrow-left"
              :badge="participant.slot_request"
              label="Accept"
              size="small"
              class="tw-h-6 !tw-text-white"
              color="danger"
              @click.stop="acceptSlot(participant)"></Button>
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
      driverObj: null,
    };
  },
  methods: {
    assignSlot(participant) {
      this.driverObj ? this.driverObj.destroy() : null;
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
    acceptSlot(participant) {
      this.selectedParticipant = participant;

      this.$globals.ubtAlert({
        text: `Are you sure you want to accept this slot? 
          <div class="tw-mt-10">
            <button id="acceptBtn" class="tw-bg-green-600 tw-text-white tw-w-[45%] tw-px-4 tw-py-2 tw-rounded-md tw-font-bold tw-mr-2 hover:tw-bg-green-700" >Accept</button>
            </div>
        `,
        title: "Accept Slot",
        icon: "pi pi-question-circle",
        cancelBtnText: "Cancel",
        confirmBtnText: "Reject",
        clickEvent: (e) => {
          if (e.target.id == "acceptBtn") {
            this.proceedToAssign(participant.slot_request);
            this.$globals.alert.show = false;
          }
        },
        callback: (res) => {
          if (res) {
            this.proceedToAssign(participant.slot);
          }
        },
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
          this.$globals.pageReset++;
        }
      } catch (error) {
        console.error("Error assigning slot:", error);
      }
    },
    async requestSlot(slot) {
      try {
        const res = await useClient().http({
          method: "post",
          path: "/request_ajo_slot",
          data: {
            ajo_id: this.ajoId,
            slot: slot,
          },
        });
        if (res) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: "success",
            message: "Requested successfully.",
          });
          this.$globals.pageReset++;
        }
      } catch (error) {}
    },
    handleSwapSlot() {
      eventBus.emit("open-dialog", {
        default: SwapSlotDialog,
        position: "right",
      });
    },
  },
  mounted() {
    const steps = [];
    if (this.participants[0].slot < 1) {
      steps.push({
        element: "#slot-0",
        popover: {
          title: "Slot Settings",
          //showButtons: [],
          description: "Click on the button to assign a slot to this participant.",
          side: "left",
          align: "start",
        },
      });
    }
    if (this.isAjoOwner) {
      const slotRequests = this.participants.filter((participant) => participant.slot_request != 0);
      slotRequests.forEach((slotRequest, index) => {
        steps.push({
          element: `#slot-request-${index}`,
          popover: {
            title: "Change of Slot Request",
            //showButtons: [],
            description: "Click on the button to accept or reject this slot request.",
            side: "top",
            align: "start",
          },
        });
      });
    }

    this.driverObj = this.$globals.driver({
      steps: steps,
    });
    setTimeout(() => {
      if (this.participants[0].slot < 1) {
        this.driverObj.drive();
      }
    }, 1000);

    eventBus.on("selected", this.proceedToAssign);
    eventBus.on("requested", this.requestSlot);
  },
  beforeUnmount() {
    eventBus.off("selected", this.proceedToAssign);
    eventBus.off("requested", this.requestSlot);
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
