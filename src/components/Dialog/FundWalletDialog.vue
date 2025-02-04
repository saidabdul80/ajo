<template>
  <div class="tw-flex tw-items-center tw-flex-col tw-gap-3">
    <img src="@/assets/images/logo.svg" alt="logo" class="tw-h-20 tw-w-20 tw-inline-block" />
    <div class="tw-text-black tw-text-2xl tw-flex tw-items-baseline tw-gap-1">
      {{ $globals.formatNumber(userStore.user?.my_wallet?.balance || 0) }}
      <span class="tw-text-sm">{{ userStore.user.my_wallet.currency }}</span>
    </div>
    <p class="tw-px-3 tw-py-1 tw-bg-[#DAE3FF] tw-rounded-lg">Wallet Balance</p>

    <div v-if="!transactionInitiated" class="tw-mt-10">
      <p class="tw-text-[#333333] tw-mb-4 tw-text-center">To fund your wallet, click the button below to generate your transaction reference and bank details.</p>
      <label class="tw-text-sm tw-w-full !tw-text-left tw-text-[#333333]">Gateway</label>
      <Select v-model="selectedGateWay" class="tw-w-full tw-mb-2" placeholder="Select a Gateway" :options="gateways" optionLabel="name" optionValue="value" />
      <div v-if="selectedGateWay === 'COWRISPAY'">
        <label class="tw-text-sm tw-w-full !tw-text-left tw-text-[#333333]">Sender Email</label>
        <Input v-model="senderEmail" class="tw-w-full tw-mb-2" placeholder="Sender Email" />
      </div>
      <label class="tw-text-sm tw-w-full !tw-text-left tw-text-[#333333]">Amount</label>
      <InputNumber v-model="amount" placeholder="Enter Amount" class="tw-mb-2" inputId="integeronly" fluid />
      <Button :loading="loading" @click="initiateTransaction" label="Initiate Transaction" />
    </div>

    <div v-if="transactionInitiated" class="tw-w-full">
      <div class="tw-mt-10 tw-mb-6">
        <Divider />
      </div>

      <div>
        <h4 class="tw-text-lg tw-text-black tw-font-semibold">Cowris Account Details</h4>
        <p class="tw-text-[#333333]">Send money to the account details below. Once the money transfer is successful, it will reflect on your wallet balance.</p>
        <ul class="tw-py-8 tw-flex tw-flex-col tw-gap-4">
          <li v-for="(value, key) in fundingDetails" :key="key" class="tw-flex tw-justify-between tw-items-center">
            <p class="tw-text-[#636363]">{{ formatKey(key) }}</p>
            <TextClipboard :text="value" />
          </li>
          <li class="tw-flex tw-justify-between tw-items-center">
            <p class="tw-text-[#636363]">Remark Narration:</p>
            <TextClipboard :text="reference" />
          </li>
        </ul>

        <Button @click="closeDialog" label="Close" />
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Divider from "primevue/divider";
import TextClipboard from "../TextClipboard.vue";
import { useClient } from "@/stores/client";
import { useUserStore } from "@/stores/user";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
export default {
  components: {
    Button,
    Divider,
    TextClipboard,
    Input,
    Select,
    InputNumber,
  },

  data() {
    return {
      fundingDetails: null,
      loading: false,
      reference: "",
      transactionInitiated: false,
      userStore: useUserStore(),
      selectedGateWay: "FIAT_MATCH",
      senderEmail:null,
      gateways: [
        {
          name: "CowrisPAY",
          value: "COWRISPAY",
        },
        {
          name: "Fiat Match",
          value: "FIAT_MATCH",
        },
      ],
      amount: 0,
    };
  },

  methods: {
    formatKey(key) {
      return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
    },

    async initiateTransaction() {
      try {
        if (this.amount == 0) {
          this.$globals.ubtAlert({ title: "Please enter an amount" });
          return;
        }
        if(this.selectedGateWay === 'COWRISPAY' && !this.senderEmail){
          this.$globals.ubtAlert({ title: "Please enter a sender email" });
          return;
        }
        this.loading = true;
        const response = await useClient().http({
          method: "post",
          path: "/transactions/initiate",
          data: {
            gateway: this.selectedGateWay,
            type: "deposit",
            currency: "CAD",
            channel: "E_TRANSFER",
            amount: this.amount,
            sender_email: this.senderEmail,
          },
        });
        this.loading = false;
        if (response) {
          this.fundingDetails = {
            accountNumber: response.banke_details.number,
            bankName: response.banke_details.bank_name,
            accountName: response.banke_details.name,
          };
          this.reference = response.code;
          this.transactionInitiated = true;
        }
      } catch (error) {
        console.error("Error initiating transaction:", error);
        alert("Failed to initiate transaction. Please try again.");
      }
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>

<style></style>
