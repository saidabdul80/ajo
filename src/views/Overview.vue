<template>
  <DefaultLayout>
    <div class="tw-mb-7" v-if="currentNotification">
      <Notify :message="currentNotification.message" type="warning">
        <template #end>
          <PButton :label="currentNotification.label" size="small" @click="handleVerification(currentNotification)" />
        </template>
      </Notify>
    </div>

    <div class="tw-flex tw-flex-col xl:tw-grid xl:tw-grid-cols-6 tw-gap-8 tw-basis-full">
      <div class="xl:tw-col-span-4 tw-flex tw-flex-col xl:tw-h-full tw-pb-6 xl:tw-pb-0">
        <div class="tw-flex tw-gap-7 tw-items-center tw-flex-wrap xl:tw-flex-nowrap tw-mb-7">
          <WalletBalanceCard
            title="Wallet Balance"
            :currency="user?.my_wallet?.currency"
            :balance="user?.my_wallet?.balance || 0"
            buttonLabel="Fund Wallet"
            :chartOptions="chartOptions"
            :series="series"
            @button-click="handleFundWallet" />
          <WalletBalanceCard title="Total contribution" balance="0.00" :chartOptions="chartOptions" :series="series" background-color="#C1B2F2" />
        </div>
        <div class="tw-h-full">
          <RecentTransactionTable tableTitle="Recent activities" />
        </div>
      </div>
      <div class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
        <AccountSetup v-if="!areAllStepsCompleted" title="Complete account setup" description="Finish setting up your account to fully enjoy Ajo by Cowris." :steps="stepDefinitions" />

        <AjoGroupList :contentHeight="!areAllStepsCompleted ? 'tw-max-h-[30vh]' : 'tw-max-h-[50vh] md:tw-max-h-[72vh]'" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { reactive, computed } from "vue";
import { useCurrentNotification } from "@/composable/useCurrentNotification";
import eventBus from "@/eventBus";
import PButton from "@/components/Button.vue";
import Header from "@/components/Header.vue";
import Notify from "@/components/Notify.vue";
import AjoGroupList from "@/components/AjoGroupList.vue";
import WalletBalanceCard from "@/components/WalletBalanceCard.vue";
import RecentTransactionTable from "@/components/RecentTransactionTable.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AccountSetup from "@/components/AccountSetup.vue";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";

export default {
  name: "Overview",
  components: {
    DefaultLayout,
    AjoGroupList,
    Notify,
    PButton,
    WalletBalanceCard,
    RecentTransactionTable,
    AccountSetup,
    Header,
    FundWalletDialog,
  },
  setup() {
    const { currentNotification, user } = useCurrentNotification();

    const series = reactive([
      {
        name: "Balance",
        data: [0, 1, 3, 2, 7, 4, 6],
      },
    ]);

    const chartOptions = reactive({
      colors: ["#546E7A", "#E91E63"],
      chart: {
        type: "area",
        height: "auto",
        background: "transparent",
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        colors: ["#ccc"],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.5,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
      },
    });

    const documentRequirements = reactive([
      { key: "nin_slip_url", name: "NIN Slip" },
      { key: "international_passport_url", name: "International Passport" },
      // { key: 'utility_bills_url', name: 'Utility Bills' },
      // { key: 'drivers_license_url', name: 'Driver\'s License' },
      // { key: 'permanent_residence_card_url', name: 'Permanent Residence Card' },
      // { key: 'proof_of_address_url', name: 'Proof of Address' }
    ]);

    const stepDefinitions = reactive([
      {
        name: "signup",
        text: "Sign up to Cowris",
        isCompleted: true,
        isClickable: false,
      },
      {
        name: "email",
        text: "Verify your email",
        isCompleted: computed(() => user.value.is_verified_email),
        isClickable: computed(() => !user.value.is_verified_email),
      },
      {
        name: "phone",
        text: "Add and verify phone number",
        isCompleted: computed(() => user.value.is_verified_phone_number),
        isClickable: computed(() => !user.value.is_verified_phone_number),
      },
      {
        name: "document",
        text: "Upload means of identification",
        isCompleted: computed(() => documentRequirements.every((doc) => user.value[doc.key])), //some(doc => user.value[doc.key])),
        isClickable: computed(() => !documentRequirements.every((doc) => user.value[doc.key])), //documentRequirements.some(doc => user.value[doc.key])),
      },
    ]);

    const areAllStepsCompleted = computed(() => {
      return stepDefinitions.every((step) => (typeof step.isCompleted === "function" ? step.isCompleted() : step.isCompleted));
    });

    const handleVerification = (type) => {
      eventBus.emit("open-dialog", {
        default: type.dialog,
        position: "right",
      });
    };

    const handleFundWallet = () => {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    };

    return {
      user,
      series,
      chartOptions,
      stepDefinitions,
      currentNotification,
      handleVerification,
      handleFundWallet,
      areAllStepsCompleted,
    };
  },
};
</script>

<style scoped>
.chart-card {
  width: 350px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
}
.chart-container {
  width: 100%;
  height: 100px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-title {
  font-size: 1.2em;
}

.fund-button {
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.card-balance {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 2em;
}

.currency-symbol {
  margin-right: 5px;
}

.balance-amount {
  font-weight: bold;
}
</style>
