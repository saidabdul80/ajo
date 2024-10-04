<template>
  <div
    class="tw-flex tw-flex-col tw-gap-3 md:tw-flex-row md:tw-items-center tw-justify-between tw-bg-white tw-p-6 tw-border tw-border-[#DBDEE2CC]">
    <h4 class="tw-text-xl tw-text-black">{{ title }}</h4>
    <div class="tw-flex tw-flex-col tw-gap-3 md:tw-flex-row md:tw-items-center">
      <div>
        <label> Status: </label>
        <Select
          placeholder="All"
          :options="statusOptions"
          @change="hndleStatusSelection"
          class="tw-w-fit !tw-shadow-none !tw-rounded-2xl !tw-border-none !tw-bg-transparent" />
      </div>

      <Pills
        :buttonsTitle="['Newest', 'Oldest']"
        @pill-selected="handlePillSelection" />
    </div>
  </div>

  <div
    v-if="contentType == 'card'"
    class="tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4 tw-mt-4">
    <AjoCard
      v-for="(data, idx) in ajoContributions"
      :key="data.ajoType"
      :ajoId="data.id"
      :ajoType="data.ajoType"
      :ajoName="data.ajoName"
      :ajoContributedAmount="data.ajoContributedAmount"
      :ajoTotalAmount="data.ajoTotalAmount"
      :ajoTimeline="data.ajoTimeline"
      :ajoLastUpate="data.ajoLastUpate"
      :images="data.images" />
  </div>
  <div
    v-if="contentType == 'table'"
    class="tw-border-b tw-border-l tw-border-r tw-border-[#DBDEE2CC]">
    <DataTable
      :value="contributors"
      paginator
      :rows="3"
      tableStyle="min-width: 60rem">
      <Column field="name" header="Account Name">
        <template #body="slotProps">
          <div class="tw-inline-flex tw-items-center tw-gap-3">
            <Avatar
              :image="slotProps.data.image"
              shape="circle"
              class="!tw-h-10 !tw-w-10" />
            <p>{{ slotProps.data.name }}</p>
          </div>
        </template>
      </Column>
      <Column field="date" header="Date"></Column>
      <Column field="id" header="Transaction ID"></Column>
      <Column field="type" header="Transaction Type"></Column>
      <Column field="amount" header="Amount">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.amount) }}
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)" />
        </template>
      </Column>
      <Column header=""></Column>
    </DataTable>
  </div>
</template>

<script>
import Pills from "@/components/Pills.vue";
import Select from "primevue/select";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import AjoCard from "./AjoCard.vue";
import Tag from "primevue/tag";
import Avatar from "primevue/avatar";

export default {
  components: {
    Select,
    Pills,
    AjoCard,
    DataTable,
    Column,
    Tag,
    Avatar,
  },

  props: {
    contentType: {
      type: String,
      required: true,
      validator: (value) => ["card", "table"].includes(value),
    },

    title: {
      type: String,
      default: "Your Contributions",
    },
  },

  data() {
    return {
      statusOptions: ["All", "Type"],
      contributors: [
        {
          id: "CWR93768Y43",
          name: "Rhoda Ogunesan",
          date: "Nov 8, 10:35 AM",
          type: "Withdrawal",
          amount: 34244,
          status: "pending",
          image: "/images/avatar.png",
        },
        {
          id: "CWR12345A67",
          name: "James Smith",
          date: "Nov 9, 2:15 PM",
          type: "Deposit",
          amount: 12000,
          status: "successful",
          image: "/images/avatar.png",
        },
        {
          id: "CWR98765B78",
          name: "Linda Johnson",
          date: "Nov 10, 11:30 AM",
          type: "Withdrawal",
          amount: 5400,
          status: "failed",
          image: "/images/avatar.png",
        },
        {
          id: "CWR54321C89",
          name: "Michael Brown",
          date: "Nov 11, 9:45 AM",
          type: "Deposit",
          amount: 28750,
          status: "pending",
          image: "/images/avatar.png",
        },
        {
          id: "CWR76543D90",
          name: "Sarah Davis",
          date: "Nov 12, 3:00 PM",
          type: "Withdrawal",
          amount: 1000,
          status: "successful",
          image: "/images/avatar.png",
        },
        {
          id: "CWR45678E01",
          name: "David Wilson",
          date: "Nov 13, 4:20 PM",
          type: "Deposit",
          amount: 10500,
          status: "pending",
          image: "/images/avatar.png",
        },
        {
          id: "CWR67890F12",
          name: "Emma Garcia",
          date: "Nov 14, 1:00 PM",
          type: "Withdrawal",
          amount: 8750,
          status: "successful",
          image: "/images/avatar.png",
        },
        {
          id: "CWR23456G23",
          name: "Sophia Martinez",
          date: "Nov 15, 5:10 PM",
          type: "Deposit",
          amount: 15000,
          status: "pending",
          image: "/images/avatar.png",
        },
        {
          id: "CWR34567H34",
          name: "William Rodriguez",
          date: "Nov 16, 8:15 AM",
          type: "Withdrawal",
          amount: 2500,
          status: "successful",
          image: "/images/avatar.png",
        },
      ],
      ajoContributions: [
        {
          id: 1,
          ajoType: "Savings Group",
          ajoName: "My Ajo 1",
          ajoContributedAmount: 80000,
          ajoTotalAmount: 120000,
          ajoTimeline: "2 weeks",
          ajoLastUpate: "3 days",
          images: [
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
          ],
        },
        {
          id: 2,
          ajoType: "Investment Group",
          ajoName: "Investment Ajo",
          ajoContributedAmount: 50000,
          ajoTotalAmount: 100000,
          ajoTimeline: "1 month",
          ajoLastUpate: "5 days",
          images: [
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
          ],
        },
        {
          id: 3,
          ajoType: "Cooperative",
          ajoName: "Cooperative Ajo",
          ajoContributedAmount: 30000,
          ajoTotalAmount: 60000,
          ajoTimeline: "1 week",
          ajoLastUpate: "2 days",
          images: [
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
          ],
        },
        {
          id: 4,
          ajoType: "Loan Group",
          ajoName: "Loan Ajo",
          ajoContributedAmount: 100000,
          ajoTotalAmount: 200000,
          ajoTimeline: "3 weeks",
          ajoLastUpate: "1 day",
          images: [
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
            "/images/avatar.png",
          ],
        },
      ],
    };
  },

  methods: {
    handlePillSelection(value) {
      console.log(value);
    },

    hndleStatusSelection(e) {
      console.log(e.value);
    },
    formatCurrency(value) {
      return value.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
      });
    },

    getSeverity(status) {
      switch (status) {
        case "successful":
          return "success";

        case "pending":
          return "secondary";

        case "failed":
          return "danger";

        default:
          return null;
      }
    },
  },
};
</script>

<style>
.p-datatable-header-cell {
  background-color: #faf9f9 !important;
  font-size: 16px;
  color: #000;
  height: 60px;
}

.p-datatable-tbody > tr {
  height: 70px;
}
</style>
