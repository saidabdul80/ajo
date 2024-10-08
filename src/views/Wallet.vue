<template>
  <DefaultLayout>
    <div class="tw-flex tw-flex-col tw-space-y-10">
      <div
        class="tw-bg-white tw-border tw-border-[#DBDEE2CC] tw-rounded-[5px] tw-p-3 tw-h-[280px]">
        <div
          class="tw-flex tw-flex-col tw-justify-between tw-h-full tw-bg-[#C1B2F2] tw-w-full tw-rounded-[5px] tw-p-6">
          <div class="tw-font-semibold">
            <p class="tw-text-xs">Wallet balance &#8226; 6 Gropus</p>
            <h2 class="tw-text-[32px]">
              ₦5,000,000 <span class="tw-text-base">NGN</span>
            </h2>
          </div>

          <div
            class="tw-inline-flex tw-flex-wrap sm:tw-flex-nowrap tw-items-center tw-gap-3">
            <Button
              @click="handleWithdrawal"
              label="Withdraw from wallet"
              color="secondary"
              :outlined="true"
              class="!tw-text-black sm:!tw-w-fit" />
            <Button
              @click="handleFundWallet"
              label="Fund Wallet"
              class="sm:!tw-w-fit" />
          </div>
        </div>
      </div>

      <div>
        <FiltersTab contentType="table" title="Wallet activities" />
      </div>

      <ActionMenu />
    </div>
  </DefaultLayout>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import FundWalletDialog from "@/components/Dialog/FundWalletDialog.vue";
import FiltersTab from "@/components/FiltersTab.vue";
import WithdrawalDialog from "@/components/Dialog/WithdrawalDialog.vue";
import ActionMenu from "@/components/ActionMenu.vue";

export default {
  components: {
    DefaultLayout,
    FiltersTab,
    WithdrawalDialog,
    FundWalletDialog,
    Button,
    ActionMenu,
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

  methods: {
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
