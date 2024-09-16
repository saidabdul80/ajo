<template>
    <Nav />
    <ion-content class="scroller-body-inner" color="white" :fullscreen="true">

        <div>
            <div id="container" class="md:tw-pt-5 md:tw-px-20 tw-px-4">
                <div class="tw-grid tw-gap-5  tw-mb-[20vh]" :class="lg?'tw-grid-cols-2':''">
                    <AjoLandContent class="md:tw-mt-[14vh]" />
                    <div class="tw-grid tw-gap-2" :style="lg?'height:100vh':'height:143vh'" :class="lg?'tw-grid-cols-2':''">
                        
                        <div class="tw-overflow-y-hidden " >
                            <vue3-marquee :gradien="true" :duration="110" :vertical="lg" pauseOnHover>
                                <div v-for="x in 10" :key="x" class="tw-mb-3 tw-w-full" :class="lg?'':'tw-px-2'">
                                    <Card class="tw-cursor-pointer" @click="handleAjoCard(x)"   :style="lg?'width:100%':'width: 95% !important'" />
                                </div>
                            </vue3-marquee>
                        </div>
                        <div class="tw-overflow-y-hidden tw-w-full">
                            <vue3-marquee :duration="110" direction="reverse" :vertical="lg" pauseOnHover>
                                <div v-for="x in 10" :key="'down-' + x" class="tw-mb-3 tw-w-full" :class="lg?'':'tw-px-2'">
                                    <Card  class="tw-cursor-pointer" @click="handleAjoCard(x)"    :style="lg?'width:100%':'width: 95% !important'" />
                                </div>
                            </vue3-marquee>
                        </div>
                    </div>
                </div>

                <div
                    class="tw-p-[80px] tw-bg-[#36454F] tw-min-h-[280px] tw-w-full tw-grid xl:tw-grid-cols-4 md:tw-grid-cols-2 tw-gap-8 tw-items-center">
                    <Counter v-for="x in 4" :key="x" />
                </div>

                <div class="tw-mt-[30px] tw-px-[9%] tw-min-h-[840px] tw-bg-[#F8F9D7]">
                    <BodyContent />
                </div>

                <div class="tw-mt-[30px] tw-px-[9%] tw-min-h-[400px] tw-bg-[white]">
                    <AjoGuide />
                </div>

                <div class="tw-bg-[#36454F] tw-min-h-[280px] tw-mt-[30px] tw-px-[9%] ">
                    <joinAjoTradition />
                </div>

                <div class="tw-min-h-[48px] tw-bg-[#E1E1E1] tw-px-[8%]">
                    <AjoFooter />
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
import BodyContent from '@/components/AboutAjo.vue';
import Counter from '@/components/Counter.vue';
import AjoGuide from '@/components/AjoGuide.vue';
import joinAjoTradition from "@/components/joinAJoTradition.vue";
import AjoFooter from '@/components/AjoFooter.vue'
import Nav from '@/components/Nav.vue'
//import { Swiper, SwiperSlide } from 'swiper/vue';

import {Vue3Marquee} from 'vue3-marquee';

export default {
    components: {
        Vue3Marquee,
        AjoLandContent,
        IonContent,
        Card,
        Counter,
        BodyContent,
        AjoGuide,
        joinAjoTradition,
        AjoFooter,
        Nav,
    },
    methods: {
        handleAjoCard(x) {
            alert(x)
        }
    },
    computed:{
        lg(){
            return this.$vuetify.display.lgAndUp;
        }
    }
};
</script>
<style scoped>
@keyframes move-up {
    0% {
        transform: translateY(-50%);
    }

    100% {
        transform: translateY(50%);
    }
}

@keyframes move-down {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

.animate-up {
    transition: transform 0.3s;
    will-change: transform;
    animation: move-up 5s ease-in-out infinite alternate;
}

.animate-down {
    transition: transform 0.3s;
    will-change: transform;
    animation: move-down 5s ease-in-out 2.5s infinite alternate;
}


.tw-overflow-hidden {
    position: relative;
    /* Ensure this is applied to allow animation movement */
    height: 100vh;
    /* Ensure enough height to allow card movement */
}
.vue3-marquee.vertical{
    width: 100% !important;
}
</style>
