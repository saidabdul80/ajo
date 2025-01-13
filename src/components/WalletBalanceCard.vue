<template>
  <div class="tw-relative tw-h-[208px] tw-p-6 tw-overflow-hidden tw-w-full" :style="{ backgroundColor: backgroundColor }">
    <div class="tw-flex tw-items-center tw-justify-between tw-text-white tw-text-sm tw-mb-5">
      <p class="tw-text-lg tw-font-normal">{{ title }}</p>
      <PButton v-if="buttonLabel" :label="buttonLabel" color="secondary" size="xsmall" :is-full-width="false" :rounded="false" @click="onButtonClick" />
    </div>
    <p class="tw-text-[40px] tw-gap-1 tw-text-white tw-flex tw-items-baseline">
      {{ $globals.formatNumber(balance) }}
      <span class="tw-text-sm">{{ currency }}</span>
    </p>

    <div class="tw-absolute -tw-left-[0.09rem] -tw-bottom-[1px] tw-h-[144px] tw-w-full">
      <apexchart height="100%" width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import PButton from "@/components/Button.vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "WalletBalanceCard",
  components: {
    PButton,
    apexchart: VueApexCharts,
  },
  props: {
    title: {
      type: String,
      default: "Wallet Balance",
    },
    balance: {
      type: String,
      default: "N0.00",
    },
    buttonLabel: {
      type: String,
      default: "",
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
    series: {
      type: Array,
      default: () => [],
    },
    backgroundColor: {
      type: String,
      default: "#000000",
    },
    currency: {
      type: String,
      default: "CAD",
    },
  },
  methods: {
    onButtonClick() {
      this.$emit("button-click");
    },
  },
};
</script>

<style scoped></style>
