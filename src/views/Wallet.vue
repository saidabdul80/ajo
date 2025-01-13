<template>
  <DefaultLayout HeaderDescription="Manage your wallet here.">
    <div class="tw-flex tw-flex-col tw-space-y-10">
      <div class="tw-bg-white tw-border tw-border-[#DBDEE2CC] tw-rounded-[5px] tw-p-3 tw-h-[280px]">
        <div class="tw-flex tw-flex-col tw-justify-between tw-h-full tw-bg-[#C1B2F2] tw-w-full tw-rounded-[5px] tw-p-6">
          <div class="tw-font-semibold">
            <p class="tw-text-xs">Wallet balance</p>
            <h2 class="tw-text-[32px]">
              {{ $globals.formatNumber(userStore.user?.my_wallet?.balance || 0) }}
              <span class="tw-text-base">{{ userStore.user.my_wallet.currency }}</span>
            </h2>
          </div>

          <div class="tw-inline-flex tw-flex-wrap sm:tw-flex-nowrap tw-items-center tw-gap-3">
            <Button @click="handleWithdrawal" label="Withdraw from wallet" color="secondary" :outlined="true" class="!tw-text-black sm:!tw-w-fit" />
            <Button @click="handleFundWallet" label="Fund Wallet" class="sm:!tw-w-fit" />
          </div>
        </div>
      </div>

      <div>
        <DataTable
          pageTitle="Wallet Transactions"
          :loading="loadingTransactions"
          :paginationData="transactions"
          :headers="headers"
          @row-click="handleRowClick"
          @page-change="handlePageChangeR"
          :search-options="searchOptions"
          :search-options-dropdown="searchOptionsDropdown">
          <template v-slot:td-status="{ row }">
            <span class="tw-rounded-[33px] tw-bg-white tw-block">
              <v-chip size="small" :color="getChipColor(row.status)" class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize">
                {{ row?.status.toLowerCase() }}
              </v-chip>
            </span>
          </template>
        </DataTable>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";
import WithdrawalDialog from "@/components/Dialog/WithdrawalDialog.vue";
import ActionMenu from "@/components/ActionMenu.vue";
import { useUserStore } from "@/stores/user";
import DataTable from "@/components/Table/Table.vue";
import { useClient } from "@/stores/client";

export default {
  components: {
    DefaultLayout,
    WithdrawalDialog,
    FundWalletDialog,
    Button,
    ActionMenu,
    DataTable,
  },
  watch: {
    "global.filters": {
      handler: function (newFilters) {
        let status = newFilters?.status == "All" ? "" : newFilters?.status;
        this.filters = {
          transaction_status: status || "",
          sort: newFilters.sort || "",
          transaction_type: this.type || "",
          ...newFilters,
          // transaction_number: newFilters.search||'',
        };
        this.getTrasactions(this.filters);
      },
      deep: true,
    },
  },
  data() {
    return {
      transactions: null,
      headers: [
        { key: "reference", title: "Reference" },
        { key: "created_at", title: "Date" },
        { key: "type", title: "Type" },
        { key: "amount", title: "Amount" },
        { key: "status", title: "Status" },
      ],
      loadingTransactions: false,
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
      userStore: useUserStore(),
    };
  },
  created() {
    this.getTrasactions(this.filters);
  },
  methods: {
    getChipColor(status) {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === "successful") {
        return "#065F46"; // Green for completed
      } else if (lowerStatus === "pending") {
        return "orange"; // Orange for pending
      } else if (lowerStatus === "failed") {
        return "#991B1B"; // Red for failed
      }
      return "#ccc"; // Default color (e.g., gray)
    },
    async getTrasactions(data = null, path = null) {
      this.loadingTransactions = true;
      const response = await useClient().http({ method: "get", path: path ? path : "/transactions/wallet_funding", data, fullPath: path ? true : false });
      this.loadingTransactions = false;
      if (response) {
        this.transactions = response;
      }
    },
    handleRowClick(row) {
      this.showdrawer = true;
      this.transaction = row;
    },
    handlePageChangeR(path) {
      this.getTrasactions(this.filters, path);
    },
    handlePageChangeS(path) {
      this.getTrasactions(this.filters, path);
    },
    handleFundWallet() {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    },

    handleWithdrawal() {
      eventBus.emit("open-dialog", {
        default: WithdrawalDialog,
        title: "Withdraw from wallet",
        position: "right",
      });
    },
  },
};
</script>
