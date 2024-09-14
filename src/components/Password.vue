<template>
  
      <Password    
        :placeholder="placeholder"
        :disabled="disabled"
         :size="size"
        class="!pl-10 !tw-rounded-xl !tw-w-full"
        :class="{'tw-h-[32px]':size=='normal','tw-h-[52px]':size=='large','tw-h-[45px]':size=='medium'}"
        v-model="internalValue">
            <template #header>
                <div class="font-semibold text-xm mb-4">Pick a password</div>
            </template>
            <template #footer>
                <Divider />
                <ul class="pl-2 ml-2 my-0 leading-normal">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </template>
        </Password>

  </template>
  
  <script>

import Password from 'primevue/password';

  
  export default {
    name: "CustomInput",
    components: {
      Password,
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
      size:{
        type:String,
        default:'normal'
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
  .p-password-input{
    width: 100%;
    border-radius: 12px !important;
  }
  .p-inputtext::placeholder {
    font-size: 12px; /* Adjust this value as needed */
    color:#eee;
    letter-spacing: 1px;
    }
    .p-inputtext{
        color:#222;
        font-size: 12px;
    }
  </style>
  