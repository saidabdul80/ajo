<template>
    <DefaultLayout heightStyle="tw-h-full">
    <div class="tw-text-lg tw-grid md:tw-grid-cols-2 tw-gap-4">
      <!-- Profile Information -->
      <div class="rounded-lg tw-border tw-flex tw-flex-col md:tw-h-full" >
        <div class="tw-mt-6 tw-relative">
          <Image 
            alt="Profile Picture" 
            width="111" 
            height="111" 
            :key="userStore.user.picture_url || 'default-picture'"
            class="tw-rounded-full tw-w-28 tw-h-28 tw-mx-auto tw-d-block" 
            :src="userStore.user?.picture_url || '/default-avatar.png'" 
          />
          <Button
            :loading="isLoading" 
            size="36" 
            icon="pi pi-pencil"
            @click="triggerFileInput"
             :class="`tw-bg-[black] tw-w-44 tw-text-[white] tw-h-8 tw-font-semibold tw-rounded-md`">
          </Button>
          <input type="file" ref="fileInput" class="tw-hidden" accept="image/*" @change="updateProfilePicture" />
        </div>
        <div class="text-center tw-mt-10">
          <div v-if="isEditMode" class="tw-mb-4 tw-flex tw-justify-center tw-gap-4">
            <Button 
              variant="outlined"
              @click="isEditMode = false" label="Cancel" 
                :class="`tw-w-44 tw-text-[white] tw-h-8 tw-font-semibold tw-rounded-md`"
              >
              
            </Button>
            <Button 
              variant="outlined"
              :loading="isLoading" 
              @click="saveChanges"
               label="  Save Changes" 
                :class="`tw-w-44 tw-text-[white] tw-h-8 tw-font-semibold tw-rounded-md`"
              >
              
            </Button>
           
          </div>
          <div v-else>
            <Menubar :model="items" class="tw-text-sm tw-h-8 tw-self-center" />
          </div>
        </div>
        <hr class="tw-my-4 tw-w-[90%] tw-self-center" />
        <v-card-text>
          <table class="tw-border-separate tw-border-spacing-2 tw-w-full">
            <tbody>
            <!-- Full Name -->
            <tr>
              <td class="tw-pr-2 tw-font-bold tw-text-left tw-w-[30%]">FULL NAME:</td>
              <td>
                <div v-if="isEditMode" class="tw-grid tw-grid-cols-2 tw-gap-2">
                  <PInput class="tw-mb-2" height="38px" v-model="userStore.user.first_name" label="First Name" />
                  <PInput class="tw-mb-2" height="38px" v-model="userStore.user.last_name" label="Last Name" />
                </div>
                <div v-else>
                  {{ `${userStore.user.first_name} ${userStore.user.last_name}` }}
                </div>
              </td>
            </tr>
            <!-- Email -->
            <tr>
              <td class="tw-pr-2 tw-font-bold tw-text-left tw-w-[30%]">EMAIL:</td>
              <td>
                <div v-if="isEditMode">
                  <PInput class="tw-mb-2" height="38px" v-model="userStore.user.email" label="Email" disabled />
                </div>
                <div v-else>{{ userStore.user.email }}</div>
              </td>
            </tr>
            <!-- Phone Number -->
            <tr>
              <td class="tw-pr-2 tw-font-bold tw-text-left tw-w-[30%]">PHONE NUMBER:</td>
              <td>
                <div v-if="isEditMode">
                  <PInput class="tw-mb-2" height="38px" v-model="userStore.user.phone_number" label="Phone Number" />
                </div>
                <div v-else>{{ userStore.user.phone_number }}</div>
              </td>
            </tr>
        </tbody>
          </table>
        </v-card-text>
      </div>
      <!-- Notification Preferences -->
      <div class="rounded-lg tw-border tw-p-4" :class="`tw-bg-[white}]`">
        <p class="tw-text-center tw-font-bold tw-text-lg tw-mb-4">Notification Preferences</p>
        <table class="tw-border-separate tw-border-spacing-2 tw-w-full">
            <tbody>
          <tr v-for="(value, key) in notificationPreferences" :key="key">
            <td class="tw-pr-2 tw-font-bold tw-text-left tw-w-[60%] capitalize">{{ key.replace(/_/g, ' ') }}:</td>
            <td>
              <div v-if="isEditMode">
                <v-switch v-model="userStore.user[key]" />
              </div>
              <div v-else>{{ userStore.user[key] ? 'Enabled' : 'Disabled' }}</div>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>


    <ChangePasswordModal :showUpdatePasswordModal="showUpdatePasswordModal"
      @update:modelValue="showUpdatePasswordModal = $event" />

    <ChangeEmailModal :modelValue="showUpdateEmailModal" @update:modelValue="showUpdateEmailModal = $event"
      :title="'Update Your Email'" :subtitle="'Please enter your new password and verify your email address.'"
      :width="'500px'" :email="userStore.user.email" />
    </DefaultLayout>
  </template>

<script>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Image from '@/components/Image.vue';
import DefaultLayout from "@/components/DefaultLayout.vue";

import PInput from "@/components/Input.vue";
import Menubar from 'primevue/menubar';

import ToggleSwitch from 'primevue/toggleswitch';

import Button from '@/components/Button.vue';

import ChangeEmailModal from '@/components/ChangeEmailModal.vue';
import ChangePasswordModal from '@/components/ChangePasswordModal.vue';

export default {
  components: {
    Image,
    PInput,
    Menubar,
    Button,
    ToggleSwitch,
    ChangeEmailModal,
    ChangePasswordModal,
    DefaultLayout
  },
  data() {
    return {

    };
  },
  computed: {
    notificationPreferences() {
      const userStore = this.userStore;
      return {
        notify_security_alerts: userStore.user.notify_security_alerts,
        notify_ajo_alerts: userStore.user.notify_ajo_alerts,
        notify_product_announcements: userStore.user.notify_product_announcements,
        notify_support_tickets: userStore.user.notify_support_tickets,
      };
    },
  },
  setup() {
    const userStore = useUserStore();


        const user = ref(userStore.user);

        const fileInput = ref(null);
        const profileUploadIsLoading = ref(false);
        const isLoading = ref(false);
        const isEditMode = ref(false);
        const showUpdateEmailModal = ref(false);
        const showUpdatePasswordModal = ref(false); // Edit mode state
        const items = ref([{
        id: 'EditProfile',
        label: computed(() => (isEditMode.value ? 'Cancel' : 'Edit Profile')),
        icon: computed(() => (isEditMode.value ? 'ph-x' : 'ph-pencil')),


        command: () => {
            isEditMode.value = !isEditMode.value
        }
        },
        {
        id: 'ChangePassword',
        label: 'Change Password',
        icon: 'ph-lock-key',
        command: () => {
            showUpdatePasswordModal.value = !showUpdatePasswordModal.value
        }

        },
        {
        id: 'UpdateEmail',
        label: 'Update Email',
        icon: 'ph-envelope',
        command: () => {
            showUpdateEmailModal.value = !showUpdateEmailModal.value
        }
        }]);

        // Methods
        const toggleEditMode = () => {
        if (isEditMode.value) {
            saveChanges();
        }
        };
        function triggerFileInput() {
        fileInput.value.click();
        }

    return {
      userStore,
      items,
      isEditMode,
      toggleEditMode,
      showUpdateEmailModal,
      showUpdatePasswordModal,
      profileUploadIsLoading,
      isLoading,
      fileInput,
      triggerFileInput
    };
  },
  methods: {
    async saveChanges() {
      this.isLoading = true;
      try {
        await this.userStore.updateUser(this.userStore.user);
        this.isEditMode = false;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
