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
    <template v-slot:td-action="{ row }">
      <Button v-if="row.status == 'PENDING'" size="small" :loading="loading" @click="requery(row)" label="Requery" />
    </template>
  </DataTable>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useClient } from "@/stores/client";
import { ref, onMounted, watch } from "vue";
import DataTable from "@/components/Table/Table.vue";
import Button from "./Button.vue";

export default {
  components: {
    DataTable,
    Button,
  },
  props: {
    tableTitle: {
      type: String,
      required: true,
    },
  },
  setup() {
    const transactions = ref(null);
    const loading = ref(false);
    const headers = ref([
      { key: "reference", title: "Reference" },
      { key: "created_at", title: "Date" },
      { key: "type", title: "Type" },
      { key: "amount", title: "Amount" },
      { key: "status", title: "Status" },
      { key: "action", title: "Action" },
    ]);
    const loadingTransactions = ref(false);
    const userStore = useUserStore();
    const filters = ref({});
    const currentPath = ref(null);

    const getChipColor = (status) => {
      const lowerStatus = status.toLowerCase();
      if (lowerStatus === "successful") {
        return "#065F46";
      } else if (lowerStatus === "pending") {
        return "orange";
      } else if (lowerStatus === "failed") {
        return "#991B1B";
      }
      return "#ccc";
    };

    const getTransactions = async (data = null, path = null) => {
      loadingTransactions.value = true;
      const response = await useClient().http({ method: "get", path: path ? path : "/transactions/wallet_funding", data, fullPath: path ? true : false });
      loadingTransactions.value = false;
      if (response) {
        transactions.value = response;
      }
    };

    const requery = async (row) => {
      row.loading = true;
      const response = await useClient().http({ method: "post", path: "/transactions/requery/" + row.reference });
      row.loading = false;
      if (response) {
        getTransactions(filters.value, currentPath.value);
      }
    };

    const handleRowClick = (row) => {
      // Assuming 'showdrawer' and 'transaction' are defined elsewhere
      // showdrawer = true;
      // transaction = row;
    };

    const handlePageChangeR = (path) => {
      currentPath.value = path;
      getTransactions(filters.value, path);
    };

    const handlePageChangeS = (path) => {
      currentPath.value = path;
      getTransactions(filters.value, path);
    };

    watch(
      () => filters.value,
      (newFilters) => {
        let status = newFilters?.status === "All" ? "" : newFilters?.status;
        filters.value = {
          transaction_status: status || "",
          sort: newFilters.sort || "",
          transaction_type: userStore.type || "",
          ...newFilters,
        };
        getTransactions(filters.value);
      },
      { deep: true }
    );

    onMounted(() => {
      getTransactions(filters.value);
    });

    return {
      transactions,
      headers,
      loadingTransactions,
      getChipColor,
      getTransactions,
      handleRowClick,
      handlePageChangeR,
      handlePageChangeS,
      requery,
    };
  },
};
</script>
