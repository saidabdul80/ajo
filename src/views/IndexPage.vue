<template>
  <ion-content>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" class="lg:tw-w-[200px] tw-w-full">
        <ion-content>
          <ion-list id="inbox-list" style="padding-top: 0px !important" class="tw-h-full tw-flex tw-flex-col">
            <ion-list-header><img width="68%" class="tw-mt-2" src="@/assets/images/logo-name.svg" /></ion-list-header>
            <ion-note></ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item
                :color="isActive(p) ? 'dark' : ''"
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                :detail="false"
                class="hydrated tw-w-[75%] tw-mx-auto tw-block tw-my-3 tw-rounded-xl tw-me-10">
                <ion-label class="!tw-flex tw-gap-4 !tw-text-base tw-items-center">
                  <span :class="isActive(p) ? p.mdIcon + '-white' : p.mdIcon"></span>
                  {{ p.title }}
                </ion-label>
              </ion-item>
            </ion-menu-toggle>

            <div class="tw-mt-auto tw-w-[80%] tw-mx-auto">
              <div class="lg:tw-hidden tw-pb-8">
                <StartAjoButton />
              </div>
              <p-button
                size="medium"
                class="!tw-bg-transparent !tw-text-[#D80027] !tw-border-none !tw-justify-start"
                icon="pi pi-sign-out"
                label="Logout"
                :is-full-width="false"
                @click="handleLogout" />
            </div>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-page id="main-content" mode="ios" class="tw-w-full" style="padding-top: 0px !important">
        <!-- <ion-header>
          <ion-toolbar
            color="white"
            class="tw-h-[104px] tw-flex tw-px-8 tw-border-b !tw-border-[#E8EBEF]">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-label color="dark" slot="start">
              <h1 class="tw-m-0 md:!tw-text-[22px] !tw-text-[16px]">
                Hello, Rhoda
              </h1>
              <p class="tw-text-xs tw-mt-1">
                Experience the power of group savings.
              </p>
            </ion-label>
            <ion-title></ion-title>
            <ion-label slot="end">
              <div
                class="tw-hidden min-[992px]:tw-flex tw-items-center tw-gap-10">
                <div class="xl:tw-w-[400px]">
                  <Input
                    size="medium"
                    placeholder="Search for group..."
                    icon="pi pi-search" />
                </div>
                <div class="tw-w-[170px] tw-shrink-0">
                  <PButton
                    icon="pi pi-plus"
                    label="Start new Ajo"
                    size="small" />
                </div>
              </div>
            </ion-label>
          </ion-toolbar>
        </ion-header> -->
        <!-- <ion-content
          color="white"
          :fullscreen="true"
          class="tw-w-full tw-h-[90vh]"
          style="--padding-top: 0px !important"> -->
        <ion-router-outlet :key="$globals.pageReset"></ion-router-outlet>
        <!-- </ion-content> -->
      </ion-page>
    </ion-split-pane>
  </ion-content>
</template>

<script lang="ts">
import eventBus from "@/eventBus";
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
import { useRoute } from "vue-router";
import PButton from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import LogoutDialog from "@/components/Dialog/LogoutDialog.vue";
import StartAjoButton from "@/components/StartAjoButton.vue";

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
    StartAjoButton,
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      currentRoutePath: null,
      selectedIndex: 0,
      appPages: [
        {
          title: "Overview",
          url: "/app/overview",
          name: "overview",
          iosIcon: "ajo-pie",
          mdIcon: "ajo-pie",
        },

        {
          title: "Contributions",
          url: "/app/contributions",
          name: "contributions",
          iosIcon: "ajo-piggy",
          mdIcon: "ajo-piggy",
        },
        {
          title: "Wallet",
          url: "/app/wallet",
          name: "wallet",
          iosIcon: "ajo-wallet",
          mdIcon: "ajo-wallet",
        },
        {
          title: "Notifications",
          url: "/app/notifications",
          name: "notifications",
          iosIcon: "ajo-bell",
          mdIcon: "ajo-bell",
        },
        // {
        //   title: "Transactions",
        //   url: "/app/transactions",
        //   name: "transactions",
        //   iosIcon: "ajo-transaction",
        //   mdIcon: "ajo-transaction",
        // },
        {
          title: "Settings",
          url: "/app/settings",
          name: "settings",
          iosIcon: "ajo-settings",
          mdIcon: "ajo-settings",
        },
        {
          title: "Support",
          url: "/app/support",
          name: "support",
          iosIcon: "ajo-question",
          mdIcon: "ajo-question",
        },
      ],
      labels: [],
    };
  },
  methods: {
    isActive(page) {
      return this.route.name === page.name;
    },

    handleLogout() {
      eventBus.emit("open-dialog", {
        default: LogoutDialog,
        position: "center",
      });
    },
  },
  created() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  },

  mounted() {
    this.currentRoutePath = this.$route.path;
  },
};
</script>

<style scoped></style>
