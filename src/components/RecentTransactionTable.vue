<template>
  <DataTable
    :pageTitle="tableTitle"
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
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useClient } from "@/stores/client";
import DataTable from "@/components/Table/Table.vue";

export default {
  components: {
    DataTable,
  },
  props: {
    tableTitle: {
      type: String,
      require: true,
    },
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
      this.filters.transaction_type = this.type;
      console.log(this.type, "rece");
      this.global.getTrasactions(this.filters, path);
    },
    handlePageChangeS(path) {
      this.filters.transaction_type = this.type;
      this.global.getTrasactions(this.filters, path);
    },
  },
};
</script>
