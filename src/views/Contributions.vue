<template>
  <DefaultLayout>
    <div class="tw-mb-7">
      <Notify message="Rhoda Ogunesan has invited you to join Ajo group." type="warning">
        <template #end>
          <Button label="View Ajo details" size="small" />
        </template>
      </Notify>
    </div>
    <div class="tw-flex tw-flex-col">
      <div class="tw-flex tw-gap-7 tw-items-center tw-flex-wrap xl:tw-flex-nowrap tw-mb-7">
        <WalletBalanceCard
          @button-click="handleFundWallet"
          title="Wallet Balance"
          :currency="userStore.user?.my_wallet?.currency"
          :balance="userStore.user?.my_wallet?.balance || 0"
          buttonLabel="Fund Wallet"
          :chartOptions="chartOptions"
          :series="series" />
        <AjoBalanceCard :ajos="globals.ajos" title="Total contribution" balance="&#x20A6; 0.00" :chartOptions="chartOptions" :series="series" background-color="#C1B2F2" />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-3 md:tw-flex-row md:tw-items-center tw-justify-between tw-bg-white tw-p-6 tw-border tw-border-[#DBDEE2CC]">
        <h4 class="tw-text-xl tw-text-black">Your Contributions</h4>
        <div class="tw-flex tw-flex-col tw-gap-3 md:tw-flex-row md:tw-items-center">
          <div>
            <label>Status:</label>
            <Select v-model="selectedStatus" :options="statusOptions" class="tw-w-fit !tw-shadow-none !tw-rounded-2xl !tw-border-none !tw-bg-transparent" />
          </div>

          <Pills :buttonsTitle="['Newest', 'Oldest']" @pill-selected="handlePillSelection" />
        </div>
      </div>

      <div class="tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4 tw-mt-4">
        <AjoCard
          v-for="data in globals.ajos"
          :key="data.id"
          :ajoId="data.id"
          :ajoType="data.category ? data.category : ''"
          :ajoName="data.name"
          :ajoContributedAmount="parseFloat(data.total_contribution)"
          :ajoTotalAmount="parseFloat(data.total_contribution_expected)"
          :ajoTimeline="data.time_left"
          :ajoLastUpate="data.last_contributed_time"
          :images="['/images/avatar.png', '/images/avatar.png', '/images/avatar.png', '/images/avatar.png', '/images/avatar.png']" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import AjoCard from "@/components/AjoCard.vue";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Notify from "@/components/Notify.vue";
import WalletBalanceCard from "@/components/WalletBalanceCard.vue";
import AjoBalanceCard from "@/components/AjoBalanceCard.vue";
import { useGlobalsStore } from "@/stores/globals";
import { useUserStore } from "@/stores/user";
import eventBus from "@/eventBus";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";
import Select from "primevue/select";
import Pills from "@/components/Pills.vue";

export default {
  components: {
    DefaultLayout,
    Notify,
    Button,
    WalletBalanceCard,
    AjoCard,
    FundWalletDialog,
    AjoBalanceCard,
    Select,
    Pills,
  },

  data() {
    return {
      headers: [
        { key: "by", title: "Name" },
        { key: "created_at", title: "Date" },
        { key: "type", title: "Type" },
        { key: "amount", title: "Amount" },
        { key: "status", title: "Status" },
      ],

      statusOptions: ["All", "Type"],
      selectedStatus: "All",

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
      filters: {},
      globals: useGlobalsStore(),
      userStore: useUserStore(),
    };
  },

  methods: {
    handleFundWallet() {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    },

    handlePillSelection(value) {
      // TODO: Sort ajos
    },
  },
  created() {
    this.globals.fetchMyAjos();
  },
};
</script>

<style lang="scss" scoped></style>
