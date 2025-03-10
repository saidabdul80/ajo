import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useClient } from "./client";
import { useNotificationStore } from "./notification";

import ls from "./ls";

import { useUserStore } from "./user";
import router from "../router";
export const useGlobalsStore = defineStore("globals", {
  state: () => ({
    notifications: [],
    pageTransition: { name: "router-view", mode: "in-out" },
    pageLoading: false,
    pageReset: 0,
    subPageName: null,
    nameRules: ref({}),
    currentPageName: {},
    abilities: ref([]),
    configurations: [],
    forgotPasswordData: {
      username: "",
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    country_id: null,
    state_id: null,
    activeTab: null,
    filters: reactive({
      search: null,
      paginate: null,
    }),
    countries: [],
    isEdit: false,
    alert: {
      show: false,
      text: "",
      title: "",
      imgpath: null,
      cancelBtnText: "",
      confirmBtnText: "",
      loading: false,
    },
    alertPromiseResolve: null,
    isOnlineStatus: false,
    balance: 0,
    downloadInvoiceLoading: false,
    ajos: [],
    all_ajos: [],
    fetchingAjos: false,
  }),
  actions: {
    goBack(route) {
      this.pageTransition.name = "router-view-back";
      this.pageTransition.mode = "";
      router.push(route);
    },
    to(route) {
      this.pageTransition.name = "router-view";
      this.pageTransition.mode = "in-out";
      router.push(route);
    },
    scrollTo(name) {
      const scrollBody = document.querySelector(".scroller-body-inner");
      const scrollTo = document.querySelector("." + name);

      scrollBody.scrollToPoint(0, scrollTo.offsetTop, 1000);
    },
    // In useGlobalsStore

    setPrefix() {
      window.prefix = "";
      const authPrefix = ls.get("auth.prefix");
      window.prefix = "";
      window.userRoot = "";
    },
    async changePassword(data) {
      const response = await useClient().http({
        method: "post",
        path: "/change_password",
        data,
      });
      if (response) {
        const authPrefix = ls.get("auth.prefix");
        ls.set("user", JSON.stringify(response.user));
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Logged in successfully.",
        });
        router.push(`/${authPrefix}/dashboard`);
      }
    },
    getConfig(name) {
      return this.configurations?.find((item) => item.name == name)?.value;
    },
    setConfig() {
      this.country_id = this.getConfig("country_id");
      this.state_id = this.getConfig("state_id");
    },
    async bootstrap(background_process = false, unAuth = false) {
      const handleResponse = (response) => {
        if (response) {
          if (response?.user) {
            //if unAuth
            ls.set("user", JSON.stringify(response?.user));
            const mainUserStore = useUserStore();
            mainUserStore.user = response?.user;
          }

          this.configurations = response.configurations;
          this.setConfig();
        }
        setTimeout(() => {
          this.pageLoading = false;
        }, 1000);
      };
      // Handle the prefix correctly
      let prefix = "/bootstrap";
      // if (window.prefix && window.prefix !== 'null') {
      //   prefix = `${window.prefix}/bootstrap`.replace('null/', '');

      // }
      if (unAuth) {
        prefix = prefix.replace("bootstrap", "unauth_bootstrap");
      }

      if (background_process) {
        useClient()
          .http({ method: "get", path: prefix })
          .then(handleResponse)
          .catch((error) => {
            console.error("Error in background process:", error);
            this.pageLoading = false; // Ensure loading state is updated
          });
      } else {
        this.pageLoading = true;
        try {
          const response = await useClient().http({
            method: "get",
            path: prefix,
          });
          handleResponse(response);
        } catch (error) {
          console.error("Error in synchronous process:", error);
          this.pageLoading = false; // Ensure loading state is updated
        }
      }
    },
    routeTo(prefix) {
      if (!window.currentRoute.path.includes("signin")) {
        router.push({ path: "/signin", replace: true });
        return true;
      }
      return false;
    },
    async logout(root = false, isNotify = true) {
      try {
        if (root) {
          ls.clear();
          if (!this.routeTo(root)) {
            return;
          }
        } else {
          ls.clear();
          this.routeTo();
        }

        if (isNotify) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: "success",
            message: "Logged out successfully.",
          });
        }
      } catch (err) {
        console.log(err);
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "error",
          message: "An error occurred while logging out.",
        });
      }
    },
    updateSubPageName(name) {
      this.subPageName = name;
    },
    updateNameRules(nameRules) {
      this.nameRules = nameRules;
      const msg = "error";
    },
    setCurrentPageName(item) {
      this.currentPageName = item;
    },
    toCurrency(amount, symbol = true, shorten = true) {
      if (amount == null || isNaN(amount)) {
        return symbol ? "₦0" : "0";
      }

      let formattedAmount;
      const currencySymbol = "₦";
      amount = Number(amount);
      if (shorten && amount >= 1000000) {
        formattedAmount = (amount / 1000000).toFixed(1) + "M";
      } else if (shorten && amount >= 100000) {
        formattedAmount = (amount / 1000).toFixed(1) + "K";
      } else {
        formattedAmount = amount.toFixed(0);
        formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      if (symbol) {
        formattedAmount = `${currencySymbol}${formattedAmount}`;
      }

      return formattedAmount;
    },
    async fetchCountries() {
      this.countriesLoading = true;
      const response = await useClient().http({
        method: "get",
        path: "/countries",
      });
      this.countries = response;
      this.countriesLoading = false;
    },
    async fetchStates(id) {
      const response = await useClient().http({
        method: "get",
        path: "/states/" + id,
      });
      return response;
    },
    async fetchLgas(id) {
      const response = await useClient().http({
        method: "get",
        path: "/lgas/" + id,
      });
      return response.data;
    },
    async fetchWards(id) {
      const response = await useClient().http({
        method: "get",
        path: "/wards/" + id,
      });
      return response;
    },
    async verifyNumber(data) {
      const response = await useClient().http({
        method: "post",
        path: "/initiate_identity_verification",
        data,
      });
      if (response) {
        return response;
      }
      return false;
    },
    async confirmVerifyNumber(data) {
      const response = await useClient().http({
        method: "post",
        path: "/confirm_identity_verification",
        data,
      });
      if (response) {
        return response;
      }
      return false;
    },

    tabValidate(validatations) {
      Object.keys(validatations).some((key) => {
        if (this.nameRules[key]) {
          document.getElementById("tab_" + validatations[key]).click();
          return true;
        }
        return false;
      });
    },
    exportToPDF(id = null, filename = "download", orientation = "p") {
      if (id === null) {
        console.error("id cannot be null in exportToPDF function");
        return false;
      }

      const o = orientation === "p" ? "portrait" : "landscape";

      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with id ${id} not found`);
        return false;
      }
      let width = "205mm"; // A4 width
      let height = "269.4mm"; // A4 height
      if (orientation == "p") {
        width = "205mm"; // A4 width
        height = "269mm"; // A4 height
      }

      const options = {
        margin: 0.5, // adjust margin as needed
        filename: filename + ".pdf",
        html2canvas: {
          scale: 2,
          letterRendering: true,
          y: 0,
          x: 0,
          scrollY: 0,
          scrollX: 0,
          useCORS: true, // enable CORS for images
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        autoPaging: "text",
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: o,
        },
      };

      // Create and append style element
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");

      // Use a temporary wrapper to fit the content correctly
      const wrapper = document.createElement("div");
      wrapper.style.lineHeight = "0.5 !important"; // A4 height
      wrapper.style.overflow = "hidden";
      wrapper.appendChild(element.cloneNode(true));
      document.body.appendChild(wrapper);

      html2pdf(wrapper, options)
        .then(() => {
          // Remove the temporary style element and wrapper
          document.head.removeChild(style);
          document.body.removeChild(wrapper); // clean up
        })
        .catch((err) => {
          console.error("Error generating PDF:", err);
        });

      return true;
    },
    async print(id = null, filename = "download", orientation = "p", w = 57, h = 137) {
      if (id === null) {
        console.error("id cannot be null in print function");
        return false;
      }

      const o = orientation === "p" ? "portrait" : "landscape";
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with id ${id} not found`);
        return false;
      }

      let width = w;
      let height = h;
      if (orientation === "p") {
        width = w;
        height = h;
      }

      try {
        // Generate a canvas using html2canvas
        /*  return await domtoimage.toPng(element)
             .then(function (dataUrl) {
                 //var img = new Image();
                 return  dataUrl;                  
             })
             .catch(function (error) {
                 console.error('oops, something went wrong!', error);
             }); */
        const canvas = await html2canvas(element, {
          scale: 1.6, // Increase scale for better quality
          useCORS: true,
          dpi: 300, // Increase dpi for better quality
          letterRendering: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        return imgData;
      } catch (error) {
        console.error("Error generating image data URL:", error);
        return null;
      }
    },

    async downloadInvoice(id) {
      try {
        this.downloadInvoiceLoading = true;
        // Fetch the file from the server
        const response = await useClient().http({
          method: "get",
          path: "/invoice/pdf/" + id,
          responseType: "blob",
        });
        this.downloadInvoiceLoading = false;
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "invoice.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading invoice pdf:", error);
      }
    },

    async requery(reference) {
      const response = await useClient().http({
        method: "post",
        path: "/payment/requery/" + reference,
      });
      if (response) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Verified successfully.",
        });
        return true;
      }
      return false;
    },
    async resendVerify(params) {
      const response = await useClient().http({
        method: "post",
        path: "/resend_email_verification",
        data: params,
      });
      if (response) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Email has been resent.",
        });
        return true;
      }
      return false;
    },
    ubtAlert({ text, title, cancelBtnText, confirmBtnText, icon, loading = false, callback = () => {}, clickEvent = () => {}, imgpath = null }) {
      return new Promise((resolve) => {
        this.alert = {
          show: true,
          text,
          title,
          imgpath,
          icon,
          cancelBtnText,
          confirmBtnText,
          clickEvent,
          callback,
          loading,
        };

        this.alertPromiseResolve = { callback, resolve };
      });
    },
    toTitleCase(str) {
      return str
        ?.split(" ")
        ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    },
    alertClickEvent(e) {
      if (this.alert.clickEvent) {
        this.alert.clickEvent(e);
      }
    },
    async handleAlertResponse(response) {
      if (this.alertPromiseResolve) {
        if (response) {
          this.alert.loading = true;
          await this.alertPromiseResolve.callback(response);
          this.alert.loading = false;
        } else {
          this.alertPromiseResolve.callback(response);
        }
        setTimeout(() => {
          //this.alertPromiseResolve?.resolve(response);
          this.alertPromiseResolve = null;
          this.alert.show = false;
        }, 50);
      }
    },
    async fetchMyAjos() {
      this.fetchingAjos = true;
      const res = await useClient().http({
        path: "/ajos/my",
        method: "GET",
      });
      this.fetchingAjos = false;
      if (res) {
        this.ajos = res;
        return res;
      }
    },
    async fetchAjos() {
      this.fetchingAjos = true;
      const res = await useClient().http({
        path: "/ajos",
        method: "GET",
      });
      this.fetchingAjos = false;
      if (res) {
        this.all_ajos = res;
        return res;
      }
    },
    formatNumber(number) {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    },

    async resetPassword(email) {
      const notificationStore = useNotificationStore();

      if (!email) {
        notificationStore.showNotification({
          type: "error",
          message: "Provide an email a valid email",
        });

        return null;
      }

      try {
        const response = await useClient().http({
          method: "post",
          path: "/reset_password",
          data: { username: email },
        });

        if (response) {
          notificationStore.showNotification({
            type: "success",
            message: "OTP sent to your email.",
          });

          return response;
        }
      } catch (error) {
        notificationStore.showNotification({
          type: "error",
          message: error || "An error occurred.",
        });
      }
    },

    async setPassword({ otpCode, username, password, password_confirmation }) {
      const notificationStore = useNotificationStore();

      try {
        const response = await useClient().http({
          method: "post",
          path: "/confirm_reset_password",
          data: { otp: otpCode, username: username, password: password, password_confirmation: password_confirmation },
        });

        if (response) {
          notificationStore.showNotification({
            type: "success",
            message: "Password updated successfully",
          });

          return response;
        }
      } catch (error) {
        notificationStore.showNotification({
          type: "error",
          message: error || "An error occurred.",
        });
      }
    },
  },
});

if (import.meta.env.VITE_DEVELOPMENT_MODE == "local") {
  window.globalStore = useGlobalsStore;
}
