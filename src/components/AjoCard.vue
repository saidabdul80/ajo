<template>
  <div @click="$globals.to(`${pagePath}/${ajo.id}`)" :class="[isWidthFull ? 'tw-h-full' : 'tw-h-fit', 'tw-max-w-full tw-bg-white tw-p-6 tw-rounded tw-shrink-0 tw-cursor-pointer tw-border']">
    <div class="tw-space-y-2">
      <div class="tw-flex tw-justify-between tw-items-center">
        <p class="tw-text-[#C4C4C4]">{{ ajo.category ? ajo.category : "" }}</p>
        <img class="tw-inline-block" src="/images/cart.svg" alt="icon" />
      </div>
      <h5 class="tw-font-medium tw-text-[22px] tw-capitalize">{{ ajo.name }}</h5>
    </div>

    <div class="tw-py-5">
      <div>
        <AvatarGroup>
          <Avatar
            v-for="(member, index) in ajo.ajo_members"
            :key="index"
            :label="!member?.user?.picture_url || !member?.user?.imageError ? getInitials(member?.user?.full_name) : null"
            :image="member?.user?.imageError ? member?.user?.picture_url : null"
            :alt="member?.user?.full_name"
            size="large"
            shape="circle"
            :style="{
              backgroundColor: !member?.user?.picture_url || !member?.user?.imageError ? getColorFromWord(getInitials(member?.user?.full_name)) : null,
              color: !member?.user?.picture_url || !member?.user?.imageError ? '#ffff' : null,
              fontSize: !member?.user?.picture_url || !member?.user?.imageError ? '14px' : null,
            }"
            @error="handleImageError(index)" />
        </AvatarGroup>
      </div>
    </div>

    <div class="tw-space-y-2">
      <div class="tw-flex tw-items-center tw-justify-between tw-text-base tw-text-[#6A6A6A]">
        <p>
          <span class="tw-text-black">
            {{ globalStore.toCurrency(ajo.total_contribution, false) }}
            <span class="tw-ml-0 tw-text-xs tw-font-bold">{{ currency }}</span>
            contributed {{ " " }}
          </span>
          <span>
            of {{ globalStore.toCurrency(ajo.total_contribution_expected, false) }}
            <span class="tw-ml-0 tw-text-xs tw-font-bold">{{ currency }}</span>
          </span>
        </p>
        <p class="tw-ml-1 tw-text-xs">{{ amountPercentage }} %</p>
      </div>
      <ProgressBar :value="parseInt(amountPercentage)" style="height: 9px" :show-value="false"></ProgressBar>
      <div class="tw-flex tw-justify-between tw-items-center tw-text-sm tw-text-[#6A6A6A]">
        <p class="tw-inline-flex tw-item-center tw-gap-2">
          <img class="tw-inline-block" src="/images/clock.svg" alt="icon" />
          <span class="">{{ ajo.time_left }} left</span>
        </p>
        <p>{{ ajo.last_contributed_time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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
    ajo: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      default: "CAD",
    },
    isWidthFull: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      default: () => [],
    },

    pagePath: {
      type: String,
      default: "/contributions",
    },
  },

  setup(props) {
    const globalStore = useGlobalsStore();

    const amountPercentage = computed(() => {
      if (props.ajo.total_contribution_expected === 0) {
        return 0;
      }
      const percentage = (props.ajo.total_contribution / props.ajo.total_contribution_expected) * 100;
      return percentage.toFixed(1);
    });

    const getInitials = (fullName) => {
      if (!fullName) return "";
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0].charAt(0).toUpperCase();
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : "";

      return firstName + lastName;
    };

    // Convert word to ASCII sum
    const getAsciiSum = (word) => {
      return word.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    };

    // Generate HSL color from the initials
    const getColorFromWord = (word) => {
      const asciiSum = getAsciiSum(word);

      // Use a base color hue and adjust for more variation
      const hue = (asciiSum * 137) % 360; // 137 is a prime number to spread out hues

      // Use a higher saturation and varied lightness for deeper colors
      const saturation = 70; // Increase saturation for vibrant colors
      const lightness = 45 + (asciiSum % 20); // Vary lightness to add more depth

      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    // Handle image error and show initials
    const handleImageError = (index) => {
      member.user.imageError = true;
    };

    return {
      globalStore,
      amountPercentage,
      getColorFromWord,
      getInitials,
      handleImageError,
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
