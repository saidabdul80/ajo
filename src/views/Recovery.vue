<template>
    <div class="tw-h-full tw-w-full" color="light">
      <template1>
        <template #content>
          <ion-content color="white">
            <div class="!tw-flex tw-flex-col tw-w-full md:tw-h-[100vh]  tw-mt-20 tw-items-center">
              <div class="md:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%] md:tw-mt-20">
                <H1 class="tw-font-[600]" text="Recover account" />
                <span class="tw-text-[14.3px] tw-mb-8 tw-mt-2 tw-block tw-text-gray-500">
                  Please, enter your email address used for registration.
                  A code will be sent to verify you own the account.
                </span>
                <Input v-model="form.email" class="tw-mb-5" placeholder="Email Address" size="medium" />
  
  
                <span v-if="isEmailInvalid" class="tw-text-red-500 tw-text-[12px] tw-mb-4">
                  Please enter a valid email address.
                </span>
  
  
                <Button label="Continue" size="medium" class="tw-w-full tw-mt-[13px]  " />
              </div>
            </div>
          </ion-content>
        </template>
      </template1>
      <slot name="content"></slot>
    </div>
  </template>
  
  
  <script>
  import { IonContent } from "@ionic/vue";
  import Template1 from "@/components/Template1.vue";
  import Input from "@/components/Input.vue";
  import H1 from "@/components/H1.vue";
  import Button from "@/components/Button.vue";
  
  export default {
    components: {
      IonContent,
      Template1,
      Input,
      H1,
      Button,
    },
    data() {
      return {
        form: {
          email: '',
        },
      };
    },
    computed: {
  
      isEmailInvalid() {
        return !this.form.email.includes('@gmail.com') && this.form.email.length > 0;
      }
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  