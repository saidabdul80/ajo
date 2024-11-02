<template>
  <ion-header class="tw-bg-white tw-shadow-none">
    <ion-toolbar
      color="white"
      class="tw-h-[104px] tw-flex tw-px-8 tw-border-b !tw-border-[#E8EBEF]">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-label color="dark" slot="start">
        <h1 class="tw-m-0 md:!tw-text-[22px] !tw-text-[16px]">{{ title }}</h1>
        <p class="tw-text-xs tw-mt-1">{{ description }}</p>
      </ion-label>

      <ion-label slot="end" v-if="!isValidLink">
        <div class="tw-hidden min-[992px]:tw-flex tw-items-center tw-gap-10">
          <slot name="headerRightContent">
            <div class="xl:tw-w-[400px]">
              <Input
                size="medium"
                placeholder="Search for group..."
                icon="pi pi-search" />
            </div>
            <div class="tw-w-[170px] tw-shrink-0">
              <PButton
                @click="navigateToStartAjo"
                icon="pi pi-plus"
                label="Start new Ajo" />
            </div>
          </slot>
        </div>
      </ion-label>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { useUserStore } from "@/stores/user.js";

import eventBus from "@/eventBus";
import PButton from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import PendingVerificationDialog from "./Dialog/PendingVerificationDialog.vue";

export default {
  name: "Header",
  components: {
    PendingVerificationDialog,
  },
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      currentRoutePath: null,
    };
  },
  components: {
    PButton,
    Input,
  },

  methods: {
    navigateToStartAjo() {
      const { is_verified_email, is_verified_phone_number } =
        this.userStore.user;

      if (!is_verified_email && is_verified_phone_number) {
      } else {
        this.$globals.to("start");
        // eventBus.emit("open-dialog", {
        //   default: PendingVerificationDialog,
        //   title: "Pending verifications...",
        //   position: "center",
        // });
      }
    },
  },

  mounted() {
    this.currentRoutePath = this.$route.path;
  },

  computed: {
    isValidLink() {
      if (this.currentRoutePath && this.currentRoutePath.includes("start")) {
        return true;
      }
    },
  },
};
</script>
