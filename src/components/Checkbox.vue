<template>
    <Checkbox   v-model="internalValue" :binary="binary" v-bind="$props" />
  </template>
  
  <script>

import Checkbox from 'primevue/checkbox';

  
  export default {
    name: "CustomInput",
    components: {
        Checkbox,
    },
    props: {
      modelValue: {
        type: [String, Number],
        required: true,
      },
   
      disabled: {
        type: Boolean,
        default: false,
      },
      binary: {
        type: Boolean,
        default: false,
      },
      inputId:{
        type:String,
      },
      name:{
        type:String
      },
      value:{
        type:[String, Number]
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
  :root{
    --p-checkbox-checked-background: black !important;
    --p-checkbox-checked-hover-background:#222 !important;
    --p-checkbox-checked-border-color: black !important;
    --p-checkbox-checked-hover-border-color: black !important;
    --p-checkbox-width:16px !important;
    --p-checkbox-height:16px !important;
    --p-checkbox-icon-size: 11px !important;
  }
  </style>
  