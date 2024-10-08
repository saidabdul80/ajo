<template>
  <div class="card flex justify-center">
    <button type="button" @click="toggle" class="tw-w-full">
      <i class="pi pi-ellipsis-h"></i>
    </button>

    <Popover ref="op">
      <ul>
        <li>
          <Button
            label="Report an issue"
            icon="pi pi-flag"
            color="link"
            class="!tw-justify-start"
            @click="handleReportIssue" />
        </li>
        <li>
          <Button
            v-if="withdrawalDetails.type.toLowerCase() != 'deposit'"
            label="Repeat withdrawal"
            icon="pi pi-replay"
            color="link"
            class="!tw-justify-start"
            @click="handleRepeatWithdrawal">
          </Button>
        </li>
      </ul>
    </Popover>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Popover from "primevue/popover";
import Button from "@/components/Button.vue";
import ReportDialog from "@/components/Dialog/ReportDialog.vue";
import WithdrawalDialog from "./Dialog/WithdrawalDialog.vue";

export default {
  components: {
    Popover,
    Button,
    ReportDialog,
    WithdrawalDialog,
  },

  props: {
    withdrawalDetails: {
      type: Object,
    },
  },

  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    handleReportIssue() {
      this.$refs.op.hide();
      eventBus.emit("open-dialog", {
        default: ReportDialog,
        position: "right",
      });
    },

    handleRepeatWithdrawal() {
      this.$refs.op.hide();
    },
  },
};
</script>
