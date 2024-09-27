<template>
  <div class="tw-relative tw-flex tw-items-center tw-rounded-[12px]">
    <span v-if="icon" class="tw-absolute tw-text-gray-300 tw-left-5">
      <i :class="icon"></i>
    </span>
    <InputText
      v-model="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'tw-w-full !tw-rounded-2xl !tw-text-base',
        { '!tw-pl-10': icon },
        computedClass,
      ]"
      :type="type" />
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
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
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
      default: "large",
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
          "!tw-py-1 tw-h-[50px]": this.size === "small",
          "!tw-py-3 !tw-text-base tw-h-[54px]": this.size === "medium", // Default padding for medium
          "!tw-py-3 md:!tw-py-5 !tw-text-lg tw-h-16": this.size === "large",
        },
      ];
    },
  },
};
</script>

<style></style>
