import { defineStore } from "pinia";

import { useClient } from "@/stores/client";

export const useAjoStore = defineStore("ajoStore", {
  state: () => ({
    ajoGroups: [],
    loading: false,
  }),
  actions: {
    async createAjo(data) {
      try {
        this.loading = true;
        const response = await useClient().http({
          method: "post",
          path: "/ajos ",
          data,
        });

        if (response) {
          this.loading = false;
          return response;
        }
      } catch (e) {
        this.loading = false;
        console.log("Error creating ajos group", e.message);
      }
    },

    async fetchAllAjo(id) {
      try {
        this.loading = true;
        const response = await useClient().http({
          method: "get",
          path: "/ajos",
        });

        if (response) {
          this.loading = false;
          this.ajoGroups = response;
          return response;
        }
      } catch (e) {
        this.loading = false;
        console.log("Error fetching ajos group", e.message);
      }
    },
  },
});
