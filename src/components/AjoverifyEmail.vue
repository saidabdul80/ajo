<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="!tw-flex tw-flex-col tw-w-full tw-h-[100vh] tw-mt-20 tw-items-center">
            <div class="tw-w-[50%] tw-mt-20">
              <H1 class="tw-font-[600]" text="Verify email address" />
              <span
                class="tw-text-[14.3px] tw-mb-8 tw-mt-2 tw-block tw-text-gray-500">
                We sent a 6-digit code to rhodaogunesan@gmail.com. Please enter
                the code to verify your email address.
              </span>

              <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
                <InputNumber
                  class="tw-mb-5 tw-w-full"
                  size="medium"
                  v-model="value2"
                  placeholder="Your 6-digit code"
                  inputId="minmax"
                  :min="0"
                  :max="6"
                  :useGrouping="false" />

                <Button
                  label="Continue"
                  size="medium"
                  class="tw-w-full tw-mt-[15px]" />

                <a
                  href="#"
                  class="tw-text-center tw-mt-[10px] tw-text-[14px] tw-font-[600]"
                  >Resend code</a
                >
              </div>
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
import H1 from "@/components/H1.vue";
import Button from "@/components/Button.vue";
import InputNumber from "primevue/inputnumber";
export default {
  components: {
    IonContent,
    Template1,
    InputNumber,
    H1,
    Button,
  },
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style scoped></style>
