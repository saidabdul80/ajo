<template>
  <DefaultLayout HeaderTitle="Account settings" HeaderDescription="Settings and options for your account" heightStyle="tw-h-full">
    <Tabs value="0" class="tw-h-full" scrollable>
      <TabList>
        <Tab value="0">Account details</Tab>
        <Tab value="1">Withdrawal account</Tab>
        <Tab value="2">Notifications</Tab>
      </TabList>
      <TabPanels class="tw-h-full !tw-pt-8">
        <TabPanel value="0">
          <form @submit.prevent="">
            <div class="tw-flex tw-flex-col xl:tw-max-w-[70%] md:tw-grid tw-grid-cols-2 tw-gap-6 lg:tw-gap-20">
              <div class="tw-space-y-6">
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="fName" class="tw-text-sm tw-text-[#586283]">First name</label>
                  <Input id="fName" aria-describedby="fName-help" v-model="user.first_name" />
                </div>

                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="mail" class="tw-text-sm tw-text-[#586283]">Email Address</label>
                  <Input id="mail" aria-describedby="mail-help" :disabled="true" v-model="user.email" />
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2 tw-relative">
                  <label for="password" class="tw-text-sm tw-text-[#586283]">Password</label>
                  <Input id="password" aria-describedby="password-help" :disabled="true" class="!tw-bg-transparent !tw-pr-[80px]" type="password" v-model="user.password" />

                  <button class="tw-absolute tw-top-[55%] tw-right-4 tw-text-sm" @click="changePasswordDialog">Change</button>
                </div>
              </div>
              <div class="tw-space-y-6">
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="lName" class="tw-text-sm tw-text-[#586283]">Last name</label>
                  <Input id="lName" aria-describedby="lName-help" v-model="user.last_name" />
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="phone" class="tw-text-sm tw-text-[#586283]">Phone Number</label>
                  <Input id="phone" aria-describedby="fName-help" v-model="user.phone_number" />
                </div>
              </div>
            </div>
            <div class="tw-mt-6">
              <Button label="Update details" :isFullWidth="false" type="submit" />
            </div>
          </form>
        </TabPanel>
        <TabPanel value="1">
          <form @submit.prevent="handleUpdateBankDetails">
            <div class="tw-flex tw-flex-col xl:tw-max-w-[70%] lg:tw-grid tw-grid-cols-2 tw-gap-6 lg:tw-gap-20">
              <div class="tw-space-y-6">
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="acctNumber" class="tw-text-sm tw-text-[#586283]">Account number</label>
                  <Input v-model="form.acctNumber" id="acctNumber" aria-describedby="acctNumber-help" />
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="bankName" class="tw-text-sm tw-text-[#586283]">Bank name</label>
                  <Select id="bankName" v-model="form.selectedBank" :options="bankName" placeholder="Select Bank" class="tw-w-full !tw-py-3 !tw-h-[48px] !tw-rounded-2xl tw-font-light" />
                </div>
                <div class="tw-flex tw-flex-col tw-gap-2">
                  <label for="acctNmae" class="tw-text-sm tw-text-[#586283]">Account name</label>
                  <Input v-model="form.acctName" id="acctNmae" aria-describedby="acctNmae-help" class="!tw-bg-transparent" />
                </div>
              </div>
            </div>
            <div class="tw-mt-6">
              <Button label="Update bank details" :isFullWidth="false" type="submit" :disabled="!validateForm() || ajoStore.loading" :loading="ajoStore.loading" />
            </div>
          </form>
        </TabPanel>
        <TabPanel value="2">
          <div class="tw-space-y-6">
            <div v-for="(alert, index) in alerts" :key="index" class="tw-space-y-1">
              <h5 class="tw-text-base tw-text-[#000] tw-font-semibold">
                {{ alert.title }}
              </h5>
              <div class="tw-flex tw-justify-between tw-items-center">
                <p>{{ alert.description }}</p>
                <ToggleSwitch v-model="alert.model" :onchange="() => handleModelChange(alert)" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </DefaultLayout>
</template>

<script>
import { ref, computed } from "vue";
import eventBus from "@/eventBus";
import { useAuthStore } from "@/stores/auth.js";
import { useAjoStore } from "@/stores/ajo.js";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Input from "@/components/Input.vue";
import ChangePasswordDialog from "@/components/Dialog/ChangePasswordDialog.vue";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";

export default {
  components: {
    DefaultLayout,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Input,
    ChangePasswordDialog,
    Select,
    ToggleSwitch,
  },

  setup() {
    const authStore = useAuthStore();
    const ajoStore = useAjoStore();
    const user = computed(() => authStore.user);
    const form = ref({
      selectedBank: user.value.bank_name || null,
      acctName: user.value.account_name || null,
      acctNumber: user.value.account_number || null,
    });
    const bankName = ["First Bank", "GTBank"];
    const alerts = ref([
      {
        title: "Security alerts",
        description: "Get notified about important security alerts, such as password resets.",
        model: user.value.notify_security_alerts,
      },
      {
        title: "Ajo alerts",
        description: "Get notified about all Ajo group invitations and swap requests.",
        model: user.value.notify_ajo_alerts,
      },
      {
        title: "Product announcements",
        description: "Get notified about new features on Cowris, including mobile app launch and features.",
        model: user.value.notify_product_announcements,
      },
      {
        title: "Support tickets",
        description: "Get notified about support responses and enquiries replies.",
        model: user.value.notify_support_tickets,
      },
    ]);

    const changePasswordDialog = () => {
      eventBus.emit("open-dialog", {
        default: ChangePasswordDialog,
        position: "right",
      });
    };

    const validateForm = () => {
      const { selectedBank, acctName, acctNumber } = form.value;
      if (!selectedBank || !acctName || !acctNumber) {
        return false;
      }
      return true;
    };

    const handleUpdateBankDetails = async () => {
      if (validateForm()) {
        const data = {
          account_number: form.value.acctNumber,
          bank_name: form.value.selectedBank,
          account_name: form.value.acctName,
        };
        await ajoStore.updateBankDetails(user.value.id, data);
      }
    };

    const handleModelChange = async (value) => {
      const title = value.title;

      switch (title) {
        case "Security alerts":
          await ajoStore.updateNotificationSetting(user.value.id, { notify_security_alerts: value.model });
          break;
        case "Ajo alerts":
          await ajoStore.updateNotificationSetting(user.value.id, { notify_ajo_alerts: value.model });
          break;
        case "Product announcements":
          await ajoStore.updateNotificationSetting(user.value.id, { notify_product_announcements: value.model });
          break;
        case "Support tickets":
          await ajoStore.updateNotificationSetting(user.value.id, { notify_support_tickets: value.model });
          break;
        default:
          break;
      }
    };

    return {
      ajoStore,
      user,
      form,
      bankName,
      alerts,
      changePasswordDialog,
      handleUpdateBankDetails,
      validateForm,
      handleModelChange,
    };
  },
};
</script>

<style>
.p-tablist-content {
  overflow: hidden;
  border-radius: 5px 5px 0 0 !important;
}

.p-tablist-tab-list {
  gap: 40px !important;
}

.p-tab {
  font-size: 16px;
  font-weight: 500 !important;
}

.p-tablist {
  border-bottom: 1px solid #dbdee2cc !important;
}
</style>
