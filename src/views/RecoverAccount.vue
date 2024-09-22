<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="md:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1
                class="md:tw-text-left tw-text-center"
                text="Recover account" />
              <p
                class="tw-pt-4 tw-pb-12 tw-text-center md:tw-text-left tw-text-lg tw-text-[#586283] tw-font-normal">
                Please, enter your email address used for registration. A code
                will be sent to verify you own the account.
              </p>
              <Input
                class="tw-mb-8"
                placeholder="Email Address"
                v-model="form.email" />

              <Button label="Continue" size="large" class="tw-w-full" />
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
      form: {
        email: "",
      },
    };
  },
};
</script>

<style></style>
