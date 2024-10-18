<template>
  <main class="tw-h-full tw-flex tw-flex-col">
    <Header :title="computedHeaderTitle" :description="HeaderDescription">
      <template #headerRightContent>
        <slot name="rightContent"></slot>
      </template>
    </Header>
    <ion-content color="light">
      <div :class="['tw-px-5 tw-py-4 tw-flex tw-flex-col', heightStyle]">
        <slot></slot>
      </div>
    </ion-content>
  </main>
</template>
<script>
import Header from "@/components/Header.vue";
import { useAuthStore } from "@/stores/auth.js";

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

    heightStyle: {
      type: String,
    },
  },
  components: {
    Header,
  },

  data() {
    return {
      user: useAuthStore().user,
    };
  },

  computed: {
    fullName() {
      return this.user.full_name;
    },

    computedHeaderTitle() {
      return this.HeaderTitle ? this.HeaderTitle : this.fullName;
    },
  },
};
</script>
