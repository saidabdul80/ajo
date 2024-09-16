<template>
  <IonContent class="md:tw-hidden tw-block">
        <slot name="content"></slot>
  </IonContent>
  <div class="md:tw-grid tw-grid-cols-7 tw-w-full tw-hidden  ">
    <div class="tw-col-span-3 tw-bg-black">
        <div class=" tw-px-8">
            <div class="tw-w-full tw-py-6 tw-mb-8">
                <img src="@/assets/images/logo-white.svg" />
            </div>
            <div
            class="tw-mb-8 tw-bg-[url('/images/bar-bg.svg')] tw-bg-no-repeat tw-bg-cover tw-w-full tw-h-[43vh] tw-flex tw-justify-center tw-items-center"
            >
            <div class="tw-bg-white tw-w-[95%] tw-h-[60%] tw-rounded-md"></div>
            </div>
            <div class="tw-text-white tw-w-[80%] tw-mx-auto tw-mb-20">
                <p class="tw-m-0 tw-text-2xl tw-text-center">Save<span class="box tw-mx-1"><span class="tw-text-black tw-inline-block tw-relative tw-left-1 tw-z-10">60% of your time</span></span></p>
                <p class="tw-m-0 tw-text-2xl tw-text-center">managing group finances.</p>
                <p class="tw-m-0 tw-text-xs tw-text-center">Cowris simplifies the process of group savings, contributions, and financial management for your circle—be it friends, family, or colleagues. Track contributions, manage funds, and reach your financial goals together with ease</p>
            </div>
        </div>
      <div class="tw-bg-[url('/images/coin-bg.svg')] tw-bg-no-repeat  tw-h-[14vh] tw-bg-cover tw-w-full"></div>
    </div>
    <div class="tw-col-span-4 ">
        <slot name="content"></slot>
    </div>
    
  </div>
  
</template>

<script>
import { IonContent } from '@ionic/vue';

export default {
  components: {
    IonContent,
  },
};
</script>

<style scoped>
.box {
  position: relative;
  z-index: 2;
  color: black;
  /* -webkit-transform: skewX(-5deg);
  -moz-transform: skewX(-5deg);
  -ms-transform: skewX(-5deg);
  -o-transform: skewX(-5deg);
  transform: skewX(-5deg); */
}

.box::after {
  content: "";
  position: absolute;
  display: inline-block;
  top: 0px;
  left: 0px;
  width: 108%;
  background-color: rgb(254, 229, 168);
  height: 100%;
  -webkit-transform: skewX(-5deg);
  -moz-transform: skewX(-5deg);
  -ms-transform: skewX(-5deg);
  -o-transform: skewX(-5deg);
  transform: skewX(-5deg);
  z-index: 1;
}
</style>
