import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useClient } from "./client";
import { useNotificationStore } from "./notification";

import ls from "./ls";


import { useUserStore } from "./user";
import router from "../router";
export const useGlobalsStore = defineStore('globals', {
  state: () => ({
    notifications:[],
    pageTransition:{name:"router-view",mode:'in-out'},
    pageLoading: false,
    subPageName: null,
    nameRules: ref({}),
    currentPageName: {},
    abilities: ref([]),
    configurations: [],
    forgotPasswordData: {
      username: '',
      current_password: '',
      password: '',
      password_confirmation: '',
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
    businessCategoryLoading: false,
    businessSubCategories: [],
    business_sub_categories: [],
    countriesList: [],
    stateList: [],
    lgaList: [],
    refresh:false,
    mdas:[],
    alert: {
      show: false,
      text: '',
      title: '',
      imgpath:null,
      cancelBtnText: '',
      confirmBtnText: '',
      loading: false,
    },
    alertPromiseResolve: null,
    isOnlineStatus:false,
    balance:0,
    downloadInvoiceLoading:false,
    fiscal_years:[],
    current_fiscal_year:null
  }),
  actions: {
    goBack(route) {
      this.pageTransition.name = "router-view-back";
      this.pageTransition.mode = "";
      router.push(route);
    },
    to(route) {
      this.pageTransition.name =  "router-view";
      this.pageTransition.mode ="in-out"
      router.push(route);
    },
    scrollTo( name ){
        const scrollBody = document.querySelector(".scroller-body-inner");
        const scrollTo = document.querySelector("."+name);
        
        scrollBody.scrollToPoint(0, scrollTo.offsetTop, 1000);
    },
    // In useGlobalsStore
 
    setPrefix() {
      window.prefix = '';
      const authPrefix = ls.get('auth.prefix');
      if (authPrefix) {
        window.prefix = `${authPrefix == '-' ? '' : '/' + authPrefix}`;
        window.userRoot = authPrefix == '-' ? 'admin' : authPrefix;
      }
    },
    async changePassword(data) {
      const response = await useClient().http({ method: 'post', path: '/change_password', data });
      if (response) {
        const authPrefix = ls.get('auth.prefix');
        ls.set('user', JSON.stringify(response.user));
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'success',
          message: 'Logged in successfully.',
        });
        router.push(`/${authPrefix}/dashboard`);
      }
    },
    getConfig(name) {
      return this.configurations?.find(item => item.name == name)?.value;
    },
    setConfig() {
      this.country_id = this.getConfig('country_id')
      this.state_id = this.getConfig('state_id')
    },
    async bootstrap(background_process = false, unAuth = false) {
      const handleResponse = (response) => {
        if (response) {
          if (response?.user) { //if unAuth  
            ls.set('user', JSON.stringify(response?.user))
            const mainUserStore = useUserStore();
            mainUserStore.user = response?.user                   
          }
         
          this.mdas = response.mdas
          this.configurations = response.configurations
          this.setConfig()
        }
        setTimeout(() => {
          this.pageLoading = false;
        }, 1000);
      };
      // Handle the prefix correctly
      let prefix = '/bootstrap';
      // if (window.prefix && window.prefix !== 'null') {
      //   prefix = `${window.prefix}/bootstrap`.replace('null/', '');
        
      // }
      if (unAuth) {
        prefix = prefix.replace('bootstrap', 'unauth_bootstrap');
      }

      if (background_process) {

        useClient().http({ method: 'get', path: prefix })
          .then(handleResponse)
          .catch(error => {
            console.error('Error in background process:', error);
            this.pageLoading = false; // Ensure loading state is updated
          });
      } else {
        this.pageLoading = true;
        try {
          const response = await useClient().http({ method: 'get', path: prefix });
          handleResponse(response);
        } catch (error) {
          console.error('Error in synchronous process:', error);
          this.pageLoading = false; // Ensure loading state is updated
        }
      }
    },
    routeTo(prefix) {
      if (!prefix.includes('login')) {
        router.push({ path: `/${prefix}/login`, replace: true })
        return true;
      }
      return false;
    },
    async logout(root = false) {
      try {
        if (root) {
          ls.clear();
          if (!this.routeTo(root)) { return; }
        } else {
          const token = ls.get('auth.token');
          let prefix = window.prefix || ''; // Initialize prefix
          if (prefix.includes('null')) {
            prefix = '-'; // Handle 'null' case
          }

          prefix = prefix === '-' ? 'admin' : prefix; // Default to 'admin' if prefix is empty
          if (token) {
            ls.clear();

            this.routeTo(prefix)
          } else {
            this.routeTo(prefix)
          }
        }

        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'success',
          message: 'Logged out successfully.',
        });
      } catch (err) {
        console.log(err)
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'error',
          message: 'An error occurred while logging out.',
        });
      }
    },
    updateSubPageName(name) {
      this.subPageName = name;
    },
    updateNameRules(nameRules) {
      this.nameRules = nameRules;
      const msg = 'error';
    },
    setCurrentPageName(item) {
      this.currentPageName = item;
    },
    toCurrency(amount, symbol = true, shorten = true) {
      if (amount == null || isNaN(amount)) {
        return symbol ? '₦0' : '0';
      }
    
      let formattedAmount;
      const currencySymbol = '₦';
      amount = Number(amount)
      if (shorten && amount >= 1000000) {
        formattedAmount = (amount / 1000000).toFixed(1) + 'M';
      } else if (shorten && amount >= 100000) {
        formattedAmount = (amount / 1000).toFixed(1) + 'K';
      } else {
        formattedAmount = amount.toFixed(0);
        formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    
      if (symbol) {
        formattedAmount = `${currencySymbol}${formattedAmount}`;
      }
    
      return formattedAmount;
    },            
    async fetchCountries() {
      this.countriesLoading = true;
      const response = await useClient().http({ method: 'get', path: '/countries' });
      this.countries = response;
      this.countriesLoading = false;
    },
    async fetchStates(id) {
      const response = await useClient().http({ method: 'get', path: '/states/' + id });
      return response;
    },
    async fetchLgas(id) {
      const response = await useClient().http({ method: 'get', path: '/lgas/' + id });
      return response.data;
    },
    async fetchWards(id) {
      const response = await useClient().http({ method: 'get', path: '/wards/' + id });
      return response;
    },
    async verifyNumber(data) {
      const response = await useClient().http({ method: 'post', path: '/initiate_identity_verification', data });
      if(response){
        return response;
       }
       return false
    },
    async confirmVerifyNumber(data) {
      const response = await useClient().http({ method: 'post', path: '/confirm_identity_verification', data });
       if(response){
        return response;
       }
       return false
    },
    
    tabValidate(validatations) {
      Object.keys(validatations).some(key => {
        if (this.nameRules[key]) {
          document.getElementById('tab_' + validatations[key]).click()
          return true
        }
        return false
      });
    },
    exportToPDF(id = null, filename = 'download', orientation = 'p') {
      if (id === null) {
        console.error('id cannot be null in exportToPDF function');
        return false;
      }

      const o = orientation === 'p' ? 'portrait' : 'landscape';

      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with id ${id} not found`);
        return false;
      }
      let width = '205mm'; // A4 width
      let height = '269.4mm'; // A4 height
      if (orientation == 'p') {
        width = '205mm'; // A4 width
        height = '269mm'; // A4 height
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
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        autoPaging: 'text',
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: o
        }
      };

      // Create and append style element
      const style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

      // Use a temporary wrapper to fit the content correctly
      const wrapper = document.createElement('div');
      wrapper.style.lineHeight = "0.5 !important"; // A4 height 
      wrapper.style.overflow = 'hidden';
      wrapper.appendChild(element.cloneNode(true));
      document.body.appendChild(wrapper);

      html2pdf(wrapper, options).then(() => {
        // Remove the temporary style element and wrapper
        document.head.removeChild(style);
        document.body.removeChild(wrapper); // clean up
      }).catch((err) => {
        console.error('Error generating PDF:', err);
      });

      return true;
    },
    async print(id = null, filename = 'download', orientation = 'p', w = 57, h = 137) {
      if (id === null) {
        console.error('id cannot be null in print function');
        return false;
      }

      const o = orientation === 'p' ? 'portrait' : 'landscape';
      const element = document.getElementById(id);
      if (!element) {
        console.error(`Element with id ${id} not found`);
        return false;
      }

      let width = w;
      let height = h;
      if (orientation === 'p') {
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

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        return imgData;
      } catch (error) {
        console.error('Error generating image data URL:', error);
        return null;
      }
    },
    async fetchBusinessCategoriesList(params = null, path = null) {
      this.businessCategoryLoading = true;
      const response = await useClient().http({ method: 'get', path: path || '/business_categories', data: params || {}, fullPath: path ? true : false })
      this.businessCategoryLoading = false;
      if (response) {
        this.businessCategories = response.data.map(category => ({
          label: category.name,
          value: category.id,
        }));
      }
    },
    async fetchBusinessSubCategoriesList(category, params = null, path = null) {
      this.businessSubCategoryLoading = true;
      const response = await useClient().http({ method: 'get', path: path || '/business_sub_categories/' + category, data: params || {}, fullPath: path ? true : false })
      this.businessSubCategoryLoading = false;
      if (response) {
        this.businessSubCategories = response.data.map(sub => ({
          label: sub.name,
          value: sub.id,
        }));
      }
    },
    async fetchCountriesList(params = null, path = null) {
      const response = await useClient().http({ method: 'get', path: path || '/countries', data: params || {}, fullPath: path ? true : false })
      if (response) {
        this.countriesList = response.map(country => ({
          label: country.name,
          value: country.id,
        }));
        console.log('Countries list Successfully fetched')
      }
    },

    async fetchStateList(nationality, params = null, path = null) {
      const response = await useClient().http({ method: 'get', path: path || '/states/' + nationality, data: params || {}, fullPath: path ? true : false })
      if (response) {
        this.stateList = response.map(nationality => ({
          label: nationality.name,
          value: nationality.id,
        }));
        console.log('State list Successfully fetched')
      }
    },
    async fetchLgasList(state, params = null, path = null) {
      const response = await useClient().http({ method: 'get', path: path || '/lgas/' + state, data: params || {}, fullPath: path ? true : false })
      if (response) {
        this.lgaList = response.data.map(state => ({
          label: state.name,
          value: state.id,
        }));
        console.log('LGA list Successfully fetched')
      }
    },
    async fetchBusinessSub(id) {
      // this.bSubIsLoading = true
      // this.corporateTaxPayerStore.corporateTaxPayerData.business_sub_category_id = null
      const response = await useClient().http({ method: 'get', path: '/business_sub_categories/' + id })
      // this.bSubIsLoading = false
      this.business_sub_categories = response.data
    },
    async downloadInvoice(id) {
      
      try {
        this.downloadInvoiceLoading = true;
        // Fetch the file from the server
        const response = await useClient().http({
          method: 'get',
          path: '/invoice/pdf/'+id,
          responseType: 'blob'
        });
        this.downloadInvoiceLoading = false;
        const url = window.URL.createObjectURL(new Blob([response]));        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf'); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Error downloading invoice pdf:', error);        
      }
    },
    async verifyEmail(params) {                
        const response = await useClient().http({method: 'post',path:'/verify/email',data: params});
        if (response) {
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Verified successfully.',
            });
            return true
        }                
        return false
    },
    async requery(reference) {                
      const response = await useClient().http({method: 'post',path:'/payment/requery/'+reference});
      if (response) {
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
              type: 'success',
              message: 'Verified successfully.',
          });
          return true
      }                
      return false
  },
    async resendVerify(params) {                
        const response = await useClient().http({method: 'post',path:'/resend_email_verification',data: params});
        if (response) {
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Email has been resent.',
            });
            return true
        }                
        return false
    },
    ubtAlert({ text, title, cancelBtnText, confirmBtnText, loading = false, callback = ()=>{}, imgpath=null }) {
      return new Promise((resolve) => {
        this.alert = {
          show: true,
          text,
          title,
          imgpath,
          cancelBtnText,
          confirmBtnText,
          callback,
          loading,
        };
      
        this.alertPromiseResolve = {callback,resolve};
      });
    },
    async handleAlertResponse(response) {
      if (this.alertPromiseResolve) {
        if(response){
          this.alert.loading = true;
          await this.alertPromiseResolve.callback()
          this.alert.loading = false;
        }
        setTimeout(()=>{
          this.alertPromiseResolve?.resolve(response);
          this.alertPromiseResolve = null;  
          this.alert.show = false; 
        },200)
      }
    },

  }
});


if( import.meta.env.VITE_DEVELOPMENT_MODE == 'local'){
  window.globalStore = useGlobalsStore;
}