<template>
    <Button
      :label="label"
      :icon="loading ? 'pi pi-spin pi-spinner' : icon"
      :disabled="disabled"
        :severity="color"
        :pt="{icon:{style:'font-size:12px'},label:{style:'font-size:12px'}}"
         class="tw-h-[32px]"
      :loading="loading"
      @click="onClick"
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
  