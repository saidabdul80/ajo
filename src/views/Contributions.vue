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
        <WalletBalanceCard title="Wallet Balance" balance="&#x20A6; 5,000.00" buttonLabel="Fund Wallet" :chartOptions="chartOptions" :series="series" />
        <WalletBalanceCard title="Total contribution" balance="&#x20A6; 0.00" :chartOptions="chartOptions" :series="series" background-color="#C1B2F2" />
      </div>

      <FiltersTab contentType="card" />
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

export default {
  components: {
    DefaultLayout,
    Notify,
    Button,
    WalletBalanceCard,
    AjoCard,
    FiltersTab,
  },

  data() {
    return {
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
