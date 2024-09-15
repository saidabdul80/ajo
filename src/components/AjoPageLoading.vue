<template>
    <div class="tw-flex items-center tw-justify-center  tw-w-[60rem] tw-bg-white">
      <div class="tw-text-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
          animationDuration=".5s" aria-label="Custom ProgressSpinner" />
        <p class="tw-mt-9 tw-text-gray-700 tw-font-semibold">We are setting up your account...</p>
      </div>
      
    </div>
  </template>
  
  <script>
  import ProgressSpinner from 'primevue/progressspinner';
  
  export default {
    components: {
      ProgressSpinner,
    },
  };
  </script>
  
  <style scoped>
  /* You can add any additional scoped styles here */
  </style>
  