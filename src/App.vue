<template>
  <ion-app>
    <ion-content :fullscreen="true" class="ion-padding scroller-body tw-w-full tw-h-[90vh] tw-bg-white">
      <transition
        :name="$vuetify.display.mdAndDown ? this.$globals.pageTransition.name : 'in-out'"
        :mode="$vuetify.display.mdAndDown ? this.$globals.pageTransition.mode : 'in-out'"
        v-on:after-enter="afterEnter"
        v-on:after-leave="afterLeave">
        <ion-router-outlet class="transition" :key="$route.fullPath"></ion-router-outlet>
      </transition>
    </ion-content>

    <NotificationRoot />
    <CustomDialog />
    <Alert
    :text="$globals.alert?.text"
    :icon="$globals.alert?.icon"
    :title="$globals.alert?.title"
    :confirmBtnText="$globals.alert?.confirmBtnText"
    :cancelBtnText="$globals.alert?.cancelBtnText"
    v-model="$globals.alert.show"
    :loading="$globals.alert.loading"
    :img-path="$globals.alert.imgpath"
  />
  </ion-app>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import NotificationRoot from "@/components/notifications/NotificationRoot.vue";
import Alert from "@/components/Alert.vue";
import CustomDialog from "@/components/CustomDialog.vue";
import { IonApp, IonContent, IonRouterOutlet } from "@ionic/vue";

// Import custom components
import PInput from "@/components/Input.vue";
import PButton from "@/components/Button.vue";

export default defineComponent({
  components: {
    NotificationRoot,
    PInput,
    PButton,
    IonApp,
    IonContent,
    IonRouterOutlet,
    CustomDialog,
    Alert
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
        { title: "Overview", url: "/", name: "overview", iosIcon: "ajo-pie", mdIcon: "ajo-pie" },
        { title: "Contributions", url: "/app/contributions", name: "contributions", iosIcon: "ajo-piggy", mdIcon: "ajo-piggy" },
        { title: "Wallet", url: "/app/wallet", name: "wallet", iosIcon: "ajo-wallet", mdIcon: "ajo-wallet" },
        { title: "Notifications", url: "/app/notifications", name: "notifications", iosIcon: "ajo-bell", mdIcon: "ajo-bell" },
        { title: "Settings", url: "/app/settings", name: "settings", iosIcon: "ajo-settings", mdIcon: "ajo-settings" },
        { title: "Support", url: "/app/support", name: "support", iosIcon: "ajo-question", mdIcon: "ajo-question" },
      ],
      labels: [],
    };
  },
  methods: {
    isActive(page) {
      return this.route.name === page.name;
    },
    afterEnter() {
      window.scrollTo(0, 0);
    },
    afterLeave() {
      this.$globals.setPageTransition = "default"; // Reset transition after page leaves
    },
  },
  created() {
    // Dynamically set the selected page index based on the URL path
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  },
});
</script>

<style scoped>
body {
  font-family: "Aeonik" !important; /* Ensure the correct font family */
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
