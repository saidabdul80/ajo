<template>
  <Button
    :label="label"
    :icon="loading ? 'pi pi-spin pi-spinner' : icon"
    :outlined="outlined"
    :disabled="disabled"
    :severity="color"
    :loading="loading"
    @click="onClick"
    v-bind="$props"
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
          "!tw-px-[10px] tw-h-[30px] tw-text-sm": this.size === "xsmall",
          "!tw-py-1 tw-h-[50px]": this.size === "small",
          "!tw-py-3 !tw-text-base tw-h-[54px]": this.size === "medium",
          "!tw-py-3 md:!tw-py-5 !tw-text-lg tw-h-16": this.size === "large",
        },
      ];
    },
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<style></style>
