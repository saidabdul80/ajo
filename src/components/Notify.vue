<template>
  <div
    :class="' tw-bg-yellow-400/35 tw-border tw-border-yellow-500'"
    class="tw-w-full tw-py-2 tw-px-3 tw-flex tw-justify-between tw-h-16">
    <div class="tw-flex tw-items-center tw-gap-2 tw-text-base">
      <img
        :src="warning"
        v-if="type == 'warning'"
        class="tw-w-6 tw-h-6 tw-border-yellow-600"
        name="warning" />
      {{ message }}
    </div>
    <div>
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
import { IonIcon } from "@ionic/vue";
import { warning } from "ionicons/icons";

export default {
  props: {
    type: {
      type: String,
      default: "warning",
    },
    message: {
      type: String,
      default: "Verify your email address to explore Ajo by Cowris.",
    },
  },
  components: {
    IonIcon,
  },
  data() {
    return {
      warning: warning,
    };
  },
};
</script>

<style lang="scss" scoped></style>
