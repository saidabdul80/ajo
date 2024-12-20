<template>
  <ion-header class="tw-bg-white tw-shadow-none">
    <ion-toolbar color="white" class="tw-h-[104px] tw-flex tw-px-8 tw-border-b !tw-border-[#E8EBEF]">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-label color="dark" slot="start">
        <h1 class="tw-m-0 md:!tw-text-[22px] !tw-text-[16px] tw-capitalize">{{ title }}</h1>
        <p class="tw-text-xs tw-mt-1">{{ description }}</p>
      </ion-label>

      <ion-label slot="end" v-if="!isValidLink">
        <div class="tw-hidden min-[992px]:tw-flex tw-items-center tw-gap-10">
          <slot name="headerRightContent">
            <div class="xl:tw-w-[400px]">
              <Input size="medium" placeholder="Search for group..." icon="pi pi-search" />
            </div>
            <div class="tw-w-[170px] tw-shrink-0">
              <StartAjoButton />
            </div>
          </slot>
        </div>
      </ion-label>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { useUserStore } from "@/stores/user.js";

import PButton from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import PendingVerificationDialog from "./Dialog/PendingVerificationDialog.vue";
import StartAjoButton from "./StartAjoButton.vue";

export default {
  name: "Header",
  components: {
    PButton,
    Input,
    PendingVerificationDialog,
    StartAjoButton,
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
