<template>
  <DefaultLayout>
    <div class="tw-mb-7">
      <Notify message="Rhoda Ogunesan has invited you to join Ajo group." type="warning">
        <template #end>
          <Button label="View Ajo details" size="small" />
        </template>
      </Notify>
    </div>
    <div class="tw-flex tw-flex-col tw-h-full">
      <div class="tw-flex tw-gap-7 tw-items-center tw-flex-wrap xl:tw-flex-nowrap tw-mb-7">
        <WalletBalanceCard
          @button-click="handleFundWallet"
          title="Wallet Balance"
          :currency="userStore.user?.my_wallet?.currency"
          :balance="userStore.user?.my_wallet?.balance || 0"
          buttonLabel="Fund Wallet"
          :chartOptions="chartOptions"
          :series="series" />
        <AjoBalanceCard :ajos="sortedAjos" title="Total contribution" balance="&#x20A6; 0.00" :chartOptions="chartOptions" :series="series" background-color="#C1B2F2" />
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

      <div v-if="ajos.length == 0" class="tw-flex tw-flex-col tw-justify-center tw-bg-white tw-items-center tw-h-[500px] tw-py-8">
        <div>
          <img src="/images/groups.svg" alt="icon" />
        </div>
        <h5 class="tw-text-2xl tw-text-[#0F1419] tw-font-medium tw-pb-2">No Contributions yet</h5>

        <p class="tw-max-w-[30ch] tw-text-center tw-text-[#333333]">You will find the contributions you have started here</p>
      </div>

      <div v-else class="tw-grid md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-4 tw-mt-4">
        <AjoCard class="tw-mb-2" v-for="ajo in sortedAjos" :key="ajo.id" :ajo="ajo" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { ref, computed, onMounted, defineComponent, watch } from "vue";
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

export default defineComponent({
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
  setup() {
    const globals = useGlobalsStore();
    const userStore = useUserStore();

    const selectedStatus = ref("All");
    const statusOptions = ref(["All", "Type"]);
    const ajos = ref([]);
    const sortedAjos = ref([]);

    const series = ref([
      {
        name: "Balance",
        data: [0, 1, 3, 2, 7, 4, 6],
      },
    ]);

    const chartOptions = computed(() => ({
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
      xaxis: { labels: { show: false } },
      yaxis: { labels: { show: false } },
      tooltip: { enabled: true },
    }));

    const handleFundWallet = () => {
      eventBus.emit("open-dialog", {
        default: FundWalletDialog,
        title: "Fund wallet",
        position: "right",
      });
    };

    const handlePillSelection = (value) => {
      sortedAjos.value = [...ajos.value].sort((a, b) => {
        if (value === "Newest") return b.id - a.id;
        if (value === "Oldest") return a.id - b.id;
      });
    };

    onMounted(async () => {
      ajos.value = await globals.fetchMyAjos();
      sortedAjos.value = [...ajos.value];
    });

    watch(ajos, (newAjos) => {
      sortedAjos.value = [...newAjos];
    });

    return {
      ajos,
      sortedAjos,
      globals,
      userStore,
      selectedStatus,
      statusOptions,
      series,
      chartOptions,
      handleFundWallet,
      handlePillSelection,
    };
  },
});
</script>
