<template>
  <Button
    :label="label"
    :outlined="outlined"
    :severity="color"
    v-bind="$props"
    :size="size"
    :class="computedClass">
  </Button>
</template>

<script>
import Button from "primevue/button";

export default {
  name: "CustomButton",
  components: {
    Button,
  },
  props: {
    outlined: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "contrast",
    },
    size: {
      type: String,
      default: "medium",
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    isFullWidth: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedClass() {
      return [
        this.class,
        this.isFullWidth ? "tw-w-full" : "tw-w-fit",
        {
          "!tw-rounded-[12px]": this.rounded,
          "!tw-px-[10px] tw-h-[30px]": this.size === "xsmall",
          "!tw-py-1 !tw-px-4 tw-h-[48px]": this.size === "medium",
        },
      ];
    },
  },
};
</script>

<style></style>
