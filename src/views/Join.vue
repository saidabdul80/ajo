<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <form @submit.prevent="submitForm" class="!tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-12 md:tw-py-0">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1 class="md:tw-text-left tw-text-center" text="Join Ajo by Cowris" />
              <span class="md:tw-text-left tw-text-balance tw-text-center tw-text-lg tw-mb-8 tw-block tw-text-gray-500">
                Already have an account on Cowris?
                <a @click="$globals.to('/signin')" class="tw-underline tw-cursor-pointer tw-text-gray-800">Sign in</a>
              </span>

              <Input class="tw-mb-5" placeholder="FirstName" v-model="initialValues.firstName" />

              <Input class="tw-mb-5" placeholder="LastName" v-model="initialValues.lastName" />

              <Input class="tw-mb-5" placeholder="Email Address" v-model="initialValues.email" />
              <vue-tel-input
                :dropdownOptions="{ showSearchBox: true, showFlags: true }"
                :inputOptions="{ showDialCode: true }"
                class="tw-w-full !tw-rounded-2xl tw-text-base tw-py-3 tw-mb-5 tw-h-[48px]"
                v-model="initialValues.phone_number">
                <template #arrow-icon>
                  <img src="/images/arrow-down.svg" alt="Custom Icon" />
                </template>
              </vue-tel-input>
              <Password class="tw-mb-8" placeholder="Password" v-model="initialValues.password" autocomplete="current-password" />

              <div class="tw-flex tw-w-full tw-justify-between tw-gap-3 tw-mb-8">
                <div class="tw-flex tw-gap-1">
                  <Checkbox :binary="true" v-model="initialValues.accept" />
                </div>
                <p class="tw-text-base -tw-mt-1 tw-block tw-text-gray-500 tw-text-balance">
                  I have read and agreed to the
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800">Terms & Conditions</a>
                  and
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800">KYC Policy</a>
                  and confirm that I am opening this account for my own personal use, and not for use by a third party.
                </p>
              </div>

              <Button label="Sign up" class="tw-w-full" type="submit" :disabled="!formIsValid || authStore.loading" :loading="authStore.loading" />
            </div>
          </form>
        </ion-content>
      </template>
    </template1>
  </div>
</template>
<script>
import { IonContent } from "@ionic/vue";
import Template1 from "@/components/Template1.vue";
import Input from "@/components/Input.vue";
import Password from "@/components/Password.vue";
import Checkbox from "@/components/Checkbox.vue";
import H1 from "@/components/H1.vue";
import Button from "@/components/Button.vue";
import { useAuthStore } from "@/stores/auth.js";

export default {
  components: {
    IonContent,
    Template1,
    Input,
    Password,
    H1,
    Checkbox,
    Button,
  },
  data() {
    return {
      authStore: useAuthStore(),
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        password: "",
        accept: false,
      },
    };
  },
  computed: {
    formIsValid() {
      return this.initialValues.firstName && this.initialValues.lastName && this.initialValues.email && this.initialValues.phone_number && this.initialValues.password && this.initialValues.accept;
    },
  },
  methods: {
    submitForm() {
      if (this.formIsValid) {
        this.authStore.register({
          accept: this.initialValues.accept,
          first_name: this.initialValues.firstName,
          last_name: this.initialValues.lastName,
          email: this.initialValues.email,
          password: this.initialValues.password,
          password_confirmation: this.initialValues.password,
          phone_number: this.initialValues.phone_number,
        });
      }
    },
  },
};
</script>
