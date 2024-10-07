<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="!tw-flex tw-flex-col tw-w-full tw-h-[100vh] tw-mt-20 tw-items-center">
            <div class="tw-w-[50%] tw-mt-20">
              <H1 class="tw-font-[600]" text="Create new password" />
              <span
                class="tw-text-[14.3px] tw-mb-8 tw-mt-2 tw-block tw-text-gray-500">
                Create a new password to sign in later.
              </span>

              <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
                <Password
                  v-model="form.password"
                  class="tw-mb-8"
                  placeholder="Password"
                  size="medium" />
                <Input
                  v-model="form.confirmPassword"
                  class="tw-mb-5 tw-w-full"
                  placeholder="Confirm password"
                  size="medium"
                  type="password" />

                <span
                  v-if="passwordMismatch"
                  class="tw-text-red-500 tw-text-[12px] tw-mb-4">
                  Passwords do not match
                </span>
                <Button
                  label="Continue"
                  size="medium"
                  class="tw-w-full tw-mt-[15px]" />

                <a
                  href="#"
                  class="tw-text-center tw-mt-[10px] tw-text-[14px] tw-font-[600]">
                  Resend code
                </a>
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
import Password from "@/components/Password.vue";
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
    Password,
  },
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    passwordMismatch() {
      return (
        this.form.password &&
        this.form.confirmPassword &&
        this.form.password !== this.form.confirmPassword
      );
    },
  },
};
</script>

<style scoped></style>
