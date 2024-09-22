<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="!tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-12 md:tw-py-0">
            <div class="md:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1
                class="md:tw-text-left tw-text-center"
                text="Join Ajo by Cowris" />
              <span
                class="md:tw-text-left tw-text-balance tw-text-center tw-text-lg tw-mb-8 tw-block tw-text-gray-500"
                >Already have an account on Cowris?
                <a
                  @click="$globals.to('/signin')"
                  class="tw-underline tw-cursor-pointer tw-text-gray-800">
                  Sign in
                </a></span
              >
              <Input class="tw-mb-5" placeholder="Full Name" size="medium" />
              <Input
                class="tw-mb-5"
                placeholder="Email Address"
                size="medium" />
              <Password class="tw-mb-8" placeholder="Password" size="medium" />

              <div
                class="tw-flex tw-w-full tw-justify-between tw-gap-3 tw-mb-8">
                <div class="tw-flex tw-gap-1">
                  <Checkbox :binary="true" v-model="form.accept" />
                </div>
                <p
                  class="tw-text-base -tw-mt-1 tw-block tw-text-gray-500 tw-text-balance">
                  I have read and agreed to the
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800"
                    >Terms & Conditions</a
                  >
                  and
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800"
                    >KYC Policy</a
                  >
                  and confirm that I am opening this account for my own personal
                  use, and not for use by a third party.
                </p>
              </div>
              <!-- <div class="tw-flex tw-gap-1 tw-mb-8">
                <Checkbox :binary="true" v-model="form.accept" />
                <p
                  class="tw-text-base -tw-mt-1 tw-block tw-text-gray-500 tw-text-balance">
                  I have read and agreed to the
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800"
                    >Terms & Conditions</a
                  >
                  and
                  <a class="tw-underline tw-cursor-pointer tw-text-gray-800"
                    >KYC Policy</a
                  >
                  and confirm that I am opening this account for my own personal
                  use, and not for use by a third party.
                </p>
              </div> -->
              <Button label="Sign up" size="large" class="tw-w-full" />
            </div>
          </div>
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
      form: {},
    };
  },
};
</script>

<style></style>
