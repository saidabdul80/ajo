import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

window.baseUrl = import.meta.env.VITE_API_URL;
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { IonicVue } from "@ionic/vue";
/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

import "primeicons/primeicons.css";

/* Basic CSS for apps built with Ionic */
// import "@ionic/vue/css/normalize.css";
// import "@ionic/vue/css/structure.css";
// import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/vue/css/padding.css";
// import "@ionic/vue/css/float-elements.css";
// import "@ionic/vue/css/text-alignment.css";
// import "@ionic/vue/css/text-transformation.css";
// import "@ionic/vue/css/flex-utils.css";
// import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

import "@/assets/css/main.css";
import { useGlobalsStore } from "@/stores/globals";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { definePreset } from "@primevue/themes";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const pinia = createPinia();

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#ffffff",
      100: "#e0e0e0",
      200: "#bdbdbd",
      300: "#9e9e9e",
      400: "#757575",
      500: "#424242",
      600: "#212121",
      700: "#000000",
      800: "#000000",
      900: "#000000",
      950: "#000000",
    },
  },
});

const app = createApp(App).use(IonicVue).use(router);
app.use(pinia);
const vuetify = createVuetify({
  components,
  directives,
});
app.use(vuetify);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: "false",
      cssLayer: false,
    },
  },
});
app.use(VueTelInput);
router.isReady().then(() => {
  app.mount("#app");
});
app.config.globalProperties.$globals = useGlobalsStore();
