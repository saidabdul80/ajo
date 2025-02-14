import { defineStore } from "pinia";
import { useClient } from "@/stores/client";
import { useNotificationStore } from "@/stores/notification";

export const useAjoStore = defineStore("ajoStore", {
  state: () => ({
    loading: false,
  }),

  actions: {
    handleError(message, error, notificationStore) {
      console.error(message, error);
      notificationStore.showNotification({
        type: "error",
        message: message,
      });
    },

    async makeRequest(method, path, data = null) {
      const notificationStore = useNotificationStore();

      try {
        this.loading = true;
        const response = await useClient().http({ method, path, data });
        return response;
      } catch (e) {
        this.handleError(`Error ${method === "get" ? "fetching" : "processing"} data`, e, notificationStore);
      } finally {
        this.loading = false;
      }
    },

    createAjo(data) {
      return this.makeRequest("post", "/ajos", data);
    },

    updateAjo(id, data) {
      return this.makeRequest("put", `/ajos/${id}`, data);
    },

    fetchAllAjo() {
      return this.makeRequest("get", "/ajos/my");
    },

    fetchAjoById(id) {
      return this.makeRequest("get", `/ajos/${id}`);
    },

    fetchAjoFrequencies() {
      return this.makeRequest("get", "/frequencies");
    },

    fetchAjoRules() {
      return this.makeRequest("get", "/rules");
    },

    createAjoRules(data) {
      return this.makeRequest("post", "/ajo-rules", data);
    },

    addAjoParticipants(data) {
      return this.makeRequest("post", "/ajo-members", data);
    },

    addDeleteParticipant(emailID) {
      return this.makeRequest("delete", `/ajo-members/${emailID}`);
    },

    deleteAjo(ajoID) {
      return this.makeRequest("delete", `/ajos/${ajoID}`);
    },

    async updateBankDetails(id, data) {
      const response = await this.makeRequest("put", `/users/${id}/account-details`, data);
      const notificationStore = useNotificationStore();
      if (response) {
        notificationStore.showNotification({
          type: "success",
          message: response.message || "Bank details updated successfully!",
        });
      }
    },

    async updateNotificationSetting(id, data) {
      const response = await this.makeRequest("put", `/users/${id}/notifications`, data);
      const notificationStore = useNotificationStore();
      if (response) {
        notificationStore.showNotification({
          type: "success",
          message: response.message || "Notification settings updated successfully!",
        });
      }
    },
  },
});
