// src/stores/constants.js
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("loginedUser", {
  state: () => ({
    user: useLocalStorage("user", {}),
  }),
});
