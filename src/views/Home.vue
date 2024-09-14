<template>
    <Nav />
    <ion-content color="white" :fullscreen="true">

        <div>
            <div id="container" class="tw-pt-5 tw-px-20">
                <div class="tw-grid tw-grid-cols-2 tw-gap-5  tw-mb-[20vh]">
                    <AjoLandContent class="tw-mt-[14vh]" />
                    <div class="tw-grid tw-grid-cols-2 tw-gap-2 tw-h-[100vh]">
                            <div class="">
                                <swiper :direction="'vertical'" :loop="true"
                                    :autoplay="true" :speed="3000"
                                    :space-between="0"
                                    :slides-per-view="2" class="swiper-container">
                                    <swiper-slide v-for="x in 10" :key="x">
                                        <Card class="tw-mb-3" />
                                    </swiper-slide>
                                </swiper>
                            </div>
                            <div class="">
                                <!-- automatic animate down 0.3s speed  delay 2.5sec -->
                                <swiper :direction="'vertical'" :loop="true"
                                    :autoplay="{ delay: 0, disableOnInteraction: false, reverseDirection: true }"
                                    :speed="3000" :slides-per-view="2" class="swiper-container">
                                    <swiper-slide v-for="x in 10" :key="'down-' + x">
                                        <Card />
                                    </swiper-slide>
                                </swiper>
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
import BodyContent from '@/components/BodyContent.vue';
import Counter from '@/components/Counter.vue';
import AjoGuide from '@/components/AjoGuide.vue';
import joinAjoTradition from "@/components/joinAJoTradition.vue";
import AjoFooter from '@/components/AjoFooter.vue'
import Nav from '@/components/Nav.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper-bundle.css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper/core';
import { Autoplay, Pagination, Navigation } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);


export default {
    components: {
        Swiper,
        SwiperSlide,
        AjoLandContent,
        IonContent,
        Card,
        Counter,
        BodyContent,
        AjoGuide,
        joinAjoTradition,
        AjoFooter,
        Nav
    },
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
</style>
