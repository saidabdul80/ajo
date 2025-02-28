<template>
  <DefaultLayout :HeaderTitle="id ? 'Update Ajo' : 'Start New Ajo'" HeaderDescription="Experience the power of group savings.">
    <div class="tw-basis-full">
      <div v-if="preloader" class="tw-flex tw-flex-col tw-gap-6 tw-p-6">
        <!-- Details Skeleton -->
        <div class="tw-bg-white tw-p-6 tw-border tw-border-gray-300 tw-rounded-md tw-space-y-6">
          <div class="tw-space-y-4">
            <Skeleton height="1.5rem" width="40%" />
            <Skeleton height="2rem" width="100%" />
            <Skeleton height="2rem" width="70%" />
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-6">
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-6">
            <Skeleton height="4rem" width="100%" />
            <Skeleton height="4rem" width="100%" />
          </div>
        </div>

        <!-- Participants Skeleton -->
        <div class="tw-bg-white tw-p-6 tw-border tw-border-gray-300 tw-rounded-md">
          <div class="tw-mb-4">
            <Skeleton height="1.5rem" width="25%" />
          </div>
          <div class="tw-space-y-4">
            <Skeleton v-for="i in 3" :key="i" height="4rem" width="100%" />
          </div>
        </div>
      </div>

      <div v-else>
        <div class="tw-pb-3 tw-max-w-20">
          <Button label="Back" :outlined="true" size="small" @click="previousStep" icon="pi pi-angle-left" />
        </div>

        <div class="tw-flex tw-flex-col-reverse tw-justify-end xl:tw-grid xl:tw-grid-cols-6 tw-gap-8 tw-basis-full tw-h-full">
          <div class="xl:tw-col-span-4 tw-flex tw-flex-col xl:tw-h-full">
            <form class="tw-bg-white tw-h-full tw-p-6 tw-flex tw-flex-col">
              <h2 class="tw-text-[22px] tw-text-black">
                Step {{ currentStep }}:
                {{ currentStepTitle[currentStep]["name"] }}
              </h2>
              <p v-if="currentStepTitle[currentStep]['subTitle']" class="tw-text-[#333333] tw-pt-1">
                {{ currentStepTitle[currentStep]["subTitle"] }}
              </p>

              <div v-if="currentStep === 1">
                <div class="tw-space-y-8 tw-pt-8">
                  <Input placeholder="Group Name" size="medium" v-model="intialValues.name" :errorMessage="globalStore.nameRules.name" />

                  <Select
                    v-model="intialValues.category"
                    :options="categories"
                    :errorMessage="globalStore.nameRules.category"
                    placeholder="Select a Category"
                    class="tw-w-full tw-h-[48px] !tw-rounded-2xl tw-font-light" />

                  <Input placeholder="Goal of Contribution / Description" size="medium" v-model="intialValues.description" :errorMessage="globalStore.nameRules.description" />

                  <div class="tw-relative">
                    <img class="tw-inline-block tw-absolute tw-z-40 tw-w-3 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3" :src="`/images/${getCurrencyName}.svg`" alt="currency-icon" />

                    <InputNumber v-model="intialValues.amount" placeholder="Contribution Per Person" inputId="minmaxfraction" fluid />
                  </div>
                  <Select
                    v-model="selectedFrequency"
                    :options="frequencyOptions"
                    optionLabel="name"
                    :option-value="null"
                    @change="onFrequencyChange"
                    :errorMessage="globalStore.nameRules.frequency"
                    placeholder="Select Contribution Frequency"
                    class="tw-w-full tw-h-[48px] !tw-rounded-2xl tw-font-light" />

                  <PDate @change="onAjoDateChange" :view="dateView" width="100%" :endDate="new Date(intialValues.end_date)" :startDate="new Date(intialValues.start_date)" />
                </div>
              </div>

              <div v-if="currentStep === 2">
                <div class="tw-space-y-8 tw-pt-8">
                  <div class="tw-relative">
                    <Input placeholder="Enter email address of participant" v-model="newEmail" @keydown.enter.prevent="addEmail" class="!tw-pr-28" />
                    <div class="tw-inline-block tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-right-2">
                      <Button label="Add email" size="small" @click.stop="addEmail" :is-full-width="false" :disabled="!isValidEmail(newEmail)" />
                    </div>
                  </div>

                  <div v-if="participantsEmail.length > 0">
                    <ul class="tw-list-disc" @drop="onDrop($event)">
                      <li v-for="(email, index) in participantsEmail" :key="index" class="tw-flex tw-justify-between" :class="index == 0 && 'tw-mb-2'">
                        <div class="tw-inline-flex tw-items-center tw-gap-3">
                          <span class="tw-flex tw-justify-center tw-items-center leading-none tw-w-8 tw-h-8 tw-rounded-full tw-text-white tw-text-xl tw-bg-[#36454F]">{{ index + 1 }}</span>
                          <span class="tw-text-lg">{{ email }}</span>
                        </div>
                        <Button v-if="index != 0" label="Remove" @click="removeEmail(email)" class="!tw-text-[#D80027]" icon="pi pi-times" iconPos="right" :is-full-width="false" color="link" />
                      </li>
                    </ul>

                    <!-- <div class="tw-inline-flex tw-gap-3 tw-bg-[#FFF7E9] tw-p-5 tw-rounded-lg tw-border tw-border-[#E0C9A5] tw-mt-5">
                      <i class="pi pi-exclamation-circle tw-text-[#F0B149]"></i>
                      <div class="tw-text-sm">
                        <p class="tw-text-black tw-font-semibold tw-leading-none tw-pb-2">Withdrawal slot is as numbered - You can drag to adjust.</p>
                        <p class="tw-text-[#333333]">
                          Participants will be be able to withdraw their contribution in the order of number assigned above. You can adjust the order by dragging the numbers to fit what you want.
                        </p>
                      </div>
                    </div> -->

                    <div class="tw-inline-flex tw-items-center tw-gap-8 tw-pt-8">
                      <p class="tw-text-lg tw-text-[#333333] tw-font-medium">Do you want to make this Ajo group public?</p>
                      <div class="tw-flex tw-items-center tw-gap-3">
                        <RadioButton v-model="intialValues.is_public" inputId="ajoState1" name="false" :value="false" />
                        <label for="ajoState1" class="ml-2">No</label>
                        <RadioButton v-model="intialValues.is_public" inputId="ajoState2" name="true" :value="true" />
                        <label for="ajoState2" class="ml-2">Yes</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 3">
                <div class="tw-space-y-8 tw-pt-8">
                  <Input size="medium" placeholder="Search for rule" icon="pi pi-search" v-model="searchString" @input="searchRules" />

                  <div v-if="filteredRules.length > 0" class="tw-space-y-6">
                    <p v-for="(rule, index) in filteredRules" :key="index" class="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500">
                      <Checkbox v-model="intialValues.ajo_rules" :value="rule.value" :inputId="rule.name" />
                      <label :for="rule.name" class="ml-2 tw-text-base tw-text-black">
                        {{ rule.label }}
                      </label>
                    </p>
                  </div>
                </div>
              </div>
              <div class="tw-pt-8">
                <Button v-if="id" :loading="loading" label="Update" @click="updateData" class="tw-w-full tw-mt-auto" :disabled="!isFormValid || loading" />
                <Button v-else :loading="loading" label="Continue" @click="nextStep" class="tw-w-full tw-mt-auto" :disabled="!isFormValid" />
              </div>
            </form>
          </div>
          <div class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
            <AccountSetup title="Follow these 3 simple steps." description="Cowris will make the Ajo creation experience smooth and easy for you." :steps="steps" />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useAjoStore } from "@/stores/ajo.js";
import { useGlobalsStore } from "@/stores/globals.js";
import eventBus from "@/eventBus";

import DefaultLayout from "@/components/DefaultLayout.vue";
import AjoGroupList from "@/components/AjoGroupList.vue";
import Input from "@/components/Input.vue";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Button from "@/components/Button.vue";
import AccountSetup from "@/components/AccountSetup.vue";
import Checkbox from "@/components/Checkbox.vue";
import PDate from "@/components/PDate.vue";
import AjoGroupDialog from "@/components/Dialog/AjoGroupDialog.vue";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Skeleton from "primevue/skeleton";

export default {
  name: "StartAjo",
  components: {
    DefaultLayout,
    AjoGroupList,
    Input,
    Select,
    DatePicker,
    Button,
    AccountSetup,
    Checkbox,
    PDate,
    RadioButton,
    InputNumber,
    Skeleton,
  },

  setup() {
    const userStore = useUserStore();
    const ajoStore = useAjoStore();
    const globalStore = useGlobalsStore();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;

    const currentStep = ref(1);
    const newEmail = ref("");
    const loading = ref(false);
    const preloader = ref(id ? true : false);
    const searchString = ref("");
    const draggedItem = ref(null);
    const draggedIndex = ref(null);
    const minDate = ref(new Date());
    const selectedFrequency = ref(null);
    const dateView = ref("date");

    const user = computed(() => userStore.user);

    const currencySymbol = [
      { code: "NGN", name: "naira" },
      { code: "CAD", name: "dollar" },
    ];

    const intialValues = reactive({
      name: "",
      category: "",
      description: "",
      amount: null,
      frequency: "",
      start_date: "",
      end_date: "",
      ajo_rules: [],
      is_public: false,
      rules: [],
    });

    const categories = ["Personal savings", "Education", "Housing", "Business", "Health", "Trips or vacations", "Event", "Charity", "Investment", "Emergency fund"];

    const contributionFrequencies = ref(null);

    const steps = reactive([
      { text: "Fill in basic details", isCompleted: id ? true : false },
      { text: "Manage participants", isCompleted: id ? true : false },
      { text: "Set rules", isCompleted: id ? true : false },
    ]);

    const currentStepTitle = {
      1: { name: "Fill in Basic Details" },
      2: {
        name: "Manage participants",
        subTitle: "Invitation to join your Ajo group will be sent to the email addresses you add.",
      },
      3: {
        name: "Set rules",
        subTitle: "You can search and select from the rules below.",
      },
    };

    const otherParticipants = ref([]);
    const currentParticipants = ref([]);

    const participantsEmail = computed(() => {
      const allEmails = [user.value.email, ...otherParticipants.value, ...currentParticipants.value.map((item) => item.email)];
      return [...new Set(allEmails)];
    });

    const isFormValid = computed(() => {
      if (currentStep.value === 1) {
        return intialValues.name && intialValues.category && intialValues.description && intialValues.amount && intialValues.frequency && intialValues.start_date && intialValues.end_date;
      }
      if (currentStep.value === 2) {
        return participantsEmail.value.length > 0;
      }
      return intialValues.ajo_rules.length > 0;
    });

    const frequencyOptions = computed(() => {
      return contributionFrequencies.value ? Object.values(contributionFrequencies.value) : [];
    });

    const filteredRules = ref([]);

    const validateDate = (date) => {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);
      const timeDifference = endDate - startDate;
      const totalDays = timeDifference / (1000 * 3600 * 24);
      return totalDays % dateView.value === 0;
    };

    const onAjoDateChange = (date) => {
      validateDate(date);
      intialValues.start_date = date[0];
      intialValues.end_date = date[1];
    };

    const onFrequencyChange = () => {
      intialValues.frequency = Number(selectedFrequency.value?.value);
      switch (selectedFrequency.value?.name) {
        case "YEARLY":
          dateView.value = "year";
          break;
        case "MONTHLY":
          dateView.value = "month";
          break;
        case "WEEKLY":
        case "DAILY":
        default:
          dateView.value = "date";
          break;
      }
    };

    const addEmail = () => {
      const emailToAdd = newEmail.value.trim().toLowerCase();

      if (isValidEmail(emailToAdd) && !participantsEmail.value.includes(emailToAdd) && emailToAdd !== user.value.email) {
        otherParticipants.value.push(emailToAdd);
        newEmail.value = "";
      }
    };

    const removeEmail = async (email) => {
      if (email === user.value.email) return;

      otherParticipants.value = otherParticipants.value.filter((item) => (typeof item === "string" ? item.toLowerCase() : item.email.toLowerCase()) !== email.toLowerCase());

      if (id) {
        const emailDetails = currentParticipants.value.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (emailDetails) {
          await ajoStore.addDeleteParticipant(emailDetails.id);
        }
      }
      currentParticipants.value = currentParticipants.value.filter((item) => item.email.toLowerCase() !== email.toLowerCase());
    };

    const isValidEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const nextStep = async () => {
      if (isFormValid.value && currentStep.value <= 2) {
        steps[currentStep.value - 1].isCompleted = true;
        currentStep.value += 1;
      }

      if (currentStep.value === 3 && isFormValid.value) {
        steps[currentStep.value - 1].isCompleted = true;
        try {
          intialValues.members = participantsEmail.value;
          loading.value = true;
          const res = await ajoStore.createAjo(intialValues);
          loading.value = false;
          if (res) {
            openDialog();
          }
        } catch (error) {
          console.error("Error creating Ajo group:", error);
        }
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        steps[currentStep.value - 2].isCompleted = false;
        currentStep.value -= 1;
      }
    };

    const openDialog = () => {
      eventBus.emit("open-dialog", {
        default: AjoGroupDialog,
        title: "All done!",
        position: "center",
        props: { title: intialValues.name },
      });
    };

    const searchRules = () => {
      const lowerSearch = searchString.value.toLowerCase();
      filteredRules.value = intialValues.rules.filter((rule) => rule.label.toLowerCase().startsWith(lowerSearch));
    };

    const getCurrencyName = computed(() => {
      const currency = currencySymbol.find((item) => item.code === user.value.my_wallet.currency);
      return currency ? currency.name : "Unknown currency";
    });

    const fetchAjoDetails = async () => {
      const ajo = await ajoStore.fetchAjoById(id);

      const { name, category, description, amount, frequency, frequency_name, start_date, end_date, ajo_members, is_public } = ajo;
      intialValues.name = name;
      intialValues.category = category ? category : categories[0];
      intialValues.description = description;
      intialValues.amount = parseInt(amount);
      selectedFrequency.value = contributionFrequencies.value[frequency_name];
      intialValues.start_date = start_date;
      intialValues.end_date = end_date;
      intialValues.frequency = frequency;
      intialValues.is_public = is_public ? true : false;
      ajo_members.forEach((member) => {
        if (member.email != user.value.email) {
          currentParticipants.value.push({ email: member.email, id: member.id });
        }
      });
    };

    const updateData = async () => {
      if (isFormValid.value && currentStep.value <= 3) {
        try {
          loading.value = true;

          // First update the Ajo
          const ajoUpdateRes = await ajoStore.updateAjo(id, intialValues);
          if (!ajoUpdateRes) {
            throw new Error("Failed to update Ajo");
          }

          // Then add participants if they exist
          if (otherParticipants.value.length > 0) {
            const participantsRes = await ajoStore.addAjoParticipants({
              ajo_id: id,
              members: [...otherParticipants.value],
            });
            if (participantsRes) {
              otherParticipants.value = [];
            } else {
              throw new Error("Failed to add participants");
            }
          }

          // Only if both operations above succeeded, update the steps
          if (currentStep.value < 3) {
            steps[currentStep.value - 1].isCompleted = true;
            currentStep.value += 1;
          } else {
            router.push("/app/contributions");
          }

          loading.value = false;
        } catch (error) {
          console.error("Error updating Ajo group:", error);
          loading.value = false;
        }
      }
    };

    onMounted(async () => {
      intialValues.rules = await ajoStore.fetchAjoRules();
      filteredRules.value = intialValues.rules;

      contributionFrequencies.value = await ajoStore.fetchAjoFrequencies();

      if (id) {
        preloader.value = true;
        try {
          await fetchAjoDetails();
        } catch (err) {
          preloader.value = false;
          router.push("/app/contributions");
        } finally {
          preloader.value = false;
        }
      }
    });

    return {
      id,
      user,
      ajoStore,
      globalStore,
      currentStep,
      newEmail,
      loading,
      preloader,
      searchString,
      draggedItem,
      draggedIndex,
      minDate,
      selectedFrequency,
      dateView,
      intialValues,
      categories,
      contributionFrequencies,
      steps,
      otherParticipants,
      participantsEmail,
      isFormValid,
      frequencyOptions,
      filteredRules,
      validateDate,
      onAjoDateChange,
      onFrequencyChange,
      addEmail,
      removeEmail,
      isValidEmail,
      nextStep,
      openDialog,
      searchRules,
      getCurrencyName,
      previousStep,
      updateData,
      currentStepTitle,
    };
  },
};
</script>

<style></style>
