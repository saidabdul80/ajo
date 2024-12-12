import { defineStore } from "pinia";
import { useClient } from "@/stores/client";
import { useNotificationStore } from "@/stores/notification";

export const useAjoStore = defineStore("ajoStore", {
  state: () => ({
    loading: false,
  }),
  actions: {
    // Centralized error handler to avoid repeated code
    handleError(message, error, notificationStore) {
      console.error(message, error);
      notificationStore.showNotification({
        type: "error",
        message: message,
      });
    },

    async createAjo(data) {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        this.loading = true;
        const response = await useClient().http({
          method: "post",
          path: "/ajos",
          data,
        });

        if (response && response.data) {
          this.loading = false;
          return response.data;
        }
      } catch (e) {
        this.handleError("Error creating Ajo group", e, notificationStore);
      } finally {
        this.loading = false;
      }
    },

    async fetchAllAjo(id) {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        this.loading = true;
        const response = await useClient().http({
          method: "get",
          path: "/ajos",
        });

        if (response && response.data) {
          this.loading = false;
          return response.data;
        }
      } catch (e) {
        this.handleError("Error fetching Ajo groups", e, notificationStore);
      } finally {
        this.loading = false;
      }
    },

    async fetchAjoFrequencies() {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        const response = await useClient().http({
          method: "get",
          path: "/frequencies",
        });

        if (response && response.data) {
          return response.data;
        }
      } catch (e) {
        this.handleError("Error fetching Ajo frequencies", e, notificationStore);
      }
    },

    async inviteAjoParticipant(data) {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        const response = await useClient().http({
          method: "post",
          path: "/ajo-invites/request",
          data: data,
        });

        if (response && response.data) {
          return response.data;
        }
      } catch (e) {
        this.handleError("Error inviting Ajo participant", e, notificationStore);
      }
    },

    async fetchAjoRules() {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        const response = await useClient().http({
          method: "get",
          path: "/rules",
        });

        if (response && response.data) {
          return response.data;
        }
      } catch (e) {
        this.handleError("Error fetching Ajo rules", e, notificationStore);
      }
    },

    async createAjoRules(data) {
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        const response = await useClient().http({
          method: "post",
          path: "/ajo-rules",
          data: data,
        });

        if (response && response.data) {
          return response.data;
        }
      } catch (e) {
        this.handleError("Error creating Ajo rules", e, notificationStore);
      }
    },

    async updateBankDetails(id, data) {
      this.loading = true;
      const notificationStore = useNotificationStore(); // Declare inside action
      try {
        const response = await useClient().http({
          method: "put",
          path: `/users/${id}/account-details`,
          data: data,
        });

        if (response) {
          notificationStore.showNotification({
            type: "success",
            message: response.message || "Bank details updated successfully!",
          });
        }
      } catch (e) {
        this.handleError("Error updating bank details", e, notificationStore);
      } finally {
        this.loading = false;
      }
    },
  },
});
