<template>
    <ion-page>
      <ion-content color="light">
      <Transition name="scale">
        <!-- <ion-router-outlet :key="$route.fullPath"></ion-router-outlet>   -->
        <router-view :key="$route.fullPath"></router-view>
      </Transition>
      </ion-content>
    </ion-page>
  </template>
  <script>
  import { IonTabBar, IonLoading, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
  import { defineComponent } from 'vue';
 import { useToast } from 'primevue/usetoast';
   import Toast from 'primevue/toast';
  
  export default {
    data(){
      return {
        toast:null
      }
    },
    components: { IonTabBar, IonLoading, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet },
    methods:{
    //   toastEnd(){
    //     window.toastOpened = false
    //   },
    //   showToastPop(){
    //     if(window.toastOpened === false){          
    //         window.toastOpened = true
    //         this.toast.add({ severity: 'warn', summary: 'Offline', detail: 'No Internet Connection', life: 63000 });
    //     }
    //   }
    },
    mounted() {  
      //this.toast = useToast();
  
    }
  };
  </script>
  
  <style scoped>
  .tab-selected span{
    fill:#F1C111 !important;  
  }
  
  .tab-selected ion-label{  
    color:#F1C111 !important;
  }
  ion-tab-button span, ion-tab-button> ion-label{
    fill:#F8F9F9;  
  }
  ion-tab-bar{
    padding: 15px 24px;
  }
  ion-tab-bar,ion-tab-bar ion-tab-button{
    background:#191C1C;
  }
  
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.3s ease;
  }
  
  .scale-enter-from,
  .scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
  
  
  </style>