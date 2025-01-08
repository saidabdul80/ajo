<template>
  <Dialog :modelValue="showUpdatePasswordModal" :btnTitle="btnTitle" :title="title" :loading="loading"
    :subtitle="subtitle" :width="width" :buttonHeight="buttonHeight" @update:modelValue="updateModal"
    @button:click="savePassword">
    <template #body>
      <v-form @submit.prevent="savePassword">
        <PasswordField label="Old Password" class="tw-w-full tw-mb-3" :height="passwordHeight"
          :error_messages="errors.old_password" v-model="formData.old_password" />
        <PasswordField label="New Password" class="tw-w-full tw-mb-3" :height="passwordHeight"
          :error_messages="errors.password" v-model="formData.password" />
        <PasswordField label="Confirm New Password" class="tw-w-full tw-mb-3" :height="passwordHeight"
          :rules="errors.password_confirmation" :error_messages="errors.password_confirmation"
          v-model="formData.password_confirmation" />
      </v-form>
    </template>
  </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import PasswordField from '@/components/PasswordField.vue';
import { useClient } from '@/stores/client';
import { useNotificationStore } from '@/stores/notification';

export default {
  components: {
    Dialog,
    PasswordField,
  },
  props: {
    showUpdatePasswordModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Change Password',
    },
    subtitle: {
      type: String,
      default: 'Enter new password and verify.',
    },
    btnTitle: {
      type: String,
      default: 'Save Password',
    },
    width: {
      type: String,
      default: '490px',
    },
    buttonHeight: {
      type: String,
      default: '38px',
    },
    passwordHeight: {
      type: String,
      default: '38px',
    },
  },
  emits: ['update:modelValue', 'password:change'],
  data() {
    return {
      loading: false,
      formData: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
      errors: {
        old_password: [],
        password: [],
        password_confirmation: [],
      },
    };
  },
  methods: {
    updateModal(value) {
      this.$emit('update:modelValue', value);
    },
    async savePassword() {
      // Add validation logic here
      if (!this.validatePasswords()) {
        return;
      }

      // Emit an event to notify the parent component about the password change
      this.$emit('password:change', this.formData);

      this.loading = true
      const response = await useClient().http({ method: 'post', path: window.prefix + '/change-password', data: this.formData })
      this.loading = false
      if (response) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'success',
          message: 'Check Email or SMS for verification.',
        })
        this.updateModal(false);

      }
     
    },

    validatePasswords() {
      let valid = true;

      // Reset errors
      this.errors.old_password = [];
      this.errors.password = [];
      this.errors.password_confirmation = [];

      if (!this.formData.old_password) {
        this.errors.old_password.push('Old password is required.');
        valid = false;
      }
      if (!this.formData.password) {
        this.errors.password.push('New password is required.');
        valid = false;
      }
      if (this.formData.password !== this.formData.password_confirmation) {
        this.errors.password_confirmation.push('Passwords do not match.');
        valid = false;
      }

      return valid;
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>