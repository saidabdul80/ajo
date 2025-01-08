<template>
  <div @click="$globals.to(`/contributions/${ajoId}`)" class="tw-max-w-full tw-bg-white tw-p-6 tw-rounded tw-shrink-0 tw-cursor-pointer">
    <div class="tw-space-y-2">
      <div class="tw-flex tw-justify-between tw-items-center">
        <p class="tw-text-[#C4C4C4]">{{ ajoType }}</p>
        <img class="tw-inline-block" src="/images/cart.svg" alt="icon" />
      </div>
      <h5 class="tw-font-medium tw-text-[22px] tw-capitalize">{{ ajoName }}</h5>
    </div>

    <div class="tw-py-5">
      <AvatarGroup>
        <Avatar v-for="(image, index) in images" :key="index" :image="image" size="large" shape="circle" />
      </AvatarGroup>
    </div>

    <div class="tw-space-y-2">
      <div class="tw-flex tw-items-center tw-justify-between tw-text-base md:tw-text-lg tw-text-[#6A6A6A]">
        <p>
          <span class="tw-text-black">{{ globalStore.toCurrency(ajoContributedAmount) }} contributed {{ " " }}</span>
          <span>of {{ globalStore.toCurrency(ajoTotalAmount) }}</span>
        </p>
        <p>{{ amountPercentage }} %</p>
      </div>
      <ProgressBar :value="parseInt(amountPercentage)" style="height: 9px" :show-value="false"></ProgressBar>
      <div class="tw-flex tw-justify-between tw-items-center tw-text-sm tw-text-[#6A6A6A]">
        <p class="tw-inline-flex tw-item-center tw-gap-2">
          <img class="tw-inline-block" src="/images/clock.svg" alt="icon" />
          <span class="">{{ ajoTimeline }} left</span>
        </p>
        <p>{{ ajoLastUpate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useGlobalsStore } from "@/stores/globals.js";
import ProgressBar from "primevue/progressbar";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";

export default {
  components: {
    ProgressBar,
    Avatar,
    AvatarGroup,
  },

  props: {
    ajoId: {
      type: Number,
      required: true,
    },
    ajoType: {
      type: String,
      required: true,
    },
    ajoName: {
      type: String,
      required: true,
    },
    ajoContributedAmount: {
      type: Number,
      default: 8000,
    },
    ajoTotalAmount: {
      type: Number,
      default: 12000,
    },
    ajoTimeline: {
      type: String,
    },
    ajoLastUpate: {
      type: String,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
    const globalStore = useGlobalsStore();

    const amountPercentage = computed(() => {
      if (props.ajoTotalAmount === 0) {
        return 0;
      }
      const percentage = (props.ajoContributedAmount / props.ajoTotalAmount) * 100;
      return percentage.toFixed(2);
    });

    return {
      globalStore,
      amountPercentage,
    };
  },
};
</script>

<style>
.p-progressbar {
  background-color: rgba(0, 0, 0, 0.16) !important;
}

.p-progressbar-value {
  background-color: #000000 !important;
}
</style>
