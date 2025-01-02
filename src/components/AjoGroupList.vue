<template>
  <div class="tw-bg-white tw-flex tw-flex-col tw-border tw-border-[#E8EBEF]">
    <div class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-text-[#0F1419] tw-border-b">
      <h4 class="tw-font-medium tw-text-xl">Ajo Groups</h4>
      <div @click="$globals.to('contributions')" class="tw-font-bold tw-text-lg tw-cursor-pointer">See all</div>
    </div>
    <div v-if="globals.ajos.length == 0" class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full tw-py-10">
      <div>
        <img src="/images/groups.svg" alt="icon" />
      </div>
      <h5 class="tw-text-2xl tw-text-[#0F1419] tw-font-medium tw-pb-2">No Ajo group yet</h5>

      <p class="tw-max-w-[30ch] tw-text-center tw-text-[#333333]">You will find the ajo groups you have joined here</p>
    </div>
    <ul v-else class="tw-max-w-full tw-overflow-hidden">
      <li v-for="ajo in globals.ajos.slice(0, 2)" :key="ajo.id" class="tw-border tw-border-[#E8EBEF] tw-rounded-lg tw-overflow-hidden">
        <AjoCard
          :ajoId="ajo.id"
          :ajoType="ajo.category"
          :ajoName="ajo.name"
          :ajoContributedAmount="parseFloat(ajo.total_contribution)"
          :ajoTotalAmount="parseFloat(ajo.total_contribution_expected)"
          :ajoTimeline="ajo.time_left"
          :ajoLastUpate="ajo.last_contributed_time"
          :images="['/images/avatar.png', '/images/avatar.png', '/images/avatar.png', '/images/avatar.png', '/images/avatar.png']" />
      </li>
    </ul>
  </div>
</template>

<script>
import { useGlobalsStore } from "@/stores/globals";

import Chip from "primevue/chip";
import AjoCard from "./AjoCard.vue";

export default {
  name: "AjoGroupList",
  data() {
    return {
      globals: useGlobalsStore(),
    };
  },
  created() {
    this.globals.fetchMyAjos();
  },
  methods: {},
  components: {
    Chip,
    AjoCard,
  },
};
</script>
