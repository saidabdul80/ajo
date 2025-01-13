<template>
  <main class="tw-h-full tw-flex tw-flex-col">
    <Header :title="computedHeaderTitle" :description="HeaderDescription">
      <template #headerRightContent>
        <slot name="rightContent"></slot>
      </template>
    </Header>
    <ion-content color="light">
      <div :class="[isContentHeightFull && 'tw-h-full', 'tw-px-5 tw-py-4 tw-flex tw-flex-col tw-overflow-hidden']">
        <slot></slot>
      </div>
    </ion-content>
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import { computed } from "vue";
import { useUserStore } from "@/stores/user.js";

export default {
  name: "DefaultLayout",
  props: {
    HeaderTitle: {
      type: String,
    },
    HeaderDescription: {
      type: String,
      default: "Experience the power of group savings.",
    },

    isContentHeightFull: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Header,
  },
  setup() {
    const userStore = useUserStore();

    const fullName = computed(() => `${userStore.user.first_name} ${userStore.user.last_name}`);

    const computedHeaderTitle = computed(() => {
      return userStore.user.first_name ? fullName.value : "Default Header Title";
    });

    return {
      fullName,
      computedHeaderTitle,
    };
  },
};
</script>
