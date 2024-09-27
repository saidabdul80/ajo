<template>
  <div class="tw-mb-7">
    <Notify
      message="Verify your email address to explore Ajo by Cowris."
      type="warning" />
  </div>
  <ion-content color="transparent" class="container">
    <div class="xl:tw-grid xl:tw-grid-cols-6 tw-h-full tw-gap-8">
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
            @button-click="handleButtonClick" />
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
        <div class="tw-bg-white tw-flex tw-flex-col tw-basis-full">
          <div
            class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-text-[#0F1419] tw-border-b">
            <h4 class="tw-font-medium tw-text-xl">Ajo Groups</h4>
            <span class="tw-font-bold tw-text-lg">See all</span>
          </div>
          <div
            class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
            <div>
              <img src="/images/groups.svg" alt="icon" />
            </div>
            <h5 class="tw-text-2xl tw-text-[#0F1419] tw-font-medium tw-pb-2">
              No Ajo group yet
            </h5>
            <p class="tw-max-w-[30ch] tw-text-center tw-text-[#333333]">
              You will find the ajo groups you have joined here
            </p>
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { ref } from "vue";
import eventBus from "@/eventBus";
import PButton from "@/components/Button.vue";
import Notify from "@/components/Notify.vue";
import WalletBalanceCard from "@/components/WalletBalanceCard.vue";
import RecentTransactionTable from "@/components/RecentTransactionTable.vue";
import AccountSetup from "@/components/AccountSetup.vue";
import PendingVerificationDialog from "@/components/Dialog/PendingVerificationDialog.vue";
import { IonContent } from "@ionic/vue";

export default {
  name: "Overview",
  components: {
    IonContent,
    Notify,
    PButton,
    WalletBalanceCard,
    RecentTransactionTable,
    AccountSetup,
    PendingVerificationDialog,
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
    handleButtonClick() {
      console.log("Button clicked");
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
.container {
  height: calc(100% - 92px);
}
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
