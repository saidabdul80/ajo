<template>
  <DefaultLayout HeaderTitle="Notifications" HeaderDescription="View all notifications here" heightStyle="tw-h-full">
    <div class="tw-bg-white tw-h-full tw-border tw-border-[#DBDEE2CC] tw-flex tw-flex-col">
      <!-- Pills for filtering notifications -->
      <div class="tw-p-6 tw-border-b tw-border-[#DBDEE2CC] tw-flex tw-items-center tw-justify-between">
        <Pills :buttonsTitle="['All', 'Unread']" @pill-selected="onPillSelected" />
        <Pills :buttonsTitle="['Newest', 'Oldest']" @pill-selected="onPillSelected" />
      </div>

      <!-- Notifications Content -->
      <div class="tw-overflow-y-auto tw-h-full">
        <div v-if="!notificationLists.length" class="tw-flex tw-flex-col tw-text-center tw-gap-8 tw-justify-center tw-items-center tw-h-full">
          <img class="tw-inline-block" src="/images/No-notifications.svg" alt="icon" />
          <div>
            <h3 class="tw-text-[32px] tw-text-black">No notifications yet</h3>
            <p class="tw-text-[#333333]">There's nothing to notify you about at the moment</p>
          </div>
        </div>

        <!-- Notification List -->
        <ul v-else>
          <li v-for="(data, idx) in notificationLists" :key="idx" class="tw-flex tw-items-center tw-gap-4 tw-justify-between tw-border-b tw-border-[#DBDEE2CC] tw-p-6">
            <div class="tw-flex tw-items-center tw-gap-9 tw-text-[#333333]">
              <div class="tw-relative tw-w-10 tw-h-10 tw-border tw-border-[#E8EBEF] tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-shrink-0">
                <img class="tw-inline-block" src="/images/menu-board.svg" alt="icon" />
                <span v-if="data.status === 'unread'" class="tw-absolute -tw-top-1 -tw-right-1 tw-h-2 tw-w-2 tw-rounded-full tw-bg-[#E50A3E] tw-border tw-border-[#E50A3E]"></span>
              </div>
              <span class="tw-text-black tw-font-medium">{{ data.title }}</span>
              <span>{{ data.message }}</span>
            </div>
            <div class="tw-flex tw-items-center tw-justify-between tw-basis-2/5 tw-flex-shrink-0">
              <button class="tw-font-medium">{{ data.action }}</button>
              <span>{{ data.time }} minutes ago</span>
              <button class="tw-font-medium">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.6515 15.9987H22.6635" stroke="#292D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16.3234 15.9987H16.3354" stroke="#292D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.98747 15.9987H9.99944" stroke="#292D32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Pills from "@/components/Pills.vue";
import ConfirmPopup from "primevue/confirmpopup";

export default {
  components: {
    DefaultLayout,
    Pills,
    ConfirmPopup,
  },

  setup() {
    const notificationLists = ref([
      {
        title: "You have a new Ajo invitation",
        message: "Rhoda Ogunesan has invited to join The Titan Ajo group.",
        action: "Accept",
        time: "10",
        status: "unread",
      },
      {
        title: "You have a new Ajo invitation",
        message: "Emmanuella Henry has invited to join The NNPC Techies Ajo group.",
        action: "Accept",
        time: "10",
        status: "read",
      },
    ]);

    const onPillSelected = (selectedPill) => {
      console.log(selectedPill);
    };

    return {
      notificationLists,
      onPillSelected,
    };
  },
};
</script>

<style lang="scss" scoped></style>
