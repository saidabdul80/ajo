<template>
  <div class="tw-bg-white tw-flex tw-flex-col tw-h-full">
    <div
      class="tw-flex tw-justify-between tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-5 tw-w-full tw-p-6 tw-border-b tw-border-[#DBDEE2CC]">
      <h3 class="tw-text-xl tw-text-[#0F1419]">Recent transactions</h3>

      <div
        class="tw-flex tw-flex-wrap lg:tw-flex-nowrap tw-items-center tw-gap-6">
        <div class="tw-relative tw-w-full">
          <i
            class="pi pi-search tw-absolute tw-top-2/4 -tw-translate-y-1/2 tw-left-4 tw-text-[#9C9FA8]"></i>
          <InputText
            type="text"
            v-model="value"
            variant="filled"
            class="!tw-pl-10 tw-w-full lg:tw-w-fit !tw-bg-[#F1F3F6] !tw-text-[#9C9FA8]"
            placeholder="Search transactions" />
        </div>
        <div class="tw-flex tw-gap-4 tw-w-full">
          <Select
            v-model="searchStatus"
            :options="status"
            placeholder="Status: All"
            class="tw-w-full lg:tw-w-fit" />
          <Select
            v-model="searchFilter"
            :options="filters"
            placeholder="Filter"
            class="tw-w-full lg:tw-w-fit" />
        </div>
      </div>
    </div>
    <div class="tw-p-6 tw-h-full tw-flex tw-justify-center tw-items-center">
      <div class="tw-text-center">
        <div>
          <img src="/images/no-transactions.svg" alt="icon" />
        </div>
        <h4 class="tw-text-[32px] tw-font-medium tw-text-[#0F1419] tw-pb-3">
          No transaction yet
        </h4>
        <p class="tw-text-base tw-font-normal tw-text-[#333333]">
          You will find history of your transactions here
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Select from "primevue/select";
import InputText from "primevue/inputtext";

export default {
  name: "RecentTransactionTable",
  components: {
    Select,
    InputText,
  },
  data() {
    return {
      searchStatus: null,
      searchFilter: null,
      status: ["All", "None"],
      filters: ["Date", "Time"],
    };
  },
};
</script>

<style></style>
