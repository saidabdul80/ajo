<template>
  <div class="tw-relative tw-flex tw-items-center tw-rounded-[12px]">
    <span v-if="icon" class="tw-absolute tw-text-gray-300 tw-left-2">
      <i :class="icon"></i>
    </span>
    <InputText
      v-model="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="tw-w-full tw-h-14 md:tw-h-16 !tw-px-5 !tw-rounded-2xl !tw-text-base"
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
      default: "normal",
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
  },
};
</script>

<style></style>
