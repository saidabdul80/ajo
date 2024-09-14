<template>
  
        <ion-content color="light">
    <div >
      <div id="container" class="tw-pt-5">
        <AjoLandContent />
  
        <div class="tw-mt-[40px] tw-mb-[40px]">
          <Card />
        </div>
  
        <div class="tw-p-[80px] tw-bg-[#36454F] tw-min-h-[280px] tw-w-full tw-grid xl:tw-grid-cols-4 md:tw-grid-cols-2 tw-gap-8 tw-items-center">
          <Counter v-for="x in 4" :key="x" />
        </div>
  
        <div class="tw-mt-[30px] tw-px-[9%] tw-min-h-[840px] tw-bg-[#F8F9D7]">
          <BodyContent />
        </div>
  
        <div>
          <AjoGuide />
        </div>
      </div>
    </div>
    </ion-content>
  </template>
  
  <script>
  import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
  import AjoLandContent from '@/components/AjoLandContent.vue';
  import Card from '@/components/Card.vue';
  import BodyContent from '@/components/BodyContent.vue';
  import Counter from '@/components/Counter.vue';
  import AjoGuide from '@/components/AjoGuide.vue';
  
  export default {
    components: {
      AjoLandContent,
      IonContent,
      Card,
      Counter,
      BodyContent,
      AjoGuide,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  