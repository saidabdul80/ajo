<template>
  <main class="tw-h-full tw-flex tw-flex-col">
    <Header :title="HeaderTitle" :description="HeaderDescription" />
    <ion-content color="light">
      <div :class="['tw-px-5 tw-py-4 tw-flex tw-flex-col', heightStyle]">
        <slot></slot>
      </div>
    </ion-content>
  </main>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "DefaultLayout",
  props: {
    HeaderTitle: {
      type: String,
      default: "Hello, Rhoda",
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
};
</script>
