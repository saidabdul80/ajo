<template>
  <form @submit.prevent="handlePasswordChange" v-if="currentStep === 0">
    <h5 class="tw-text-[28px] tw-text-black">Change password</h5>
    <p class="tw-text-[#586283] tw-max-w-[40ch]">Enter your current and new password.</p>
    <div class="tw-space-y-7 tw-pt-4">
      <Password :feedback="false" placeholder="Current password" v-model="form.currentPassword" />
      <Password :feedback="true" placeholder="New password" v-model="form.newPassword" />
      <Password :feedback="false" placeholder="New password again" v-model="form.confirmNewPassword" />
      <Button type="submit" label="Update password" size="medium" class="tw-w-full" />
    </div>
  </form>

  <div v-else>
    <div class="tw-space-y-4 tw-pb-12 tw-text-center">
      <div class="tw-max-w-[300px] tw-mx-auto">
        <img src="/images/protection.svg" alt="icon" class="tw-w-full" />
      </div>
      <h5 class="tw-text-[28px] tw-text-black">Password changed</h5>
      <p class="tw-text-[#586283] tw-max-w-[40ch]">Your password has been successfully changed. You can log in with your new password.</p>
      <div class="tw-pt-7">
        <Button label="Log in" @click="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import Password from "@/components/Password.vue";

export default {
  components: {
    Button,
    Input,
    Password,
  },

  data() {
    return {
      currentStep: 0,
      form: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    };
  },

  methods: {
    handlePasswordChange() {
      this.currentStep = null;
    },

    handleLogin() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>
