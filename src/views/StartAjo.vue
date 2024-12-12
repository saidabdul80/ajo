<template>
  <DefaultLayout HeaderTitle="Start New Ajo" HeaderDescription="Experience the power of group savings.">
    <div class="tw-basis-full">
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
                  <img class="tw-inline-block tw-absolute tw-z-40 tw-w-3 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3" src="/images/naira.svg" alt="currency-icon" />

                  <InputNumber v-model="intialValues.amount" placeholder="Contribution Per Person" inputId="integeronly" fluid />
                </div>
                <Select
                  v-model="frequency"
                  :options="frequencyOptions"
                  optionLabel="name"
                  :option-value="null"
                  @change="onFrequencyChange"
                  :errorMessage="globalStore.nameRules.frequency"
                  placeholder="Select Contribution Frequency"
                  class="tw-w-full tw-h-[48px] !tw-rounded-2xl tw-font-light" />

                <PDate @change="onAjoDateChange" :view="dateView" width="100%" />
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

                <div v-if="participantsEmail.length > 1">
                  <ul class="tw-list-disc" @drop="onDrop($event)">
                    <li
                      v-for="(email, index) in participantsEmail"
                      :key="index"
                      class="tw-flex tw-justify-between"
                      :class="index == 0 && 'tw-mb-2'"
                      draggable="true"
                      @dragstart="onDrag(email, index)"
                      @drop="onDrop(index)"
                      @dragover.prevent>
                      <div class="tw-inline-flex tw-items-center tw-gap-3">
                        <span class="tw-flex tw-justify-center tw-items-center leading-none tw-w-8 tw-h-8 tw-rounded-full tw-text-white tw-text-xl tw-bg-[#36454F]">{{ index + 1 }}</span>
                        <span class="tw-text-lg">{{ email }}</span>
                      </div>
                      <Button v-if="index != 0" label="Remove" @click="removeEmail(email)" class="!tw-text-[#D80027]" icon="pi pi-times" iconPos="right" :is-full-width="false" color="link" />
                    </li>
                  </ul>

                  <div class="tw-inline-flex tw-gap-3 tw-bg-[#FFF7E9] tw-p-5 tw-rounded-lg tw-border tw-border-[#E0C9A5] tw-mt-5">
                    <i class="pi pi-exclamation-circle tw-text-[#F0B149]"></i>
                    <div class="tw-text-sm">
                      <p class="tw-text-black tw-font-semibold tw-leading-none tw-pb-2">Withdrawal slot is as numbered - You can drag to adjust.</p>
                      <p class="tw-text-[#333333]">
                        Participants will be be able to withdraw their contribution in the order of number assigned above. You can adjust the order by dragging the numbers to fit what you want.
                      </p>
                    </div>
                  </div>

                  <div class="tw-inline-flex tw-items-center tw-gap-8 tw-pt-8">
                    <p class="tw-text-lg tw-text-[#333333] tw-font-medium">Do you want to make this Ajo group public?</p>
                    <div class="tw-flex tw-items-center tw-gap-3">
                      <RadioButton v-model="intialValues.is_public" inputId="ajoState1" name="No" value="No" />
                      <label for="ajoState1" class="ml-2">No</label>
                      <RadioButton v-model="intialValues.is_public" inputId="ajoState2" name="No" value="Yes" />
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
              <Button label="Continue" @click="nextStep" class="tw-w-full tw-mt-auto" :disabled="!isFormValid || ajoStore.loading" :loading="ajoStore.loading" />
            </div>
          </form>
        </div>
        <div class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
          <AccountSetup title="Follow these 3 simple steps." description="Cowris will make the Ajo creation experience smooth and easy for you." :steps="steps" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
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
  },

  setup() {
    const userStore = useUserStore();
    const ajoStore = useAjoStore();
    const globalStore = useGlobalsStore();

    const currentStep = ref(1);
    const newEmail = ref("");
    const searchString = ref("");
    const filteredRules = ref([]);
    const draggedItem = ref(null);
    const draggedIndex = ref(null);
    const minDate = ref(new Date());
    const frequency = ref(null);
    let rules = [];

    const intialValues = reactive({
      ajo_rules: [],
      is_public: false,
      name: "",
      category: "",
      description: "",
      amount: null,
      frequency: null,
      start_date: null,
      end_date: null,
    });

    const categories = ["Personal savings", "Education", "Housing", "Business", "Health", "Trips or vacations", "Event", "Charity", "Investment", "Emergency fund"];

    const contributionFrequencies = ref(null);

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

    const steps = reactive([
      { text: "Fill in basic details", isCompleted: false },
      { text: "Manage participants", isCompleted: false },
      { text: "Set rules", isCompleted: false },
    ]);

    const dateView = ref("date");

    const participantsEmail = computed(() => [userStore.user?.email, ...otherParticipants.value]);

    const isFormValid = computed(() => {
      if (currentStep.value === 1) {
        return intialValues.name && intialValues.category && intialValues.description && intialValues.amount && intialValues.frequency && intialValues.start_date && intialValues.end_date;
      }

      if (currentStep.value === 2) {
        return participantsEmail.value.length > 1;
      }

      return intialValues.ajo_rules.length > 0;
    });

    const frequencyOptions = computed(() => {
      if (contributionFrequencies.value) {
        return Object.values(contributionFrequencies.value);
      }
    });

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

    const onFrequencyChange = (frequency) => {
      intialValues.frequency = Number(frequency.value.value);
      switch (frequency.value.name) {
        case "YEARLY":
          dateView.value = "year";
          break;
        case "MONTHLY":
          dateView.value = "month";
          break;
        case "WEEKLY":
        case "DAILY":
          dateView.value = "date";
          break;
        default:
          dateView.value = "date";
          break;
      }
    };

    const addEmail = () => {
      if (isValidEmail(newEmail.value) && !otherParticipants.value.includes(newEmail.value)) {
        otherParticipants.value.push(newEmail.value);
        newEmail.value = "";
      }
    };

    const removeEmail = (email) => {
      otherParticipants.value = otherParticipants.value.filter((item) => item !== email);
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

        intialValues.members = participantsEmail.value;
        try {
          intialValues.members = participantsEmail.value;

          const res = await ajoStore.createAjo(intialValues);
          if (!res || res.success === false) {
            throw new Error("Failed to create Ajo.");
          }

          // await setAjoRules(user.user_id);

          openDialog();
        } catch (error) {
          console.error("Error creating Ajo group:", error);
        }
      }
    };

    const setAjoRules = async (ajoId) => {
      if (ajoId) {
        for (const rule of intialValues.ajo_rules) {
          try {
            const data = { ajo_id: ajoId, value: rule };
            await ajoStore.createAjoRules(data);
          } catch (error) {
            throw new Error("Failed to set Ajo rules.", error);
          }
        }
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

    const onDrag = (email, index) => {
      if (index > 0) {
        draggedItem.value = email;
        draggedIndex.value = index - 1;
      } else {
        draggedItem.value = null;
        draggedIndex.value = null;
      }
    };

    const onDrop = (dropIndex) => {
      const adjustedDropIndex = dropIndex - 1;

      if (draggedIndex.value !== null && adjustedDropIndex >= 0 && adjustedDropIndex !== draggedIndex.value) {
        const reorderedParticipants = [...otherParticipants.value];
        const [draggedParticipant] = reorderedParticipants.splice(draggedIndex.value, 1);
        reorderedParticipants.splice(adjustedDropIndex, 0, draggedParticipant);
        otherParticipants.value = reorderedParticipants;
      }
      draggedItem.value = null;
      draggedIndex.value = null;
    };

    onMounted(async () => {
      rules = await ajoStore.fetchAjoRules();

      filteredRules.value = rules;

      const numberInputs = document.querySelectorAll(".p-inputnumber-input");
      numberInputs.forEach((input) => (input.value = ""));

      contributionFrequencies.value = await ajoStore.fetchAjoFrequencies();
    });

    return {
      userStore,
      ajoStore,
      globalStore,
      currentStep,
      newEmail,
      searchString,
      filteredRules,
      draggedItem,
      draggedIndex,
      minDate,
      intialValues,
      categories,
      contributionFrequencies,
      currentStepTitle,
      otherParticipants,
      steps,
      dateView,
      participantsEmail,
      isFormValid,
      frequencyOptions,
      frequency,
      validateDate,
      onAjoDateChange,
      onFrequencyChange,
      addEmail,
      removeEmail,
      isValidEmail,
      nextStep,
      setAjoRules,
      openDialog,
      searchRules,
      onDrag,
      onDrop,
    };
  },
};
</script>

<style></style>
