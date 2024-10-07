import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { handleError } from '../helpers/error-handling';
import ls from "../services/ls"
import { useGlobalsStore } from "./globals";

export const useClient = defineStore("client", () => {
  const ongoingRequests = new Map(); // Track ongoing requests

  // Function to generate a unique key based on request config
  function generateRequestKey(config) {
    const method = config.method.toLowerCase();
    const url = config.fullPath ? config.path : window.baseUrl + config.path.replace('//', '/');
    const dataString = config.data ? JSON.stringify(config.data) : '';
    return `${method}:${url}:${dataString}`; // Unique key for each request
  }

  async function http(config = { method: 'get', path: '', data: {}, fullPath: false }) {
    const requestKey = generateRequestKey(config);

    // Prevent duplicate requests for the same key
    if (ongoingRequests.has(requestKey)) {
      console.warn("Duplicate request prevented for:", requestKey);
      return false;
    }

    const token = ls.get("auth.token");
    let url = window.baseUrl + config?.path.replace('//', '/');
    if (config?.fullPath) {
      url = config?.path;
    }
    if (config.method.toLowerCase() === 'get' && config?.data != undefined) {
      const urlParams = new URLSearchParams(config.data).toString();
      if (config.fullPath) {
        url += '&' + urlParams;
      } else {
        url += '?' + urlParams;
      }
    }

    const headers = {
      Authorization: token ? `Bearer ${token}` : "",
    };

    if (config?.data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    // Add request to ongoingRequests map
    ongoingRequests.set(requestKey, true);

    try {
      const response = await axios({
        method: config?.method,
        url: url,
        data: config?.data,
        headers: headers,
        responseType: config?.responseType
      });

      useGlobalsStore().nameRules = ref({});
      useGlobalsStore().isOnlineStatus = true;

      return response.data;
    } catch (error) {
      const errors = error?.response?.data?.errors;

      if (errors) {
        useGlobalsStore().updateNameRules(errors);
      }
      if (error?.response?.status === 401) {
        const route = window.currentRoute;
        if (route.meta.requiresAuth) {
          let userRootPath = window.currentRoute.matched[0]?.path?.replace('/', '') || '';
          useGlobalsStore().logout(userRootPath);
        }
      }
      if (!error?.response) {
        useGlobalsStore().isOnlineStatus = false;
      } else {
        useGlobalsStore().isOnlineStatus = true;
      }
      console.log(error);
      handleError(error);
      return false;
    } finally {
      ongoingRequests.delete(requestKey); // Remove request after it's done
    }
  }

  return { http };
});
