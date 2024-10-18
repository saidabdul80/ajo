import { defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",

  state: () => ({
    active: false,
    autoHide: true,
    notifications: [],
  }),

  actions: {
    // Action to show a new notification
    showNotification(notification) {
      this.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2), // Unique ID for notification
      });
    },

    // Action to hide a notification by its ID
    hideNotification(notificationToRemove) {
      this.notifications = this.notifications.filter((notification) => {
        return notification.id !== notificationToRemove.id;
      });
    },
  },
});
