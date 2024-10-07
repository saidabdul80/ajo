<template>
  <div v-if="currentStep == 'paymentOptions'">
    <div class="tw-space-y-2 tw-mt-8 md:tw-mt-16">
      <h5 class="tw-text-[28px] tw-text-black">
        How do you want to make contribution?
      </h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">
        Choose the mode of contribution you prefer
      </p>
      <div class="tw-space-y-8 tw-pt-7">
        <div class="tw-flex tw-flex-col tw-gap-4">
          <div class="tw-flex tw-items-center">
            <RadioButton
              v-model="paymentOption"
              inputId="wallet"
              name="payment"
              value="wallet"
              variant="filled" />
            <label for="wallet" class="tw-ml-2">Through wallet</label>
          </div>
          <div class="tw-flex tw-items-center">
            <RadioButton
              v-model="paymentOption"
              inputId="eTransfer"
              name="payment"
              value="eTransfer"
              variant="filled" />
            <label for="eTransfer" class="tw-ml-2">Throught e-transfer</label>
          </div>
        </div>
        <Button
          label="Continue"
          @click="goToNextStep"
          class="tw-w-full"
          :disabled="!paymentOption" />
      </div>
    </div>
  </div>

  <div v-else>
    <!-- Wallet Process -->
    <div v-if="paymentOption == 'wallet'">
      <div class="md:tw-pt-4 tw-text-center">
        <div class="tw-space-y-2 tw-pb-8 tw-text-center">
          <img
            :src="`/images/${
              isWalletBalance ? 'sucessful-wallet' : 'error'
            }.svg`"
            alt="icon"
            class="tw-inline-block tw-w-[200px] tw-mb-4" />
          <h5 class="tw-text-[28px] tw-text-black">
            {{ isWalletBalance ? "Contribution made!" : "Insufficient fund!" }}
          </h5>
          <p class="tw-text-[#586283] tw-max-w-[40ch]">
            <template v-if="isWalletBalance">
              A sum of <b>{{ ajoAmount }}</b> has been contributed to The
              <b>{{ ajoName }}</b> Ajo group. Next contribution is on
              <b>{{ ajoDate }}</b
              >.
            </template>
            <template v-else>
              Your wallet balance is low. You will need to fund the wallet to
              make your contribution.
            </template>
          </p>
        </div>

        <Button
          v-if="isWalletBalance"
          label="Alright !"
          @click="closeDialog"
          class="tw-w-full" />
        <Button
          v-if="!isWalletBalance"
          label="Fund Wallet"
          @click="handleFundWallet"
          class="tw-w-full" />
      </div>
    </div>

    <!-- E Transfer Process -->
    <div v-if="paymentOption == 'eTransfer'">
      <div class="tw-flex tw-items-center tw-flex-col tw-gap-3">
        <h4 class="tw-text-black tw-text-3xl md:tw-text-4xl">₦300,000 NGN</h4>
        <p>Amount to send to Ajo account</p>

        <div class="tw-mt-10 tw-mb-6 tw-w-full">
          <Divider />
        </div>

        <div>
          <h4 class="tw-text-lg tw-text-black tw-font-semibold">
            The {{ ajoName }} account details
          </h4>
          <p class="tw-text-[#333333]">
            Send money to the account details below. Once the money transfer is
            successful, it will reflect on your Ajo dashboard.
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

          <div
            class="tw-inline-flex tw-gap-3 tw-mb-6 tw-bg-[#FFF7E9] tw-p-5 tw-rounded-lg tw-border tw-border-[#E0C9A5]">
            <i class="pi pi-exclamation-circle tw-text-[#F0B149]"></i>
            <div class="tw-text-sm">
              <p class="tw-text-black tw-font-semibold tw-leading-none tw-pb-2">
                Add the remark/narration to track your contribution.
              </p>
              <p class="tw-text-[#333333]">
                Make a transfer of ₦300,000 NGN to the account details above and
                make sure to add the remark/narration.
              </p>
            </div>
          </div>

          <Button @click="closeDialog" label="Close" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import RadioButton from "primevue/radiobutton";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";
import Divider from "primevue/divider";
import TextClipboard from "@/components/TextClipboard.vue";

export default {
  components: {
    Button,
    RadioButton,
    FundWalletDialog,
    Divider,
    TextClipboard,
  },

  data() {
    return {
      currentStep: "paymentOptions",
      paymentOption: null,
      isWalletBalance: false,
      ajoName: "Titanic",
      ajoDate: "Monday 23rd September 2024",
      ajoAmount: "₦300,000",

      fundingDetails: {
        accountNumber: "333 222 3322",
        bankName: "Wema Bank",
        accountName: "Rhoda Ogunesan",
        remarkNarration: "CWR48049E46",
      },
    };
  },

  methods: {
    goToNextStep() {
      this.currentStep = null;
    },

    closeDialog() {
      eventBus.emit("close-dialog");
    },

    handleFundWallet() {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        position: "right",
      });
    },

    formatKey(key) {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },
  },
};
</script>

<style>
b {
  color: black;
}
</style>
