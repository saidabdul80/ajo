<template>
  <div class="tw-h-full tw-w-full" color="light">
    <Template1>
      <template #content>
        <ion-content color="white">
          <div class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1 class="md:tw-text-left tw-text-center" text="Recover account" />
              <p class="tw-pt-4 tw-pb-12 tw-text-center md:tw-text-left tw-text-lg tw-text-[#586283] tw-font-normal">
                Please, enter your email address used for registration. A code will be sent to verify you own the account.
              </p>
              <Input class="tw-mb-8" placeholder="Email Address" v-model="email" />
              <Button @click="goToVerify" label="Continue" size="large" class="tw-w-full" :disabled="isLoading" :loading="isLoading" />
            </div>
          </div>
        </ion-content>
      </template>
    </Template1>
  </div>
</template>

<script>
import { ref } from "vue";
import { IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { useGlobalsStore } from "@/stores/globals";
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

  setup() {
    const router = useRouter();
    const globals = useGlobalsStore();
    const email = ref(null);
    const isLoading = ref(false);

    const goToVerify = async () => {
      try {
        isLoading.value = true;
        const response = await globals.resetPassword(email.value);

        if (response) {
          router.push(`/newpassword/${email.value}`);
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      email,
      goToVerify,
    };
  },
};
</script>

<style></style>
