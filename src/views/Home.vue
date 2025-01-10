<template>
  <Nav />
  <ion-content v-bind="$attrs" class="scroller-body-inner" color="white" :fullscreen="true">
    <main id="container">
      <div class="tw-grid tw-gap-5 md:tw-px-20 tw-px-4" :class="lg ? 'tw-grid-cols-2' : ''">
        <AjoLandContent />
        <div class="tw-grid tw-gap-2 tw-h-full md:tw-h-[90dvh] md:tw-overflow-hidden" :class="lg ? 'tw-grid-cols-2' : ''">
          <div class="tw-overflow-y-hidden">
            <vue3-marquee :gradient="true" :duration="110" :vertical="lg" pauseOnHover class="custom-marquee">
              <div v-for="x in 10" :key="x" class="tw-mb-3 tw-w-full" :class="lg ? '' : 'tw-px-2'">
                <Card class="tw-cursor-pointer" :style="{ width: lg ? '100%' : '95%' }" />
              </div>
            </vue3-marquee>
          </div>
          <div class="tw-overflow-y-hidden tw-w-full">
            <vue3-marquee :duration="110" direction="reverse" :vertical="lg" pauseOnHover class="custom-marquee">
              <div v-for="x in 10" :key="'down-' + x" class="tw-mb-3 tw-w-full" :class="lg ? '' : 'tw-px-2'">
                <Card class="tw-cursor-pointer" :style="{ width: lg ? '100%' : '95%' }" />
              </div>
            </vue3-marquee>
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
import Card from "@/components/Card.vue";
import BodyContent from "@/components/AboutAjo.vue";
import Counter from "@/components/Counter.vue";
import AjoGuide from "@/components/AjoGuide.vue";
import JoinAjoTradition from "@/components/joinAJoTradition.vue";
import AjoFooter from "@/components/AjoFooter.vue";
import Nav from "@/components/Nav.vue";
import { Vue3Marquee } from "vue3-marquee";

export default {
  components: {
    Vue3Marquee,
    AjoLandContent,
    IonContent,
    Card,
    Counter,
    BodyContent,
    AjoGuide,
    JoinAjoTradition,
    AjoFooter,
    Nav,
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
  },
  created() {
    if (this.$globals && typeof this.$globals.fetchMyAjos === "function") {
      this.$globals.fetchMyAjos();
    } else {
      console.warn("fetchMyAjos function is not available in $globals.");
    }
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
