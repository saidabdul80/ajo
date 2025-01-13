<template>
  <Nav />
  <ion-content v-bind="$attrs" class="scroller-body-inner" color="white" :fullscreen="true">
    <main id="container">
      <div class="tw-grid tw-gap-5 md:tw-px-20 tw-px-4" :class="lg ? 'tw-grid-cols-2' : ''">
        <AjoLandContent />
        <div class="tw-grid tw-gap-2 tw-h-full xl:tw-h-[90dvh] md:tw-overflow-hidden" :class="lg ? 'tw-grid-cols-2' : ''">
          <div class="tw-overflow-y-hidden">
            <vue3-marquee v-if="topAjos.length > 0" :gradient="true" :duration="110" :vertical="lg" pauseOnHover class="custom-marquee">
              <div v-for="ajo in topAjos" :key="ajo.id" class="tw-mb-3 tw-w-full tw-h-[280px]" :class="lg ? '' : 'tw-px-2'">
                <AjoCard :ajo="ajo" pagePath="/ajosummary" :isWidthFull="true" />
              </div>
            </vue3-marquee>
            <div v-else class="tw-flex tw-flex-col tw-gap-3 tw-py-3">
              <Skeleton width="100%" height="18rem"></Skeleton>
              <Skeleton width="100%" height="18rem"></Skeleton>
              <Skeleton class="tw-hidden xl:tw-block" width="100%" height="18rem"></Skeleton>
            </div>
          </div>
          <div class="tw-overflow-y-hidden tw-w-full">
            <vue3-marquee v-if="topAjos.length > 0" :duration="110" :gradient="true" direction="reverse" :vertical="lg" pauseOnHover class="custom-marquee">
              <div v-for="ajo in bottomAjos" :key="'down-' + ajo.id" class="tw-mb-3 tw-w-full tw-h-[280px]" :class="lg ? '' : 'tw-px-2'">
                <AjoCard :ajo="ajo" pagePath="/ajosummary" :isWidthFull="true" />
              </div>
            </vue3-marquee>

            <div v-else class="tw-hidden xl:tw-flex tw-flex-col tw-gap-3 tw-py-3">
              <Skeleton width="100%" height="18rem"></Skeleton>
              <Skeleton width="100%" height="18rem"></Skeleton>
              <Skeleton width="100%" height="18rem"></Skeleton>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-bg-[#36454F] tw-py-20 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4 md:tw-px-20 tw-px-4">
        <Counter v-for="(counterItem, index) in counterItems" :key="index" :item="counterItem" />
      </div>

      <div class="tw-bg-[#F8F9D7] md:tw-px-20 tw-px-4 tw-py-20 md:tw-py-[120px]">
        <BodyContent />
      </div>

      <div class="md:tw-px-20 tw-px-4 tw-py-20 md:tw-py-[120px]">
        <AjoGuide />
      </div>

      <div class="tw-bg-[#36454F] md:tw-px-20 tw-px-4 tw-py-10">
        <JoinAjoTradition />
      </div>

      <div class="tw-flex tw-flex-col tw-justify-center tw-min-h-[48px] tw-bg-[#E1E1E1] tw-py-4 md:tw-px-20 tw-px-4">
        <AjoFooter />
      </div>
    </main>
  </ion-content>
</template>

<script>
import { IonContent } from "@ionic/vue";
import AjoLandContent from "@/components/AjoLandContent.vue";
import BodyContent from "@/components/AboutAjo.vue";
import Counter from "@/components/Counter.vue";
import AjoGuide from "@/components/AjoGuide.vue";
import JoinAjoTradition from "@/components/joinAJoTradition.vue";
import AjoFooter from "@/components/AjoFooter.vue";
import Nav from "@/components/Nav.vue";
import { Vue3Marquee } from "vue3-marquee";
import AjoCard from "@/components/AjoCard.vue";
import Skeleton from "primevue/skeleton";
export default {
  components: {
    Vue3Marquee,
    AjoLandContent,
    IonContent,
    Counter,
    BodyContent,
    AjoGuide,
    JoinAjoTradition,
    AjoFooter,
    Nav,
    AjoCard,
    Skeleton,
  },
  inheritAttrs: false,
  data() {
    return {
      counterItems: [
        {
          bg_color: "#F8F9D7",
          icon: "/images/good.png",
          count: "100",
          text: "Completed Projects",
        },
        {
          bg_color: "#F1FFEA",
          icon: "/images/payments.png",
          count: "₦2.3M",
          text: "Ongoing Projects",
        },
        {
          bg_color: "#FFE3F1",
          icon: "/images/supervised.png",
          count: "46",
          text: "Pending Projects",
        },
        {
          bg_color: "#EEE9FF",
          icon: "/images/loading.png",
          count: "327",
          text: "New Projects",
        },
      ],
    };
  },
  computed: {
    lg() {
      return this.$vuetify?.display?.lgAndUp ?? false;
    },
    topAjos() {
      const splitPoint = Math.ceil((this.$globals?.all_ajos?.length || 0) / 2);
      return this.$globals?.all_ajos?.slice(0, splitPoint) || [];
    },
    bottomAjos() {
      const splitPoint = Math.ceil((this.$globals?.all_ajos?.length || 0) / 2);
      return this.$globals?.all_ajos?.slice(splitPoint) || [];
    },
  },
  created() {
    this.$globals.fetchAjos();
  },
};
</script>

<style scoped>
ion-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 96px);
}

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
  height: 100vh;
}

.vue3-marquee.vertical {
  width: 100% !important;
}
</style>
