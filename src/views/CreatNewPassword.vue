<template>
  <div class="tw-h-full tw-w-full" color="light">
    <template1>
      <template #content>
        <ion-content color="white">
          <div class="tw-flex tw-flex-col tw-w-full tw-items-center md:tw-justify-center tw-h-full tw-pt-20 md:tw-py-0">
            <div class="lg:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%]">
              <H1 class="md:tw-text-left tw-text-center" text="Create new password" />
              <p class="tw-pt-2 tw-pb-5 tw-text-center md:tw-text-left tw-text-lg tw-text-[#586283] tw-font-normal">Set your new password below.</p>
              <div class="tw-space-y-5 tw-mb-8">
                <Input placeholder="Your 6-digit code" v-model="form.otpCode" />
                <Password placeholder="Password" v-model="form.password" :feedback="false" />
                <Password placeholder="Confirm password" v-model="form.password_confirmation" />
              </div>

              <Button @click="setPassword" :loading="isLoading" label="Set password" size="large" class="tw-w-full" :disabled="isLoading" />
            </div>
          </div>
        </ion-content>
      </template>
    </template1>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { IonContent } from "@ionic/vue";
import { useGlobalsStore } from "@/stores/globals";
import Template1 from "@/components/Template1.vue";
import Input from "@/components/Input.vue";
import Password from "@/components/Password.vue";
import H1 from "@/components/H1.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    IonContent,
    Template1,
    Input,
    Password,
    H1,
    Button,
  },
  setup() {
    const router = useRouter();
    const globals = useGlobalsStore();
    const isLoading = ref(false);
    const form = ref({
      username: router.currentRoute.value.params.email || null,
      otpCode: "",
      password: "",
      password_confirmation: "",
    });

    onMounted(() => {
      if (!router.currentRoute.value.params?.email) {
        router.push("/join");
      }
    });

    const setPassword = async () => {
      try {
        isLoading.value = true;
        const response = await globals.setPassword(form.value);
        if (response) {
          router.push("/passwordset");
        }
      } catch (error) {
        isLoading.value = false;
      } finally {
        isLoading.value = false;
      }
    };

    return { form, setPassword, isLoading };
  },
};
</script>
