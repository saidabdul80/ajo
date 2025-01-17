<template>
  <ion-header class="tw-bg-white tw-shadow-none">
    <ion-toolbar color="white" class="tw-h-[104px] tw-flex tw-px-5 tw-border-b !tw-border-[#E8EBEF]">
      <!-- Menu Button -->
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>

      <!-- Profile and Title Section -->
      <ion-label color="dark" slot="start">
        <div @click="profileImage && $router.push('/app/profile')" :class="[profileImage && 'tw-cursor-pointer', 'tw-flex tw-items-center tw-gap-0  tw-select-none']">
          <img
            v-if="profileImage"
            :alt="`data.representative.name`"
            :src="user.picture_url ? user.picture_url : 'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png'"
            style="width: 32px" />
          <div class="tw-ml-2">
            <h1 class="!tw-m-0 md:!tw-text-[15px] !tw-text-[13px] !tw-font-semibold tw-capitalize">{{ title }}</h1>
            <p class="md:tw-text-xs tw-text-[11px] tw-mt-0">{{ description }}</p>
          </div>
        </div>
      </ion-label>

      <!-- Right Side Content (conditionally displayed) -->
      <ion-label slot="end" v-if="isValidLink">
        <div class="tw-hidden min-[992px]:tw-flex tw-items-center tw-gap-10">
          <slot name="headerRightContent">
            <Input size="medium" placeholder="Search for group..." icon="pi pi-search" />
            <StartAjoButton />
          </slot>
        </div>
      </ion-label>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

import Input from "@/components/Input.vue";
import StartAjoButton from "./StartAjoButton.vue";

export default {
  name: "Header",
  components: {
    Input,
    StartAjoButton,
  },
  props: {
    title: String,
    description: String,
    profileImage: Boolean,
  },
  setup() {
    const route = useRoute();
    const isValidLink = computed(() => !route.path.includes("start"));
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);

    return { isValidLink, user };
  },
};
</script>
