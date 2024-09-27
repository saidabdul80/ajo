<template>
  <div class="tw-bg-white">
    <div class="tw-py-4 tw-px-6">
      <h4 class="tw-text-xl tw-font-semibold tw-text-[#0F1419] tw-pb-3">
        {{ title }}
      </h4>
      <p class="tw-text-[#333333] tw-max-w-[35ch]">
        {{ description }}
      </p>
    </div>
    <ul>
      <li v-for="(item, index) in steps" :key="index">
        <button
          class="tw-py-4 tw-px-6 tw-border-t tw-space-x-4 tw-inline-flex tw-items-center tw-w-full"
          @click="openDialogWithContent(item.name)"
          :class="item.isCompleted && 'disabled-link'">
          <span
            :class="[
              'tw-flex tw-justify-center tw-items-center leading-none tw-w-[38px] tw-h-[38px] tw-rounded-full  tw-text-[#36454F] tw-text-xl',
              item.isCompleted ? 'tw-bg-[#36454F]' : 'tw-bg-[#EBECED]',
            ]">
            <img v-if="item.isCompleted" src="/images/check.svg" alt="icon" />
            <span v-else>{{ index + 1 }}</span>
          </span>
          <span
            :class="[
              'tw-text-xl ',
              item.isCompleted
                ? 'tw-text-[#36454F] tw-line-through'
                : ' tw-text-[#000000]',
            ]"
            >{{ item.text }}</span
          >
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import ConfirmEmailDialog from "@/components/Dialog/ConfirmEmailDialog.vue";
import ConfirmPhoneDialog from "@/components/Dialog/ConfirmPhoneDialog.vue";
import UploadDialog from "@/components/Dialog/UploadDialog.vue";

export default {
  name: "AccountSetup",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    openDialogWithContent(name) {
      let curModal = null;

      switch (name) {
        case "email":
          curModal = ConfirmEmailDialog;
          break;
        case "phone":
          curModal = ConfirmPhoneDialog;
          break;
        case "document":
          curModal = UploadDialog;
          break;
      }
      eventBus.emit("open-dialog", {
        default: curModal,
        position: "right",
      });
    },
  },
};
</script>

<style scoped>
.disabled-link {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
