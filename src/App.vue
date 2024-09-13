<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" class="lg:tw-w-[200px]">
        <ion-content>
          <ion-list id="inbox-list" style="padding-top: 0px !important">
            <ion-list-header><img width="68%" class="tw-mt-2" src="@/assets/images/logo-name.svg" /></ion-list-header>
            <ion-note></ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Labels</ion-list-header>

            <ion-item v-for="(label, index) in labels" lines="none" :key="index">
              <ion-icon aria-hidden="true" slot="start" :ios="bookmarkOutline" :md="bookmarkSharp"></ion-icon>
              <ion-label>{{ label }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-page mode="ios" class="tw-w-full" style="padding-top: 0px !important">
        <ion-header>
          <ion-toolbar color="white">
            <ion-buttons slot="start">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-label color="dark" slot="start" class="tw-px-[22px] tw-py-[12px]">
              <h1 class="tw-m-0 md:!tw-text-[22px] !tw-text-[16px] ">Hello, Rhoda</h1>
              <p class="tw-text-xs tw-mt-1">Experience the power of group savings.</p>
            </ion-label>
            <ion-title> </ion-title>
            <ion-label slot="end" >
              <div class="tw-grid md:tw-grid-cols-3 tw-gap-1 ">
                <p-input class="md:tw-col-span-2" placeholder="Search for group..." icon="pi pi-search" ></p-input>
                <p-button  icon="pi pi-plus" label="Start new Ajo" />
              </div>
            </ion-label>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-padding tw-h-[90vh]" style="--padding-top: 0px !important">
            <ion-router-outlet id="main-content"></ion-router-outlet>
        </ion-content>
      </ion-page>
    </ion-split-pane>
  </ion-app>
</template>
<script lang="ts">
import {
  IonApp,
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import PInput from '@/components/Input.vue'
import PButton from '@/components/Button.vue'
export default {
  data() {
    return {
      selectedIndex: 0,
      appPages: [
        {
          title: "Template",
          url: "/template",
          iosIcon: mailOutline,
          mdIcon: mailSharp,
        },
        {
          title: "Outbox",
          url: "/folder/Outbox",
          iosIcon: paperPlaneOutline,
          mdIcon: paperPlaneSharp,
        },
        {
          title: "Favorites",
          url: "/folder/Favorites",
          iosIcon: heartOutline,
          mdIcon: heartSharp,
        },
        {
          title: "Archived",
          url: "/folder/Archived",
          iosIcon: archiveOutline,
          mdIcon: archiveSharp,
        },
        {
          title: "Trash",
          url: "/folder/Trash",
          iosIcon: trashOutline,
          mdIcon: trashSharp,
        },
        {
          title: "Spam",
          url: "/folder/Spam",
          iosIcon: warningOutline,
          mdIcon: warningSharp,
        },
      ],
      labels: ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"],
    };
  },
  components: {
    PInput,
    PButton,
    archiveOutline,
    archiveSharp,
    bookmarkOutline,
    bookmarkSharp,
    heartOutline,
    heartSharp,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp,
    trashOutline,
    trashSharp,
    warningOutline,
    warningSharp,

    IonApp,
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
  },
  created() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  },
};
</script>


<style>
body {
    font-family: 'Aeonik' !important;
}
</style>
