<template>
  <DefaultLayout v-if="ajo" :HeaderTitle="ajo.name" :HeaderDescription="`Starting on ${formattedDate(ajo.start_date)}`">
    <template #rightContent>
      <div class="tw-flex tw-item-center tw-gap-2">
        <Button @click="handleContributionDialog" label="Make Contribution" class="tw-shrink-0 !tw-w-fit" />
        <Button label="Leave Ajo" color="danger" class="tw-shrink-0 !tw-w-fit" />
      </div>
    </template>

    <div class="tw-flex tw-flex-col-reverse xl:tw-grid tw-grid-cols-3 tw-gap-6">
      <div class="tw-col-span-2 tw-space-y-7">
        <div class="tw-bg-white tw-p-6 tw-border tw-border-[#E8EBEF] tw-space-y-6">
          <div class="tw-space-y-3">
            <h4 class="tw-flex tw-items-center tw-gap-2 tw-text-xl tw-text-[#0F1419]">
              <img class="tw-inline-block" src="/images/wallet.svg" alt="icon" />
              <span class="tw-capitalize">{{ ajo.name }}</span>
            </h4>
            <p class="tw-text-[#000000]">
              {{ ajo.description }}
            </p>
          </div>

          <div class="tw-space-y-3 sm:tw-space-y-6">
            <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Overall target amount</p>
                <h5 class="tw-text-2xl tw-text-black">{{ globalStore.toCurrency(ajo.total_contribution_expected) }}</h5>
              </div>
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Amount per person</p>
                <h5 class="tw-text-2xl tw-text-black">{{ globalStore.toCurrency(ajo.amount) }}</h5>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Frequency of contribution</p>
                <h5 class="tw-text-2xl tw-text-black">{{ getFrequency(ajo.start_date, ajo.end_date) }}</h5>
              </div>
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Starting date</p>
                <h5 class="tw-text-2xl tw-text-black">{{ formattedDate(ajo.start_date) }}</h5>
              </div>
            </div>
          </div>

          <div class="tw-space-y-1">
            <h4 lass="tw-text-lg tw-text-black tw-font-medium">Rules set by Admin</h4>
            <ul class="tw-list-disc tw-pl-4 tw-text-black tw-font-normal">
              <li>No participant can leave when contribution starts.</li>
              <li>No participant should invite someone unknown or untrustworthy.</li>
              <li>No participant can swap slot without requesting through admin.</li>
            </ul>
          </div>
        </div>
        <div>
          <RecentTransactionTable title="Group activities" />
        </div>
      </div>
      <div class="tw-col-span-1">
        <ParticipantsCard :participants="ajo.ajo_members" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAjoStore } from "@/stores/ajo.js";
import { useGlobalsStore } from "@/stores/globals.js";
import { helpers } from "@/helpers/utilities.js";
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import ParticipantsCard from "@/components/ParticipantsCard.vue";
import RecentTransactionTable from "@/components/RecentTransactionTable.vue";
import ContributionProcess from "@/components/Dialog/ContributionProcess.vue";

export default {
  components: {
    DefaultLayout,
    ParticipantsCard,
    RecentTransactionTable,
    Button,
    ContributionProcess,
    helpers,
  },

  setup() {
    const isMemeber = ref(null);
    const ajoStore = useAjoStore();
    const route = useRoute();
    const ajo = ref(null);
    const { formattedDate } = helpers;
    const globalStore = useGlobalsStore();

    const handleContributionDialog = () => {
      eventBus.emit("open-dialog", {
        default: ContributionProcess,
        position: "right",
      });
    };

    const getFrequency = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const timeDiff = end - start;

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (days > 365) {
        return "Yearly";
      } else if (days > 30) {
        return "Monthly";
      } else if (days > 7) {
        return "Weekly";
      } else {
        return "Daily";
      }
    };

    onMounted(async () => {
      ajo.value = await ajoStore.fetchAjoById(route.params.id);
    });

    return {
      ajo,
      isMemeber,
      globalStore,
      handleContributionDialog,
      formattedDate,
      getFrequency,
    };
  },
};
</script>

<style lang="scss" scoped></style>
