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
    class="!tw-px-4"
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
      default: "medium", // Default size is "medium"
    },
    rounded: {
      type: Boolean,
      default: true, // Default to rounded corners
    },
  },
  computed: {
    computedClass() {
      return [
        this.class,
        {
          "!tw-rounded-[12px]": this.rounded, // Applies rounded corners if true
          "!tw-py-2": this.size === "small",
          "!tw-py-3 !tw-text-base": this.size === "medium", // Default padding for medium
          "!tw-py-3 md:!tw-py-5 !tw-text-lg": this.size === "large",
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
