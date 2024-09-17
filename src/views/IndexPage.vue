<template>
 
    <ion-content>
      <ion-split-pane content-id="main-content" >
        <ion-menu content-id="main-content" type="overlay" class="md:tw-w-[200px]">
          <ion-content>
            <ion-list id="inbox-list" style="padding-top: 0px !important">
              <ion-list-header><img width="68%" class="tw-mt-2" src="@/assets/images/logo-name.svg" /></ion-list-header>
              <ion-note></ion-note>

              <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
                <ion-item :color="isActive(p) ? 'dark' : ''" @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                  :detail="false" class="hydrated tw-w-[75%] tw-mx-auto tw-block tw-my-3 tw-rounded-xl tw-me-10" :class="{ selected: selectedIndex === i }">
                  <ion-label class="!tw-flex tw-gap-4 !tw-text-sm tw-items-center">
                    <span :class="isActive(p) ? p.mdIcon + '-white' : p.mdIcon"></span>
                    {{ p.title }}
                  </ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

            <ion-list id="labels-list">
              <!-- Additional content can go here if needed -->
              <div class="md:tw-hidden tw-w-[80%] tw-h-[30vh] tw-mx-auto tw-flex  tw-justify-center tw-place-items-center md:tw-grid-cols-3 tw-gap-5 ">
                <p-button size="small" icon="pi pi-plus" label="Start new Ajo" />
              </div>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-page id="main-content" mode="ios" class="tw-w-full" style="padding-top: 0px !important">
          <ion-header>
            <ion-toolbar color="white">
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
              </ion-buttons>
              <ion-label color="dark" slot="start" class="tw-px-[22px] tw-py-[12px]">
                <h1 class="tw-m-0 md:!tw-text-[22px] !tw-text-[16px]">Hello, Rhoda</h1>
                <p class="tw-text-xs tw-mt-1">Experience the power of group savings.</p>
              </ion-label>
              <ion-title></ion-title>
              <ion-label slot="end">
                <div class="tw-hidden md:tw-grid md:tw-grid-cols-3 tw-gap-1">
                  <Input size="normal" class="md:tw-col-span-2" placeholder="Search for group..." icon="pi pi-search"></Input>
                  <PButton icon="pi pi-plus" label="Start new Ajo"></PButton>
                </div>
              </ion-label>
            </ion-toolbar>
          </ion-header>
          <ion-content color="light" :fullscreen="true" class="  tw-w-full tw-h-[90vh]" style="--padding-top: 0px !important">  
            <ion-router-outlet color="light" class="tw-px-5 tw-py-4"></ion-router-outlet>
          </ion-content>
        </ion-page>
      </ion-split-pane>
    </ion-content>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { useRoute } from 'vue-router';
import PButton from '@/components/Button.vue';
import Input from "@/components/Input.vue";

export default {
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    PButton,
    Input,
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      selectedIndex: 0,
      appPages: [
        {
          title: "Overview",
          url: "/app/overview",
          name: "overview",
          iosIcon: 'ajo-pie',
          mdIcon: 'ajo-pie',
        },
        {
          title: "Contributions",
          url: "/app/contributions",
          name: "contributions",
          iosIcon: 'ajo-piggy',
          mdIcon: 'ajo-piggy',
        },
        {
          title: "Wallet",
          url: "/app/wallet",
          name: "wallet",
          iosIcon: 'ajo-wallet',
          mdIcon: 'ajo-wallet',
        },
        {
          title: "Notifications",
          url: "/app/notifications",
          name: "notifications",
          iosIcon: 'ajo-bell',
          mdIcon: 'ajo-bell',
        },
        {
          title: "Settings",
          url: "/app/settings",
          name: "settings",
          iosIcon: 'ajo-settings',
          mdIcon: 'ajo-settings',
        },
        {
          title: "Support",
          url: "/app/support",
          name: "support",
          iosIcon: 'ajo-question',
          mdIcon: 'ajo-question',
        },
      ],
      labels: [],
    };
  },
  methods: {
    isActive(page) {
      return this.route.name === page.name;
    }
  },
  created() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  },
}
</script>

<style scoped>
body {
  font-family: 'Aeonik' !important;
}
</style>
