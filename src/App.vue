<template>
  <ion-app>
    <ion-content :fullscreen="true" class="ion-padding scroller-body tw-w-full tw-h-[90vh] tw-bg-white" style="--padding-top: 0px !important">
      <transition
        :name="$vuetify.display.mdAndDown ? this.$globals.pageTransition.name : 'in-out'"
        :mode="$vuetify.display.mdAndDown ? this.$globals.pageTransition.mode : 'in-out'"
        v-on:after-enter="afterEnter"
        v-on:after-leave="afterLeave">
        <!-- <router-view></router-view> -->
        <ion-router-outlet class="transition" :key="$route.fullPath"></ion-router-outlet>
      </transition>
    </ion-content>
  </ion-app>
  <NotificationRoot />
  <CustomDialog />
</template>

<script lang="ts">
import NotificationRoot from "@/components/notifications/NotificationRoot.vue";
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from "@ionic/vue";
import { defineComponent } from "vue";
import { RouterView, useRoute } from "vue-router";
import PInput from "@/components/Input.vue";
import PButton from "@/components/Button.vue";
import CustomDialog from "@/components/CustomDialog.vue";

export default defineComponent({
  components: {
    NotificationRoot,
    RouterView,
    PInput,
    PButton,
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
    CustomDialog,
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      selectedIndex: 0,
      slotContent: {},
      appPages: [
        {
          title: "Overview",
          url: "/",
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
      console.log(this.route, 33);
      return this.route.name === page.name;
    },
    afterEnter() {
      window.scrollTo(0, 0);
    },
    afterLeave() {
      this.$globals.setPageTransition = "default";
    },
  },

  created() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  },
});
</script>

<style>
body {
  font-family: "Aeonik" !important;
}

.transition {
  overflow: hidden;
}
.router-view,
.router-view-back-enter-active,
.router-view-back-leave-active {
  position: fixed;
  width: 100%;
  background: white;
  min-height: 100vh;
  top: 0;
}

.router-view-enter-active {
  transition: transform 0.5s ease-in-out;
  z-index: 2;
  transform: translateX(100%);
}
.router-view-enter-to {
  z-index: 2;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}

.router-view-back-leave-active {
  transition: transform 0.5s ease-in-out;
  z-index: 2;
  transform: translateX(0%);
}
.router-view-back-leave-to {
  z-index: 2;
  transform: translateX(100%);
}
</style>
