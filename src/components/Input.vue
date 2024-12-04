<template>
  <div class="tw-relative tw-flex tw-flex-col tw-rounded-[12px] tw-w-full">
    <span v-if="icon" class="tw-absolute tw-text-gray-300 tw-left-5 tw-top-1/2 tw-translate-y-[-40%]">
      <i :class="icon"></i>
    </span>
    <InputText v-model="internalValue" v-bind="$props" :class="['tw-w-full !tw-rounded-2xl !tw-text-base', { '!tw-pl-10': icon }, computedClass]" />
    <p v-if="errorMessage !== ''" class="tw-text-red-700 tw-text-xs tw-m-1">{{ errorMessage }}</p>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";

export default {
  name: "CustomInput",
  components: {
    InputText,
  },
  props: {
    modelValue: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: "",
    },

    class: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "medium",
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
    computedClass() {
      return [
        this.class,
        {
          "!tw-py-1 tw-h-[42px]": this.size === "small",
          "!tw-py-3 !tw-h-[48px]": this.size === "medium",
        },
      ];
    },
  },
};
</script>

<style></style>
