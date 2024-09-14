<template>
    <ion-header mode="ios">
          <ion-toolbar color="white" class="tw-py-0">
            <ion-buttons slot="end">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-label color="dark" slot="start" class="tw-px-[22px] tw-py-[0px]">
                <img width="68%" src="@/assets/images/logo-name.svg" />
            </ion-label>
            <div slot="secondary" class="tw-ms-[10%]">
                <a class="tw-mx-5 tw-text-sm tw-font-semibold" >About Ajo</a>
                <a class="tw-mx-5 tw-text-sm tw-font-semibold" >How Ajo Works</a>
            </div>
            <ion-label slot="end">
                <p-button size="small" class="tw-me-2" outlined label="Sign in" />
                <p-button size="small" label="Join Ajo by Cowris" />
            </ion-label>
          </ion-toolbar>
        </ion-header>
</template>

<script>
 import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonMenuButton, IonButtons } from '@ionic/vue';
 
import PInput from '@/components/Input.vue'
import PButton from '@/components/Button.vue'
    export default {
        components: { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonMenuButton, IonButtons, PInput, PButton },
    }
</script>

<style scoped>
     ion-toolbar {
    --background: ;
    /* --color: white; */

    --border-color: transparent;
    --border-width: 0;
    --border-style: double;
/* 
    --min-height: 80px;
    --padding-top: 20px;
    --padding-bottom: 20px; */
  }
</style>