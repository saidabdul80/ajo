<template>
  <div class="tw-relative tw-h-[208px] tw-px-6 tw-pb-6 tw-pt-2 tw-overflow-hidden tw-w-full" :style="{ backgroundColor: backgroundColor }">
    <div class="ubt-slider tw-mb-3">
      <div class="ubt-slider-container">
        <i class="ph ph-question tw-text-lg tw-right-0 tw-cursor-pointer tw-absolute">
          <v-tooltip activator="parent" location="top">
            <span class="tw-text-xs">
              Slide next to view other
              <b>Ajo Balance</b>
            </span>
          </v-tooltip>
        </i>
        <div v-for="(ajo, index) in ajos" :key="index" class="ubt-slide">
          <p>{{ globals.toTitleCase(ajo.name) }}</p>
        </div>
      </div>
      <div @click="getCurrentIndex()" class="caret caret-left"><span class="pi pi-angle-left tw-text-lg"></span></div>
      <div @click="getCurrentIndex()" class="caret caret-right"><span class="pi pi-angle-right tw-text-lg"></span></div>
    </div>
    <div class="tw-flex tw-flex-col tw-gap-5 tw-justify-between tw-text-white tw-text-sm tw-mb-5">
      <p class="tw-text-lg tw-font-normal">{{ title }}</p>
      <span>
        <p class="tw-text-[40px] tw-mb-2 tw-block tw-text-white">{{ selectedAjo?.total_contribution }}</p>
        <p class="tw-ms-1 tw-font-semibold">{{ selectedAjo?.currency }}</p>
      </span>
      <div class="tw-absolute -tw-left-[0.09rem] -tw-bottom-[1px] tw-h-[144px] tw-w-full">
        <apexchart height="100%" width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>

<script>
import PButton from "@/components/Button.vue";

import VueApexCharts from "vue3-apexcharts";
import { Slider } from "@/plugins/slider";
import { useGlobalsStore } from "@/stores/globals";
export default {
  name: "AjoBalanceCard",
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
    ajos: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      globals: useGlobalsStore(),
      slider: {
        currentIndex: 0,
      },
      selectedAjo: null,
    };
  },
  methods: {
    onButtonClick() {
      this.$emit("button-click");
    },
    getCurrentIndex() {
      this.selectedAjo = this.ajos[this.slider.getCurrentIndex()];

      //return this.slider.getCurrentIndex();
    },
  },
  watch: {
    "$globals.ajos": function (newVal) {
      console.log(newVal, 3223);
      setTimeout(() => {
        this.slider = new Slider(".ubt-slider");
        this.selectedAjo = this.ajos[this.slider.getCurrentIndex()];
        console.log(this.slider);
      }, 1000);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
