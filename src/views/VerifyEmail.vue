<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1
                class="md:tw-text-left tw-text-center"
                text="Verify email address" />
              <p
                class="tw-pt-4 tw-pb-12 tw-text-center md:tw-text-left tw-text-lg tw-text-[#586283] tw-font-normal">
                We sent a 6-digit code to rhodaogunesan@gmail.com. Please enter
                the code to verify your email address.
              </p>
              <Input
                class="tw-mb-8"
                placeholder="Your 6-digit code"
                v-model="form.email" />

              <div class="tw-flex tw-flex-col tw-gap-4">
                <Button
                  @click="$globals.to('/newpassword')"
                  label="Submit"
                  size="large"
                  class="tw-w-full" />
                <Button
                  label="Resend code"
                  size="large"
                  class="tw-w-full !tw-text-black"
                  link />
              </div>
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
