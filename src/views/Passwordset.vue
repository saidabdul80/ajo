<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <div class="tw-mx-auto tw-w-[150px] tw-h-[150px] md:tw-w-[300px] md:tw-h-[300px] tw-mb-12">
                <img src="/images/password-protection.svg" alt="password set icon" width="100%" height="100%" />
              </div>

              <div class="tw-text-center tw-mx-auto">
                <H1 class="tw-text-center" text="Password set!" />
                <p class="tw-pt-4 tw-pb-12 tw-text-lg tw-text-[#586283] tw-font-normal">Your new password has been successfully created. You can now sign in with your new password.</p>
              </div>
              <Button label="Sign in" size="large" class="tw-w-full" @click="$globals.to('/signin')" />
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
