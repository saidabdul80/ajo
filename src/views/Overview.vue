<template>
  <DefaultLayout>
    <div class="tw-mb-7">
      <Notify
        message="Verify your email address to explore Ajo by Cowris."
        type="warning">
        <template #end>
          <PButton
            label="verify email"
            size="small"
            @click="verifyEmailDialog" />
        </template>
      </Notify>
    </div>
    <div
      class="tw-flex tw-flex-col-reverse xl:tw-grid xl:tw-grid-cols-6 tw-gap-8 tw-basis-full">
      <div
        class="xl:tw-col-span-4 tw-flex tw-flex-col xl:tw-h-full tw-pb-6 xl:tw-pb-0">
        <div
          class="tw-flex tw-gap-7 tw-items-center tw-flex-wrap xl:tw-flex-nowrap tw-mb-7">
          <WalletBalanceCard
            title="Wallet Balance"
            balance="&#x20A6; 5,000.00"
            buttonLabel="Fund Wallet"
            :chartOptions="chartOptions"
            :series="series"
            @button-click="handleFundWallet" />
          <WalletBalanceCard
            title="Total contribution"
            balance="&#x20A6; 0.00"
            :chartOptions="chartOptions"
            :series="series"
            background-color="#C1B2F2"
            @button-click="handleButtonClick" />
        </div>
        <div class="tw-h-full">
          <RecentTransactionTable />
        </div>
      </div>
      <div class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
        <AccountSetup
          title="Complete account setup"
          description="Finish setting up your account to fully enjoy Ajo by Cowris."
          :steps="steps" />
        <AjoGroupList />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import eventBus from "@/eventBus";
import PButton from "@/components/Button.vue";
import Header from "@/components/Header.vue";
import Notify from "@/components/Notify.vue";
import AjoGroupList from "@/components/AjoGroupList.vue";
import WalletBalanceCard from "@/components/WalletBalanceCard.vue";
import RecentTransactionTable from "@/components/RecentTransactionTable.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AccountSetup from "@/components/AccountSetup.vue";
import PendingVerificationDialog from "@/components/Dialog/PendingVerificationDialog.vue";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";
import ConfirmEmailDialog from "@/components/Dialog/ConfirmEmailDialog.vue";

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
    PendingVerificationDialog,
    Header,
    FundWalletDialog,
    ConfirmEmailDialog,
  },
  data() {
    return {
      series: [
        {
          name: "Balance",
          data: [0, 1, 3, 2, 7, 4, 6],
        },
      ],
      chartOptions: {
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
      },
      steps: [
        {
          name: "signup",
          text: "Sign up to Cowris",
          isCompleted: true,
        },
        {
          name: "email",
          text: "Verify your email",
          isCompleted: false,
        },
        {
          name: "phone",
          text: "Add and verify phone number",
          isCompleted: false,
        },
        {
          name: "document",
          text: "Upload means of identification",
          isCompleted: false,
        },
      ],
    };
  },
  methods: {
    verifyEmailDialog() {
      eventBus.emit("open-dialog", {
        default: ConfirmEmailDialog,
        position: "right",
      });
    },

    handleFundWallet() {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    },
  },
  mounted() {
    eventBus.emit("open-dialog", {
      default: PendingVerificationDialog,
      title: "Pending verifications...",
      position: "center",
    });
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
