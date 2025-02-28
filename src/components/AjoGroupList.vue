<template>
  <div class="tw-flex tw-flex-col tw-basis-full">
    <div class="tw-flex tw-justify-between tw-bg-white tw-items-center tw-mb-3 tw-px-6 tw-py-6 tw-text-[#0F1419] tw-border-b">
      <h4 class="tw-font-medium tw-text-xl">Ajo Groups</h4>
      <span @click="globals.to('contributions')" class="tw-font-bold tw-text-lg tw-cursor-pointer">See all</span>
    </div>
    <div v-if="globals.ajos.length == 0" class="tw-flex tw-flex-col tw-justify-center tw-bg-white tw-items-center tw-h-full tw-py-8">
      <div>
        <img src="/images/groups.svg" alt="icon" />
      </div>
      <h5 class="tw-text-2xl tw-text-[#0F1419] tw-font-medium tw-pb-2">No Ajo group yet</h5>

      <p class="tw-max-w-[30ch] tw-text-center tw-text-[#333333]">You will find the ajo groups you have joined here</p>
    </div>
    <div v-else :class="['tw-max-w-full tw-text-[#333333] tw-overflow-y-auto', contentHeight]">
      <AjoCard class="tw-mb-2" v-for="ajo in globals.ajos" :key="ajo.id" :ajo="ajo" />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useGlobalsStore } from "@/stores/globals";
import AjoCard from "./AjoCard.vue";

export default {
  name: "AjoGroupList",
  components: {
    AjoCard,
  },
  props: {
    contentHeight: {
      type: String,
    },
  },
  setup() {
    const globals = useGlobalsStore();

    onMounted(async () => {
      await globals.fetchMyAjos();
    });

    return {
      globals,
    };
  },
};
</script>
