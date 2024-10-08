<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div
            class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="md:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1 class="md:tw-text-left tw-text-center" text="Welcome back" />
              <span
                class="md:tw-text-left tw-text-center tw-text-lg tw-mb-8 tw-block tw-text-gray-500"
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
                v-model="form.email" />
              <Password
                class="tw-mb-8"
                placeholder="Password"
                v-model="form.password" />
              <div
                class="tw-flex tw-w-full tw-justify-between md:tw-gap-1 tw-mb-8">
                <div class="tw-flex tw-gap-3 tw-items-center">
                  <Checkbox :binary="true" v-model="form.accept" />
                  <span class="tw-text-base tw-block tw-text-gray-500"
                    >Remember me</span
                  >
                </div>
                <a
                  @click="$globals.to('/recovery')"
                  class="tw-text-base tw-font-medium tw-cursor-pointer"
                  >Forgot password?</a
                >
              </div>
              <Button :loading="authStore.loading" @click="authStore.login(form)" label="Sign in" size="large" class="tw-w-full" />
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
import {useAuthStore} from "@/stores/auth"
import { mapState } from "pinia";
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
  computed: {
    ...mapState(useAuthStore, ['loading'])
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        accept: false,
      },
      authStore: useAuthStore()
    };
  },
};
</script>

<style></style>
