<template>
  <ion-header mode="ios">
    <ion-toolbar color="white" class="tw-py-0 tw-flex tw-h-24 tw-items-center">
      <ion-label color="dark" slot="start" class="tw-px-2 tw-py-[0px] tw-flex tw-items-center tw-gap-3 md:tw-gap-7">
        <div @click="$router.push('/')" class="tw-cursor-pointer">
          <img class="tw-w-full" src="@/assets/images/logo-name.svg" />
        </div>

        <Tag style="background-color: #d80027; color: #fff" rounded value="Beta"></Tag>
      </ion-label>
      <div v-if="isNavLinkVisible" slot="secondary" class="tw-ms-[10%] tw-hidden lg:tw-block">
        <a class="tw-mx-5 tw-text-base tw-font-semibold tw-cursor-pointer" @click="$globals.scrollTo('about-ajo')">About Ajo</a>
        <a class="tw-mx-5 tw-text-base tw-font-semibold tw-cursor-pointer" @click="$globals.scrollTo('how-ajo-work')">How Ajo Works</a>
      </div>
      <ion-label slot="end">
        <div class="tw-hidden tw-gap-8 tw-pe-8 lg:tw-flex tw-items-center">
          <p-button outlined label="Sign in" @click="$router.push('/signin')" />
          <p-button label="Join Ajo by Cowris" @click="$router.push('/join')" class="tw-shrink-0 !tw-w-fit" />
        </div>
        <div class="tw-p-4 tw-block lg:tw-hidden">
          <PButton icon="pi pi-bars" @click="visibleRight = true" outlined />
        </div>
      </ion-label>
    </ion-toolbar>
  </ion-header>
  <Drawer v-model:visible="visibleRight" header="" position="right">
    <template #header>
      <img width="68%" src="@/assets/images/logo-name.svg" />
    </template>
    <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$router.push('/signin')">Sign in</a>
    <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$router.push('/join')">Join Ajo by Cowris</a>
    <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$globals.scrollTo('about-ajo')">About Ajo</a>
    <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$globals.scrollTo('how-ajo-work')">How Ajo Works</a>
  </Drawer>
</template>

<script>
import Drawer from "primevue/drawer";

import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonMenuButton, IonButtons } from "@ionic/vue";

import PInput from "@/components/Input.vue";
import PButton from "@/components/Button.vue";
import Tag from "primevue/tag";
export default {
  data() {
    return {
      visibleRight: false,
    };
  },

  props: {
    isNavLinkVisible: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Drawer,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonMenuButton,
    IonButtons,
    PInput,
    PButton,
    Tag,
  },
};
</script>

<style scoped>
ion-toolbar {
  --background: ;
  /* --color: white; */

  --border-color: transparent;
  --border-width: 0;
  --border-style: double;
  /* 
    --min-height: 80px;
    --padding-top: 20px;
    --padding-bottom: 20px; */
}
</style>
