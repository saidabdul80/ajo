<template>
  <Dialog :modelValue="modelValue" :loading="loading":title="title" :width="width" :subtitle="subtitle" button-height="38px"
    @button:click="changeEmail" btnTitle="Update" @update:modelValue="updateModal">
    <template #body>
      <v-form @submit.prevent="changeEmail" class="tw-w-full tw-mb-2">
        <p class=" tw-text-lg tw-font-semibold tw-mb-6">{{ email }}</p>

        <PInput v-model="emailInput" :errorMessages="globals.nameRules?.email" label="New Email Address" type="email"
        class="tw-w-full tw-h-10 tw-mb-10" id="emailAddress" name="email" />
        <PasswordField label="Enter Password" class="tw-w-full tw-mb-3" :height="passwordHeight"
        v-model="password" />
       
      </v-form>
    </template>
  </Dialog>
</template>
 
<script>
import PasswordField from '@/components/PasswordField.vue';
import Dialog from 'primevue/dialog';
import PInput from './Input.vue';
import { useClient } from '@/stores/client';
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from '@/stores/globals';

export default {
  components: {
    PasswordField,
    Dialog,
    PInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Update Email',
    },
    subtitle: {
      type: String,
      default: 'Enter new password and verify.',
    },
    width: {
      type: String,
      default: '490px',
    },
    email: {
      type: String,
      required: true,
    },
    errorMessages: {
      type: [String, Array],
      default: () => [],
    },

    passwordHeight: {
      type: String,
      default: '38px',
    },
  },
  data() {
    return {
      password: '',
      globals: useGlobalsStore(),
      emailInput: this.email,  // Initialize with the passed email prop
      loading: false,  // Initialize with the passed email prop
    };
  },
  methods: {

    updateModal(value) {
      // Emit the update event for v-model to work properly
      this.$emit('update:modelValue', value);
    },

    async changeEmail() {

      const data = { password: this.password, email: this.emailInput }
      this.loading = true
      const response = await useClient().http({ method: 'post', path: window.prefix + '/change-email', data: data })
      this.loading = false
      if (response) {
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: 'success',
          message: 'Check Email or SMS for verification.',
        })
      }
    }
  },
  watch: {
    email(newEmail) {
      // Keep local emailInput in sync with the prop email if it changes externally
      this.emailInput = newEmail;
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
