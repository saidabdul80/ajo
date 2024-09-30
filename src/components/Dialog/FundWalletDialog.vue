<template>
  <div class="tw-flex tw-items-center tw-flex-col tw-gap-3">
    <img
      src="@/assets/images/logo.svg"
      alt="logo"
      class="tw-h-20 tw-w-20 tw-inline-block" />
    <h4 class="tw-text-black tw-text-2xl">300,000.00 NGN</h4>
    <Button :is-full-width="false" label="Wallet Balance" />

    <div class="tw-mt-10 tw-mb-6 tw-w-full">
      <Divider />
    </div>

    <div>
      <h4 class="tw-text-lg tw-text-black tw-font-semibold">
        Cowris account details
      </h4>
      <p class="tw-text-[#333333]">
        Send money to the account details below. Once the money transfer is
        successful, it will reflect on your wallet balance.
      </p>
      <ul class="tw-py-8 tw-flex tw-flex-col tw-gap-4">
        <li
          v-for="(value, key) in fundingDetails"
          :key="key"
          class="tw-flex tw-justify-between tw-items-center">
          <p class="tw-text-[#636363]">{{ formatKey(key) }}</p>
          <TextClipboard :text="value" />
        </li>
      </ul>

      <Button @click="closeDialog" label="Close" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Divider from "primevue/divider";
import TextClipboard from "../TextClipboard.vue";

export default {
  components: {
    Button,
    Input,
    Divider,
    TextClipboard,
  },

  data() {
    return {
      fundingDetails: {
        accountNumber: "333 222 3322",
        bankName: "Wema Bank",
        accountName: "Rhoda Ogunesan",
      },
    };
  },

  methods: {
    formatKey(key) {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>

<style></style>
