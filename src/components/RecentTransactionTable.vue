<template>
  <div class="tw-bg-white tw-flex tw-flex-col tw-h-fit tw-border tw-border-[#DBDEE2CC]">
    <div class="tw-flex tw-justify-between tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-5 tw-w-full tw-p-6 tw-border-b tw-border-[#DBDEE2CC]">
      <h3 class="tw-text-xl tw-text-[#0F1419]">{{ title }}</h3>

      <div class="tw-flex tw-flex-wrap lg:tw-flex-nowrap tw-items-center tw-gap-6">
        <div class="tw-relative tw-w-full">
          <i class="pi pi-search tw-absolute tw-top-2/4 -tw-translate-y-1/2 tw-left-4 tw-text-[#9C9FA8]"></i>
          <InputText type="text" variant="filled" class="!tw-pl-10 tw-w-full lg:tw-w-fit !tw-bg-[#F1F3F6] !tw-text-[#9C9FA8]" placeholder="Search transactions" />
        </div>
        <div class="tw-flex tw-gap-4 tw-w-full">
          <Select v-model="searchStatus" :options="status" placeholder="Status: All" class="tw-w-full lg:tw-w-fit" />
          <Select v-model="searchFilter" :options="filters" placeholder="Filter" class="tw-w-full lg:tw-w-fit" />
        </div>
      </div>
    </div>
    <div v-if="contributors.length <= 0" class="tw-p-10 tw-h-full tw-flex tw-justify-center tw-items-center">
      <div class="tw-text-center">
        <div>
          <img src="/images/no-transactions.svg" alt="icon" />
        </div>
        <h4 class="tw-text-[32px] tw-font-medium tw-text-[#0F1419] tw-pb-3">No transaction yet</h4>
        <p class="tw-text-base tw-font-normal tw-text-[#333333]">You will find history of your transactions here</p>
      </div>
    </div>

    <div v-if="contributors.length > 0">
      <DataTable :value="contributors" paginator :rows="4" tableStyle="min-width: 40rem">
        <Column field="name" header="Ajo Name">
          <template #body="slotProps">
            <div class="tw-inline-flex tw-items-center tw-gap-3">
              <Avatar :image="slotProps.data.image" shape="circle" class="!tw-h-10 !tw-w-10 tw-flex-shrink-0" />
              <p>{{ slotProps.data.name }}</p>
            </div>
          </template>
        </Column>
        <Column field="memberName" header="Member Name"></Column>
        <Column field="type" header="Payment Type"></Column>
        <Column field="amount" header="Amount">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.amount) }}
          </template>
        </Column>
        <Column field="date" header="Date"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Avatar from "primevue/avatar";

export default {
  name: "RecentTransactionTable",
  components: {
    Select,
    InputText,
    DataTable,
    Column,
    Tag,
    Avatar,
  },
  props: {
    title: {
      type: String,
      default: "Recent activities",
    },
  },
  data() {
    return {
      searchStatus: null,
      searchFilter: null,
      status: ["All", "None"],
      filters: ["Date", "Time"],

      contributors: [
        {
          id: "CWR93768Y43",
          name: "Rhoda Ogunesan",
          memberName: "Amos Bamidele",
          date: "Nov 8, 10:35 AM",
          type: "Withdrawal",
          amount: 34244,
          image: "/images/avatar.png",
        },
        {
          id: "CWR12345A67",
          name: "James Smith",
          memberName: "Ezekiel Badmus",
          date: "Nov 9, 2:15 PM",
          type: "Deposit",
          amount: 12000,
          image: "/images/avatar.png",
        },
        {
          id: "CWR98765B78",
          name: "Linda Johnson",
          memberName: "Henry Paul",
          date: "Nov 10, 11:30 AM",
          type: "Withdrawal",
          amount: 5400,
          image: "/images/avatar.png",
        },
        {
          id: "CWR54321C89",
          name: "Michael Brown",
          memberName: "Michael King",
          date: "Nov 11, 9:45 AM",
          type: "Deposit",
          amount: 28750,
          image: "/images/avatar.png",
        },
        {
          id: "CWR76543D90",
          name: "Sarah Davis",
          memberName: "Peter Pan",
          date: "Nov 12, 3:00 PM",
          type: "Withdrawal",
          amount: 1000,
          image: "/images/avatar.png",
        },
        {
          id: "CWR45678E01",
          name: "David Wilson",
          memberName: "Amos Luke",
          date: "Nov 13, 4:20 PM",
          type: "Deposit",
          amount: 10500,
          image: "/images/avatar.png",
        },
        {
          id: "CWR67890F12",
          name: "Emma Garcia",
          memberName: "Amos Luke",
          date: "Nov 14, 1:00 PM",
          type: "Withdrawal",
          amount: 8750,
          image: "/images/avatar.png",
        },
        {
          id: "CWR23456G23",
          name: "Sophia Martinez",
          memberName: "Amos Luke",
          date: "Nov 15, 5:10 PM",
          type: "Deposit",
          amount: 15000,
          image: "/images/avatar.png",
        },
        {
          id: "CWR34567H34",
          name: "William Rodriguez",
          memberName: "Amos Luke",
          date: "Nov 16, 8:15 AM",
          type: "Withdrawal",
          amount: 2500,
          image: "/images/avatar.png",
        },
      ],
    };
  },

  methods: {
    formatCurrency(value) {
      return value.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      });
    },
  },
};
</script>

<style></style>
