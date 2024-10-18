import axios from "axios";
import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notification";

import { useLocalStorage } from "@vueuse/core";
import { useClient } from "@/stores/client";
import router from "@/router";
import ls from "../services/ls";
export const useAuthStore = defineStore("auth-store", {
  state: () => ({
    user: useLocalStorage("user", {}),
    status: "",
    loginData: {
      username: "",
      password: "",
      remember: "",
    },
    forgotPasswordData: {
      idNumber: "",
    },
    loadingMFA: false,
    loading: false,
    qrcode: null,
  }),
  actions: {
    async login(data) {
      this.loading = true;
      const response = await useClient().http({
        method: "post",
        path: "/login",
        data,
      });
      this.loading = false;

      if (response) {
        const password = data.password;
        this.handlePassed(response);
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Logged in successfully.",
        });
        router.push("/app/overview");
      }
    },
    requireMFA() {
      let is_mfa = false;
      return false;
      // JSON.parse(Ls.get('permissions')||"{}").forEach(role => {
      //     if(role == 'require-mfa'){
      //         is_mfa = true;
      //     }
      // });
      // return is_mfa;
    },
    handlePassed(response) {
      ls.set("auth.token", response.access_token);
      const allPermissions = []; // Extract permissions from roles

      // response.user.roles.forEach(role => {
      //     role.permissions.forEach(permission => {
      //         allPermissions.push(permission.name);
      //     });
      // }); // Extract root permissions

      // response.user.permissions.forEach(permission => {
      //     allPermissions.push(permission.name);
      // });

      //Ls.set('permissions', JSON.stringify(allPermissions));
      this.user = response.user;
      this.loginData.username = "";
      this.loginData.password = "";
    },
    async verifyMfaCode(data) {
      const response = await useClient().http({
        method: "post",
        path: "/auth/verify-mfa",
        data,
      });
      if (response) {
        router.push("/admin/home");
      }
    },
    async changePassword(data) {
      const response = await useClient().http({
        method: "post",
        path: "/auth/change-password",
        data,
      });
      if (response) {
        Ls.remove("oldpassword");
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Password changed successfully.",
        });
        this.logout();
      }
    },
    async setUpMFA(data) {
      this.loadingMFA = true;
      const response = await useClient().http({
        method: "get",
        path: "/auth/setup-mfa",
        data,
      });
      this.loadingMFA = false;
      if (response) {
        this.qrcode = response.qrCodeDataUrl;
        Ls.set("mfa.qrcode", response.qrCodeDataUrl);
      }
    },
    async logout() {
      try {
        const token = Ls.get("auth.user");
        if (token) {
          //useClient().http({method:'post',path:'/auth/logout',data:{},fullPath:false});
          Ls.remove("auth.user");
          Ls.remove("permissions");
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: "success",
            message: "Logged out successfully.",
          });
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else {
          // const notificationStore = useNotificationStore();
          // notificationStore.showNotification({
          //     type: 'error',
          //     message: 'Already logout.',
          // });
          setTimeout(() => {
            router.push("/");
          }, 500);
        }
      } catch (err) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "error",
          message: "An error occurred while logging out.",
        });
      }
    },
    async forgotPassword(data) {
      const notificationStore = useNotificationStore();
      notificationStore.showNotification({
        type: "success",
        message:
          "Check your email and spam folder for the password reset link within 5 minutes.",
      });
    },
  },
});
