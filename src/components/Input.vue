<template>
    <div class="tw-relative tw-flex tw-items-center tw-rounded-[12px]">
      <span v-if="icon" class="tw-absolute tw-text-gray-300 tw-left-2">
        <i :class="icon"></i>
      </span>
      <InputText
        v-model="internalValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="tw-h-[32px] pl-8"
        :class="'tw-bg-['+bgcolor+']'"
        :pt="{root:{style:(icon!='')?'padding-left:1.8rem !important':''}}"
        :type="type"
      />
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
      bgcolor:{
        type:String,
        default:"black"
      }
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
  
  <style>
  .p-inputtext::placeholder {
    font-size: 12px; /* Adjust this value as needed */
    }
    .p-inputtext{
        color:#222;
        font-size: 12px;
    }
  </style>
  