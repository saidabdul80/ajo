<template>
    <ion-header mode="ios">
          <ion-toolbar color="white" class="tw-py-0">
            <ion-buttons slot="end">
              <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-label color="dark" slot="start" class="tw-px-[22px] tw-py-[0px] tw-hidden md:tw-block">
                <img width="68%" src="@/assets/images/logo-name.svg" />
            </ion-label>
            <div slot="secondary" class="tw-ms-[10%] tw-hidden md:tw-block">
                <a class="tw-mx-5 tw-text-sm tw-font-semibold tw-cursor-pointer" @click="$globals.scrollTo('about-ajo')" >About Ajo</a>
                <a class="tw-mx-5 tw-text-sm tw-font-semibold tw-cursor-pointer" @click="$globals.scrollTo('how-ajo-work')" >How Ajo Works</a>
            </div>
            <ion-label slot="end" >
              <div class="tw-pe-8 tw-hidden md:tw-block">
                <p-button size="small" class="tw-me-2" outlined label="Sign in"  @click="$router.push('/signin')"/>
                <p-button size="small" label="Join Ajo by Cowris" @click="$router.push('/join')" />
              </div>
              <div class="tw-p-4 tw-block md:tw-hidden">
                <PButton icon="pi pi-bars" @click="visibleRight = true" outlined  />
              </div>
            </ion-label>
          </ion-toolbar>
        </ion-header>
        <Drawer v-model:visible="visibleRight" header="" position="right">
          <template #header>
            <img width="68%" src="@/assets/images/logo-name.svg" />
          </template>
          <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$router.push('/signin')" >Sign in</a>
          <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$router.push('/join')" >Join Ajo by Cowris</a>
          <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$globals.scrollTo('about-ajo')" >About Ajo</a>
          <a class="tw-mx-5 tw-text-sm tw-block tw-text-center tw-py-4 tw-font-semibold" @click="$globals.scrollTo('how-ajo-work')">How Ajo Works</a>
        </Drawer>
</template>

<script>

import Drawer from 'primevue/drawer';

 import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonMenuButton, IonButtons } from '@ionic/vue';
 
import PInput from '@/components/Input.vue'
import PButton from '@/components/Button.vue'
    export default {
      data() {
        return {
          visibleRight: false
        }
      },
        components: { Drawer, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonMenuButton, IonButtons, PInput, PButton },
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