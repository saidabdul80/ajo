<template>
  <div class="tw-bg-white tw-overflow-x-auto tw-border-[#e6eaee] tw-rounded-[5px]">
    <div v-if="!loading" class="table-shadow-sm tw-rounded-[5px] tw-overflow-auto">
      <div class="tw-border-b-[1px] tw-border-gray-200 tw-text-md md:tw-text-lg tw-font-bold tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-p-5">
        <div class="tw-font-bold tw-mb-3 md:tw-mb-0">{{ pageTitle }}</div>

        <div class="tw-flex tw-flex-row">
          <div class="tw-flex tw-flex-row tw-items-center tw-justify-between tw-gap-1 tw-border tw-border-gray-200 md:tw-border-none tw-p-2 tw-rounded-md">
            <div class="tw-font-bold tw-text-sm">Status:</div>
            <select v-model="selectedStatus" class="tw-text-sm focus:tw-ring-0 focus:tw-outline-none tw-capitalize">
              <option v-for="status in uniqueStatuses" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>
          <div class="tw-inline-flex tw-rounded-md tw-shadow-sm md:tw-ml-2 tw-ml-auto">
            <button
              class="tw-px-4 tw-py-2 tw-border tw-text-sm tw-rounded-l-md"
              @click="changeSorting('newest')"
              :class="sortOrder === 'newest' ? 'tw-bg-black tw-text-white' : 'tw-bg-gray-200 tw-text-black'">
              Newest
            </button>
            <button
              class="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-text-black tw-text-sm tw-rounded-r-md"
              @click="changeSorting('oldest')"
              :class="sortOrder === 'oldest' ? 'tw-bg-black tw-text-white' : 'tw-bg-gray-200 tw-text-black'">
              Oldest
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredData.length > 0">
        <table class="tw-min-w-full tw-bg-white tw-overflow-hidden tw-rounded-lg tw-text-md">
          <thead v-if="showHeader">
            <tr>
              <th v-if="showSelect" class="tw-px-4 tw-py-5 tw-text-right tw-bg-[#F9FAFB] tw-border-b-[1px] tw-border-gray-200 tw-w-[10px] tw-w-max-[10px]">
                <input type="checkbox" @change="toggleAll" :checked="selectAll" />
              </th>
              <th
                v-for="header in headers"
                :key="header.key"
                class="tw-bg-[#F9FAFB] tw-capitalize tw-px-6 tw-py-5 tw-text-left tw-text-gray-900 tw-tracking-wider tw-border-b-[1px] tw-border-gray-200">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody class="tw-divide-y tw-divide-gray-200 tw-text-[14px]">
            <tr v-for="(row, index) in filteredData" :key="index" @click="handleRowClick(row)" class="tw-cursor-pointer hover:tw-bg-gray-50">
              <td v-if="showSelect" class="tw-px-4 tw-py-5 tw-text-right tw-border-b-[1px] tw-border-gray-200">
                <input type="checkbox" v-model="selectedRows" :value="row" />
              </td>
              <td v-for="header in headers" :key="header.key" class="tw-px-6 tw-py-5 tw-border-b-[1px] tw-border-gray-200">
                <span v-if="header.key === 'sn'">
                  {{ index + (paginationData?.meta?.from || 1) }}
                </span>
                <span v-else>
                  <slot :name="`td-${header.key}`" :row="row">
                    {{ row[header.key] }}
                  </slot>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="tw-flex tw-flex-col tw-items-center tw-gap-5 tw-bg-white tw-justify-center tw-py-8">
        <img src="@/assets/notransaction.png" class="tw-w-[100px] md:tw-w-[200px]" alt="no transactions" />
        <p class="tw-text-lg">No Activities</p>
      </div>
    </div>
    <div v-else>
      <TableLoader :count="rows" :columns="headers.length + 1" />
    </div>
    <div v-if="paginationData" class="tw-mt-5">
      <Pagination
        :current-page="paginationData?.meta?.current_page"
        :total-pages="paginationData?.meta?.last_page"
        :rows-per-page="paginationData?.meta?.per_page"
        :total-items="paginationData?.meta?.total"
        :links="paginationData?.links"
        @page-change="changePage"
        @rows-per-page-change="changeRowsPerPage" />
    </div>
  </div>
</template>

<script>
import TableLoader from "./TableLoader.vue";
import Pagination from "./Pagination.vue";
import { useGlobalsStore } from "../../stores/globals";

export default {
  props: {
    pageTitle: {
      type: String,
      default: "Recent Transactions",
    },
    headers: {
      type: Array,
    },
    paginationData: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showSelect: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: "",
      selectedStatus: "All",
      rows: 10,
      selectAll: false,
      selectedRows: [],
      sortOrder: "newest",
      globals: useGlobalsStore(),
    };
  },
  components: {
    TableLoader,
    Pagination,
  },
  watch: {
    sortOrder(newVal) {
      this.sortByPaidDate(newVal === "newest" ? "desc" : "asc");
    },
    selectAll(value) {
      if (this.paginationData?.data) {
        this.selectedRows = value ? [...this.paginationData.data] : [];
      }
    },
    selectedRows: {
      handler(newValue) {
        if (this.paginationData?.data) {
          this.selectAll = newValue.length === this.paginationData.data.length;
        }
      },
      deep: true,
    },
  },
  methods: {
    handleRowClick(row) {
      this.$emit("row-click", row);
    },
    changePage(path) {
      this.$emit("page-change", path);
    },
    changeRowsPerPage(data) {
      this.rows = data;
      this.$emit("page-length", data);
    },
    changeSorting(order) {
      this.sortOrder = order;
    },
    sortByPaidDate(order = "asc") {
      if (this.paginationData?.data) {
        this.paginationData.data = [...this.paginationData.data].sort((a, b) => (order === "asc" ? new Date(a.paid_date) - new Date(b.paid_date) : new Date(b.paid_date) - new Date(a.paid_date)));
      }
    },
  },
  computed: {
    uniqueStatuses() {
      if (!this.paginationData?.data) return [];
      const statuses = this.paginationData.data.map((item) => item.status.toLowerCase());
      return ["All", ...new Set(statuses)];
    },
    filteredData() {
      if (!this.paginationData?.data) return [];
      console.log(this.paginationData?.data);
      return this.selectedStatus === "All" ? this.paginationData.data : this.paginationData.data.filter((item) => item.status.toLowerCase() === this.selectedStatus);
    },
  },
};
</script>

<style scoped>
.table-shadow {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
}
</style>
