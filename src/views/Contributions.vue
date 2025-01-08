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
        <WalletBalanceCard @button-click="handleFundWallet" title="Wallet Balance" :currency="userStore.user?.my_wallet?.currency" :balance="userStore.user?.my_wallet?.balance||0"  buttonLabel="Fund Wallet" :chartOptions="chartOptions" :series="series" />
        <AjoBalanceCard :ajos="globals.ajos" title="Total contribution" balance="&#x20A6; 0.00" :chartOptions="chartOptions" :series="series" background-color="#C1B2F2" />
      </div>

      <!-- <FiltersTab contentType="table" /> -->
      <DataTable
            :loading="loadingTransactions"
            :paginationData="transactions"
            :headers="headers"
            @row-click="handleRowClick"
            @page-change="handlePageChangeR"
            :search-options="searchOptions"
            :search-options-dropdown="searchOptionsDropdown"
          >
          <template v-slot:td-by="{ row }">
            {{ row.by.holder.full_name }}
          </template>
          <template v-slot:td-status="{ row }">
              <span class="tw-rounded-[33px] tw-bg-white tw-block">
                  <v-chip
                  size="small"
                  :color="getChipColor(row.status)"
                  class="tw-py-0 tw-flex tw-justify-center tw-font-bold tw-capitalize"
                  >
                  {{ row?.status.toLowerCase() }}
                  </v-chip>
              </span>
          </template>
      </DataTable>
    </div>
  </DefaultLayout>
</template>

<script>
import AjoCard from "@/components/AjoCard.vue";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import FiltersTab from "@/components/FiltersTab.vue";
import Notify from "@/components/Notify.vue";
import WalletBalanceCard from "@/components/WalletBalanceCard.vue";
import AjoBalanceCard from "@/components/AjoBalanceCard.vue";
import { useGlobalsStore } from "@/stores/globals";
import { useUserStore } from "@/stores/user";
import eventBus from "@/eventBus";
import DataTable from "@/components/Table/Table.vue";
import { useClient } from "@/stores/client";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";

export default {
  components: {
    DefaultLayout,
    Notify,
    Button,
    WalletBalanceCard,
    AjoCard,
    FiltersTab,
    FundWalletDialog,
    AjoBalanceCard,
    DataTable
  },
  watch: {
    'global.filters': {
        handler: function (newFilters) {
        let status = newFilters?.status == "All" ? "" : newFilters?.status;
        this.filters = {
          transaction_status: status||'',
          sort: newFilters.sort||'',
          transaction_type: this.type||'',
          ...newFilters
          // transaction_number: newFilters.search||'',
        };
        this.getTrasactions(this.filters);
      },
      deep: true,
    },
    
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
      loadingTransactions:false,
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
      filters:{},
      globals: useGlobalsStore(),
      userStore: useUserStore()
    };
  },
  
  methods: {
    getChipColor(status) {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === 'successful') {
        return '#065F46'; // Green for completed
      } else if (lowerStatus === 'pending') {
        return 'orange'; // Orange for pending
      } else if (lowerStatus === 'failed') {
        return '#991B1B'; // Red for failed
      }
      return '#ccc'; // Default color (e.g., gray)
    },
    async getTrasactions(data = null,path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path:path?path:'/transactions/contributions', data, fullPath:path?true:false })                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    handleRowClick(row) {
      this.showdrawer = true;
      this.transaction = row;
    },
    handlePageChangeR(path) {
      this.filters.transaction_type=this.type ;
      console.log(this.type,'rece')
      this.global.getTrasactions(this.filters, path);
    },
    handlePageChangeS(path) {

      this.filters.transaction_type=this.type;
      this.global.getTrasactions(this.filters, path);
    },
    handleFundWallet() {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    },
  },
  created() {
    this.globals.fetchMyAjos();
    this.getTrasactions(this.filters);
  },
};
</script>

<style lang="scss" scoped></style>
