<template>
    <div class="tw-flex tw-justify-center tw-items-center tw-flex-col tw-h-[600px] tw-w-full">
      <img v-if="status === '200'" width="200px" src="../assets/wallet-success.svg">
      <img v-if="status !== '200'" width="200px" src="../assets/error-icon.svg">
      <p :class="messageClass">{{ personalizedMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        status: '',
        name: '',
        messages: {
          invites: {
            200: ', invite accepted successfully',
            409: ', you are already a member',
            404: ', invite or user not found',
            422: ', invalid invite parameters',
            default: ', unknown status'
          }
        }
      };
    },
    computed: {
      personalizedMessage() {
        return `${this.name}${this.messages.invites[this.status] || this.messages.invites.default}`;
      },
      messageClass() {
        switch (this.status) {
          case '200':
            return 'tw-text-green-700 tw-text-2xl tw-font-bold';
          case '409':
            return 'tw-text-yellow-600 tw-text-2xl tw-font-bold';
          case '404':
          case '422':
            return 'tw-text-red-600 tw-text-2xl tw-font-bold';
          default:
            return 'tw-text-gray-600 tw-text-2xl tw-font-bold';
        }
      }
    },
    created() {
      this.status = this.$route.params.status;
      this.name = this.$route.params.name;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  