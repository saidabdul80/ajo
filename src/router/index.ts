import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/join",
    name: "join",
    component: () => import("@/views/Join.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/Signin.vue"),
  },

  {
    path: "/verify",
    name: "Verify",
    component: () => import("@/views/VerifyEmail.vue"),
  },

  {
    path: "/newpassword",
    name: "newpassword",
    component: () => import("@/views/CreatNewPassword.vue"),
  },

  {
    path: "/Passwordset",
    name: "Passwordset",
    component: () => import("@/views/Passwordset.vue"),
  },

  {
    path: "/recovery",
    name: "recovery",
    component: () => import("@/views/Recovery.vue"),
  },
  {
    path: "/password-set",
    name: "password-set",
    component: () => import("@/views/Passwordset.vue"),
  },
  {
    path: "/app",
    component: () => import("@/views/IndexPage.vue"),
    children: [
      {
        path: "overview",
        name: "overview",
        component: () => import("@/views/Overview.vue"),
      },
      {
        path: "contributions",
        name: "contributions",
        component: () => import("@/views/Contributions.vue"),
      },
      {
        path: "wallet",
        name: "wallet",
        component: () => import("@/views/Wallet.vue"),
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("@/views/Notifications.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/Settings.vue"),
      },
      {
        path: "support",
        name: "support",
        component: () => import("@/views/Support.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
