import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { useGlobalsStore } from "@/stores/globals";

import CheckLoggedIn from "@/middleware/authorized";
import CheckAbility from "@/middleware/checkAbility";
import AlreadyLogedIn from "@/middleware/alreadyLogedIn";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/terms-conditions",
    component: () => import("@/views/T&C.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/ajosummary/:id",
    name: "Ajo Summary",
    component: () => import("@/views/AjoSummary.vue"),
    props: true,
    meta: { requiresAuth: false },
  },

  {
    path: "/join",
    name: "join",
    component: () => import("@/views/Join.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/Signin.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/newpassword/:email",
    name: "NewPassword",
    component: () => import("@/views/CreatNewPassword.vue"),
    meta: { requiresAuth: false },
    props: true,
  },

  {
    path: "/passwordset",
    name: "Passwordset",
    component: () => import("@/views/PasswordSet.vue"),
    meta: { requiresAuth: false },
  },

  {
    path: "/recovery",
    name: "Recovery",
    component: () => import("@/views/Recovery.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/status/:name/:status",
    name: "Statuses",
    component: () => import("@/views/statuses/Index.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/app",
    component: () => import("@/views/IndexPage.vue"),
    children: [
      {
        path: "overview",
        name: "overview",
        component: () => import("@/views/Overview.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "start/:id?",
        name: "start",
        component: () => import("@/views/StartAjo.vue"),
        meta: { requiresAuth: true },
        props: true,
      },
      {
        path: "contributions",
        name: "contributions",
        component: () => import("@/views/Contributions.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/contributions/:id", // Dynamic route parameter for Ajo details
        name: "AjoDetail",
        component: () => import("@/views/ContributionDetails.vue"),
        meta: { requiresAuth: true },
        props: true, // Pass route params as props
      },
      {
        path: "wallet",
        name: "wallet",
        component: () => import("@/views/Wallet.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("@/views/Notifications.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/Settings.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "support",
        name: "support",
        component: () => import("@/views/Support.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/profile/Index.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorView",
    component: () => import("@/components/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.currentRoute = to;
  window.previousRoute = from;
  const globalStore = useGlobalsStore();

  AlreadyLogedIn(to);

  if (to.meta.requiresAuth) {
    CheckLoggedIn();
    if (CheckAbility(globalStore, to.meta.ability)) {
      globalStore.bootstrap();
      next();
    } else {
      next({ path: "/404" });
    }

    try {
      const res = await globalStore.bootstrap(false);
    } catch (error) {}
  } else {
    globalStore.bootstrap(true, true);
    next(); // Proceed to the next navigation step
  }
});

export default router;
