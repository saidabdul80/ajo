<template>
  <div v-if="!withdrawalStatus" class="tw-flex tw-items-center tw-flex-col tw-gap-3">
    <img src="@/assets/images/logo.svg" alt="logo" class="tw-h-20 tw-w-20 tw-inline-block" />

    <div class="tw-text-black tw-text-2xl tw-flex tw-items-baseline tw-gap-1">
      {{ formatNumber(user?.my_wallet?.balance || 0) }}
      <span class="tw-text-sm">{{ user?.my_wallet?.currency || "NGN" }}</span>
    </div>

    <Button :is-full-width="false" label="Wallet Balance" />

    <div class="tw-mt-10 tw-mb-3 tw-w-full">
      <Divider />
    </div>

    <div>
      <h4 class="tw-text-lg tw-text-black tw-font-semibold">Fill withdrawal account</h4>
      <p class="tw-text-[#333333]">The money will be transferred to the account details you fill.</p>

      <div class="tw-py-8 tw-space-y-6">
        <div class="tw-relative">
          <img class="tw-inline-block tw-absolute tw-z-40 tw-w-3 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3" src="/images/naira.svg" alt="currency-icon" />
          <InputNumber placeholder="Amount to withdraw" v-model="amount" inputId="integeronly" fluid />
        </div>
        <Input v-model="accountName" placeholder="Account name" />

        <Select v-model="selectedBank" :options="bankOptions" placeholder="Bank Name" class="tw-w-full tw-h-[48px] !tw-rounded-2xl tw-font-light" />

        <Input v-model="accountNumber" placeholder="Account number" />
      </div>

      <Button :disabled="!isFormValid" @click="handleWithdrawalProcessing" label="Submit details" />
    </div>
  </div>

  <div v-else class="tw-text-center">
    <img class="tw-inline-block tw-p-8" src="/images/withdrawal-successful.svg" alt="icon" />
    <h4 class="tw-text-2xl tw-text-black tw-pb-3">Withdrawal processing...</h4>
    <p class="tw-text-[#333333]">
      Your withdrawal request has been successfully submitted and is being processed. You will be credited within
      <b>24 hours.</b>
    </p>

    <div class="tw-pt-10">
      <Button @click="closeDialog" label="Alright!" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Divider from "primevue/divider";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import { useUserStore } from "@/stores/user";
import { useGlobalsStore } from "@/stores/globals";

const userStore = useUserStore();
const globalStore = useGlobalsStore();

const withdrawalStatus = ref(false);
const amount = ref(null);
const accountNumber = ref("");
const selectedBank = ref(null);
const accountName = ref("");
const bankOptions = ref(["GTBank", "First Bank", "Keystone Bank", "Zenith Bank"]);

const user = computed(() => userStore.user);
const isFormValid = computed(() => {
  return amount.value !== null && amount.value > 0 && accountNumber.value && selectedBank.value && accountName.value;
});

const formatNumber = (value) => globalStore.formatNumber(value);

const closeDialog = () => eventBus.emit("close-dialog");

const handleWithdrawalProcessing = () => {
  if (!isFormValid.value) return;
  withdrawalStatus.value = true;
};

onMounted(() => {
  if (user.value) {
    accountName.value = user.value?.account_name || "";
    accountNumber.value = user.value?.account_number || "";
    selectedBank.value = user.value?.bank_name || "";
  }
});
</script>
