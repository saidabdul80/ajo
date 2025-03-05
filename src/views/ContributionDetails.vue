<template>
  <DefaultLayout v-if="ajo" :HeaderTitle="ajo.name" :HeaderDescription="`Starting on ${formattedDate(ajo.start_date)}`">
    <template #rightContent>
      <div class="tw-flex tw-item-center tw-gap-2">
        <Button v-if="isPastDate" @click="handleContributionDialog" label="Make Contribution" class="tw-shrink-0 !tw-w-fit" />
        <Button v-else @click="handleLeaveDeleteAjo" label="Leave Ajo" color="danger" class="tw-shrink-0 !tw-w-fit" />
      </div>
    </template>

    <div class="tw-flex tw-flex-col-reverse xl:tw-grid tw-grid-cols-3 tw-gap-6">
      <div class="tw-col-span-2 tw-space-y-7">
        <div class="tw-bg-white tw-p-6 tw-border tw-border-[#E8EBEF] tw-space-y-6">
          <div class="tw-relative tw-space-y-3">
            <button
              v-if="!hasContributionStarted"
              @click="navigateToStartAjo"
              type="button"
              class="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-absolute tw-right-0 tw-top-3 tw-cursor-pointer">
              <i class="pi pi-file-edit"></i>
              <span>Edit Ajo</span>
            </button>
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
                <h5 class="tw-text-2xl tw-text-black">{{ globalStore.formatNumber(ajo.total_contribution_expected) }}</h5>
              </div>
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Amount per person</p>
                <h5 class="tw-text-2xl tw-text-black">{{ globalStore.formatNumber(ajo.amount) }}</h5>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Frequency of contribution</p>
                <h5 class="tw-text-2xl tw-text-black">{{ ajo.frequency_name }}</h5>
              </div>
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Starting date</p>
                <h5 class="tw-text-2xl tw-text-black">{{ formattedDate(ajo.start_date) }}</h5>
              </div>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">End date</p>
                <h5 class="tw-text-2xl tw-text-black">{{ formattedDate(ajo.end_date) }}</h5>
              </div>

              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">My total contributed Amount</p>

                <h5 class="tw-text-2xl tw-text-black">{{ globalStore.formatNumber(ajo.total_contribution) }}</h5>
              </div>
            </div>

            <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
              <div class="tw-space-2">
                <p class="tw-text-sm tw-text-[#333333]">Maturity Period</p>
                <h5 class="tw-text-2xl tw-text-black">{{ ajo.my_detail?.missed }}</h5>
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
          <RecentTransactionTable tableTitle="Group activities" ref="recentTransactionTableRef" />
        </div>
      </div>
      <div class="tw-col-span-1">
        <ParticipantsCard :participants="ajo.ajo_members" :ajo-id="ajo.id" :isAjoOwner="isAjoOwner" />
      </div>
    </div>
  </DefaultLayout>

  <div v-else class="tw-flex tw-flex-col tw-gap-6 tw-p-6">
    <!-- Header Skeleton -->
    <div class="tw-space-y-4">
      <Skeleton height="4rem" width="30%" />
      <Skeleton height="2rem" width="50%" />
    </div>

    <!-- Details Skeleton -->
    <div class="tw-bg-white tw-p-6 tw-border tw-border-gray-300 tw-rounded-md tw-space-y-6">
      <div class="tw-space-y-4">
        <Skeleton height="1.5rem" width="40%" />
        <Skeleton height="2rem" width="100%" />
        <Skeleton height="2rem" width="70%" />
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-6">
        <Skeleton height="4rem" width="100%" />
        <Skeleton height="4rem" width="100%" />
      </div>
      <div class="tw-grid tw-grid-cols-2 tw-gap-6">
        <Skeleton height="4rem" width="100%" />
        <Skeleton height="4rem" width="100%" />
      </div>
    </div>

    <!-- Participants Skeleton -->
    <div class="tw-bg-white tw-p-6 tw-border tw-border-gray-300 tw-rounded-md">
      <div class="tw-mb-4">
        <Skeleton height="1.5rem" width="25%" />
      </div>
      <div class="tw-space-y-4">
        <Skeleton v-for="i in 3" :key="i" height="4rem" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAjoStore } from "@/stores/ajo.js";
import eventBus from "@/eventBus";
import { useGlobalsStore } from "@/stores/globals.js";
import { useUserStore } from "@/stores/user.js";
import { helpers } from "@/helpers/utilities.js";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import ParticipantsCard from "@/components/ParticipantsCard.vue";
import RecentTransactionTable from "@/components/RecentTransactionTable.vue";
import ContributionProcess from "@/components/Dialog/ContributionProcess.vue";
import { useNotificationStore } from "@/stores/notification";
import { useClient } from "@/stores/client";
import Skeleton from "primevue/skeleton";
import DeleteAjoDialog from "@/components/Dialog/DeleteAjoDialog.vue";

export default {
  components: {
    DefaultLayout,
    ParticipantsCard,
    RecentTransactionTable,
    Button,
    ContributionProcess,
    helpers,
    Skeleton,
  },
  setup() {
    const route = useRoute();
    const ajoStore = useAjoStore();
    const globalStore = useGlobalsStore();
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();
    const client = useClient();
    const user = computed(() => userStore.user);
    const router = useRouter();
    const recentTransactionTableRef = ref(null);

    const ajo = ref(null);
    const isMemeber = ref(null);
    const isAjoOwner = ref(false);
    const { formattedDate } = helpers;

    const fetchAjoDetails = async () => {
      const res = await ajoStore.fetchAjoById(route.params.id);
      if (res) {
        ajo.value = res;
        isAjoOwner.value = ajo.value?.user_id === user.value.id;
      } else {
        router.push("/app/contributions");
      }
    };

    const handleContributionDialog = async () => {
      const res = await client.http({
        path: "/make/contribution",
        method: "POST",
        data: {
          ajo_id: route.params.id,
        },
      });
      if (res) {
        notificationStore.showNotification({
          type: "success",
          message: res,
        });
        recentTransactionTableRef.value.getTransactions();
      }
    };

    const handleLeaveDeleteAjo = async () => {
      eventBus.emit("open-dialog", {
        default: DeleteAjoDialog,
        position: "center",
        props: {
          user: user.value,
          ajo: ajo.value,
        },
      });
    };

    // Get frequency
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

    const navigateToStartAjo = () => {
      globalStore.to(`/app/start/${route.params.id}`);
    };

    const hasContributionStarted = computed(() => {
      return !!parseInt(ajo.value.total_contribution);
    });

    const isPastDate = computed(() => {
      return new Date(ajo.value.start_date) < new Date();
    });

    fetchAjoDetails();

    return {
      ajo,
      isMemeber,
      isAjoOwner,
      formattedDate,
      globalStore,
      getFrequency,
      handleContributionDialog,
      navigateToStartAjo,
      hasContributionStarted,
      handleLeaveDeleteAjo,
      isPastDate,
      recentTransactionTableRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
