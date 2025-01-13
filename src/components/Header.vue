<template>
  <ion-header class="tw-bg-white tw-shadow-none">
    <ion-toolbar color="white" class="tw-h-[104px] tw-flex tw-px-5 tw-border-b !tw-border-[#E8EBEF]">
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-label color="dark" slot="start">
        <div class="tw-flex tw-items-center tw-gap-0 tw-cursor-pointer tw-select-none" @click="$router.push('/app/profile')">
          <img :alt="'data.representative.name'" :src="`https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png`" style="width: 32px" />
          <div class="tw-ml-2">
            <h1 class="!tw-m-0 md:!tw-text-[15px] !tw-text-[13px] !tw-font-semibold tw-capitalize">{{ title }}</h1>
            <p class="md:tw-text-xs tw-text-[11px] tw-mt-0">{{ description }}</p>
          </div>
        </div>
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
import { computed } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute } from "vue-router";

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
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const currentRoutePath = computed(() => route.path);

    const isValidLink = computed(() => {
      return currentRoutePath.value.includes("start");
    });

    return {
      userStore,
      currentRoutePath,
      isValidLink,
    };
  },
};
</script>
