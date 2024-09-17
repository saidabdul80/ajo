<template>
    <Button
      :label="label"
      :icon="loading ? 'pi pi-spin pi-spinner' : icon"
      :outlined="outlined"
      :disabled="disabled"
        :severity="color"
        :pt="{icon:{style:'font-size:12px'}}"
      :loading="loading"
      @click="onClick"
      :size="size"
      v-bind="$props"
      class="!tw-rounded-[12px]"
    >
    </Button>
  </template>
  
  <script>
  import Button from 'primevue/button';
  
  export default {
    name: 'CustomButton',
    components: {
      Button,
    },
    props: {
      outlined:{
        type:Boolean,
        default:false,
      },
      label: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: '',
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
        default: '',
      },
      color:{
        type:String,
        default:"contrast"
      },
      size:{
        type:String,
        default:"Normal"
      }
    },
    methods: {
      onClick(event) {
        this.$emit('click', event);
      },
    },
  };
  </script>
  
  <style>
  /* Custom styles for button if needed */
  </style>
  