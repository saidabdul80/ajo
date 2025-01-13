<template>
  <Nav :isNavLinkVisible="false" />
  <ion-content v-bind="$attrs" class="scroller-body-inner" color="white" :fullscreen="true">
    <main class="tw-h-full tw-flex tw-flex-col tw-pt-5">
      <div class="tw-p-6">
        <!-- Ajo Details Section -->
        <div class="tw-col-span-2 tw-space-y-7" v-if="ajo">
          <div class="tw-bg-whitetw-space-y-6">
            <div class="tw-space-y-3">
              <h4 class="tw-flex tw-items-center tw-gap-2 tw-text-xl tw-text-[#0F1419]">
                <img class="tw-inline-block" src="/images/wallet.svg" alt="icon" />
                <span class="tw-capitalize">{{ ajo.name }}</span>
              </h4>
              <p class="tw-text-[#000000]">{{ ajo.description }}</p>
            </div>

            <div class="tw-space-y-3 sm:tw-space-y-6">
              <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
                <div class="tw-space-2">
                  <p class="tw-text-sm tw-text-[#333333]">Overall target amount</p>
                  <h5 class="tw-text-2xl tw-text-black">{{ globalStore.formatNumber(ajo.total_contribution_expected) }}</h5>
                </div>
                <div class="tw-space-2">
                  <p class="tw-text-sm tw-text-[#333333]">Amount per person</p>
                  <h5 class="tw-text-2xl tw-text-black">{{ globalStore.formatNumber(ajo.amount) }}</h5>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
                <div class="tw-space-2">
                  <p class="tw-text-sm tw-text-[#333333]">Frequency of contribution</p>
                  <h5 class="tw-text-2xl tw-text-black">{{ ajo.frequency_name }}</h5>
                </div>
                <div class="tw-space-2">
                  <p class="tw-text-sm tw-text-[#333333]">Starting date</p>
                  <h5 class="tw-text-2xl tw-text-black">{{ formattedDate(ajo.start_date) }}</h5>
                </div>
              </div>
              <div class="tw-flex tw-flex-col tw-gap-3 sm:tw-grid tw-grid-cols-2 sm:tw-items-center tw-justify-between">
                <div class="tw-space-2">
                  <p class="tw-text-sm tw-text-[#333333]">End date</p>
                  <h5 class="tw-text-2xl tw-text-black">{{ formattedDate(ajo.end_date) }}</h5>
                </div>
              </div>
            </div>

            <div class="tw-space-y-1 tw-pt-8">
              <h4 class="tw-text-lg tw-text-black tw-font-medium">Rules set by Admin</h4>
              <ul class="tw-list-disc tw-pl-4 tw-text-black tw-font-normal">
                <li>No participant can leave when contribution starts.</li>
                <li>No participant should invite someone unknown or untrustworthy.</li>
                <li>No participant can swap slot without requesting through admin.</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="sm:tw-max-w-[70%]">
          <div class="tw-flex tw-flex-col tw-gap-7 rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
            <div class="tw-flex tw-items-center tw-gap-2">
              <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>

              <Skeleton height="2rem" width="8rem"></Skeleton>
            </div>
            <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              <Skeleton width="100%" height="20rem"></Skeleton>
              <Skeleton width="100%" height="20rem"></Skeleton>
            </div>
            <div class="tw-hidden md:tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
              <Skeleton width="400px" height="8rem"></Skeleton>
              <Skeleton width="400px" height="8rem"></Skeleton>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-justify-center tw-min-h-[48px] tw-bg-[#E1E1E1] tw-py-4 md:tw-px-20 tw-px-4 tw-mt-auto">
        <AjoFooter />
      </div>
    </main>
  </ion-content>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useGlobalsStore } from "@/stores/globals.js";
import { helpers } from "@/helpers/utilities.js";
import Skeleton from "primevue/skeleton";
import Nav from "@/components/Nav.vue";
import AjoFooter from "@/components/AjoFooter.vue";

export default {
  components: {
    Nav,
    AjoFooter,
    Skeleton,
  },
  inheritAttrs: false,
  setup() {
    const route = useRoute();
    const globalStore = useGlobalsStore();
    const { formattedDate } = helpers;

    const ajo = ref(null);

    const fetchAjoDetails = async () => {
      const ajos = await globalStore.fetchAjos();
      if (ajos.length > 0) {
        ajo.value = ajos.find((ajo) => ajo.id == route.params.id);
      }
    };

    onMounted(() => {
      fetchAjoDetails();
    });

    return {
      route,
      ajo,
      globalStore,
      formattedDate,
    };
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
