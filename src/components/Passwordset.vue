<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="!tw-flex tw-flex-col tw-w-full md:tw-h-[100vh] tw-mt-20 tw-items-center">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%] tw-mt-20">
              <H1 class="md:tw-text-left tw-text-center" text="Welcome back" />
              <span
                class="md:tw-text-left tw-text-center tw-text-sm tw-mb-8 tw-block tw-text-gray-500"
                >No Cowris account yet?
                <a
                  @click="$globals.to('/join')"
                  class="tw-underline tw-cursor-pointer tw-text-gray-800"
                  >Sign up</a
                >
              </span>
              <Input
                class="tw-mb-5"
                placeholder="Email Address"
                size="medium" />
              <Password class="tw-mb-8" placeholder="Password" size="medium" />
              <div
                class="tw-flex tw-w-full tw-justify-between md:tw-gap-1 tw-mb-8">
                <div class="tw-flex tw-gap-1 tw-items-center">
                  <Checkbox :binary="true" v-model="form.accept" />
                  <span class="tw-text-sm -tw-mt-1 tw-block tw-text-gray-500"
                    >Remember me</span
                  >
                </div>
                <a class="tw-text-sm tw-font-bold">Forgot password?</a>
              </div>
              <Button label="Sign up" size="medium" class="tw-w-full" />
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

<style lang="scss" scoped></style>
