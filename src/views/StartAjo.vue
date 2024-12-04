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

                <Select v-model="intialValues.category" :options="categories" :errorMessage="globalStore.nameRules.category" placeholder="Select a Category" class="tw-w-full tw-h-[48px] !tw-rounded-2xl tw-font-light" />

                <Input placeholder="Goal of Contribution / Description" size="medium" v-model="intialValues.description" :errorMessage="globalStore.nameRules.description" />

                <div class="tw-relative">
                  <img class="tw-inline-block tw-absolute tw-z-40 tw-w-3 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3" src="/images/naira.svg" alt="currency-icon" />

                  <InputNumber v-model="intialValues.amount" placeholder="Contribution Per Person" inputId="integeronly" fluid />
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

                <PDate v-model="ajoDate" @change="onAjoDateChange" :view="dateView" width="100%" />
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
              <Button label="Continue" @click="nextStep" class="tw-w-full tw-mt-auto" :disabled="!isFormValid" />
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
import { useUserStore } from "@/stores/user.js";
import { useAjoStore } from "@/stores/ajo.js";
import { useGlobalsStore } from "@/stores/globals.js";

import { helpers } from "@/helpers/utilities.js";

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
import { error } from "highcharts";

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

  data() {
    return {
      userStore: useUserStore(),
      ajoStore: useAjoStore(),
      globalStore: useGlobalsStore(),
      currentStep: 1,
      newEmail: "",
      searchString: "",
      filteredRules: [],
      draggedItem: null,
      draggedIndex: null,
      minDate: new Date(),
      
      intialValues: {
        ajo_rules: [],
        is_public: false,
        rules: [],
      },
      categories: ["Personal savings", "Education", "Housing", "Business", "Health", "Trips or vacations", "Event", "Charity", "Investment", "Emergency fund"],
      contributionFrequencies: null,
      currentStepTitle: {
        1: { name: "Fill in Basic Details" },
        2: {
          name: "Manage participants",
          subTitle: "Invitation to join your Ajo group will be sent to the email addresses you add.",
        },
        3: {
          name: "Set rules",
          subTitle: "You can search and select from the rules below.",
        },
      },
      otherParticipants: [],
      steps: [
        {
          text: "Fill in basic details",
          isCompleted: false,
        },
        {
          text: "Manage participants",
          isCompleted: false,
        },
        {
          text: "Set rules",
          isCompleted: false,
        },
      ],
      dateView: "date",
    };
  },

  computed: {
    participantsEmail() {
      return [this.userStore.user?.email, ...this.otherParticipants];
    },
    isFormValid() {
      if (this.currentStep === 1) {
        return (
          this.intialValues.name &&
          this.intialValues.category &&
          this.intialValues.description &&
          this.intialValues.amount &&
          this.intialValues.frequency &&
          this.intialValues.start_date &&
          this.intialValues.end_date
        );
      }

      if (this.currentStep === 2) {
        return this.participantsEmail.length > 1;
      }

      return this.intialValues.ajo_rules.length > 0;
    },

    frequencyOptions() {
      if (this.contributionFrequencies) {
        return Object.values(this.contributionFrequencies);
      }
    },
  },

  methods: {
    validateDate(date) {
      const startDate = new Date(date[0]); 
      const endDate = new Date(date[1]);   

      const timeDifference = endDate - startDate;
      const totalDays = timeDifference / (1000 * 3600 * 24);
      if(totalDays% this.dateView !==0){
        return false;
      }else{
        return true;
      }
    },
    onAjoDateChange(date) {
      this.validateDate(date);
      this.intialValues.start_date = date[0];
      this.intialValues.end_date = date[1];
      //this.end_date = helpers.calculateEndDate(date, this.selectedFrequency?.name);
    },
    // onEndDateChange(date) {
    //   this.end_date = date;
    //   this.start_date = helpers.calculateStartDate(date, this.selectedFrequency?.name);
    // },
    onFrequencyChange(frequency) {
      this.intialValues.frequency = Number(this.selectedFrequency?.value);
      switch (this.selectedFrequency?.name) {
        case "YEARLY":
          this.dateView = "year";
          
          break;
        case "MONTHLY":
          this.dateView = "month";
          break;
        case "WEEKLY":
          // this.intialValues.startDate = helpers.calculateStartDate(this.minDate, frequency);
          this.dateView = "date";
          break;
        case "DAILY":
          // this.intialValues.startDate = helpers.calculateStartDate(this.minDate, frequency);
          this.dateView = "date";
          break;
        default:
          this.dateView = "date";
          break;
      }
    },
    addEmail() {
      if (this.isValidEmail(this.newEmail) && !this.otherParticipants.includes(this.newEmail)) {
        this.otherParticipants.push(this.newEmail);
        this.newEmail = "";
      }
    },
    removeEmail(email) {
      this.otherParticipants = this.otherParticipants.filter((item) => item !== email);
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },

    async nextStep() {
      const { formattedDate, calculateEndDate } = helpers;

      if (this.isFormValid && this.currentStep <= 2) {
        this.steps[this.currentStep - 1].isCompleted = true;
        this.currentStep += 1;
      }

      if (this.currentStep === 3 && this.isFormValid) {
        this.steps[this.currentStep - 1].isCompleted = true;
        try {
          this.intialValues.members =  this.participantsEmail;
          const res = await this.ajoStore.createAjo(this.intialValues);
          if (!res || res.success === false) {
            throw new Error("Failed to create Ajo.");
          }

          this.openDialog();
        } catch (error) {
          console.error("Error creating Ajo group:", error);
        }
      }
    },

  
    async setAjoRules(ajoId) {
      if (ajoId) {
        for (const rule of this.intialValues.ajo_rules) {
          try {
            const data = { ajo_id: ajoId, value: rule };
            await this.ajoStore.createAjoRules(data);

            console.log(rule);
          } catch (error) {
            throw new Error("Failed to set Ajo rules.", error);
          }
        }
      }
    },

    openDialog() {
      eventBus.emit("open-dialog", {
        default: AjoGroupDialog,
        title: "All done!",
        position: "center",
        props: { title: this.intialValues.groupName },
      });
    },

    searchRules() {
      const lowerSearch = this.searchString.toLowerCase();
      this.filteredRules = this.intialValues.rules.filter((rule) => rule.label.toLowerCase().startsWith(lowerSearch));
    },

    onDrag(email, index) {
      if (index > 0) {
        this.draggedItem = email;
        this.draggedIndex = index - 1;
      } else {
        this.draggedItem = null;
        this.draggedIndex = null;
      }
    },

    onDrop(dropIndex) {
      const adjustedDropIndex = dropIndex - 1;

      if (this.draggedIndex !== null && adjustedDropIndex >= 0 && adjustedDropIndex !== this.draggedIndex) {
        const reorderedParticipants = [...this.otherParticipants];

        const [draggedParticipant] = reorderedParticipants.splice(this.draggedIndex, 1);

        reorderedParticipants.splice(adjustedDropIndex, 0, draggedParticipant);

        this.otherParticipants = reorderedParticipants;
      }

      this.draggedItem = null;
      this.draggedIndex = null;
    },
  },

  async mounted() {
    this.intialValues.rules = await this.ajoStore.fetchAjoRules();
    this.filteredRules = this.intialValues.rules;
    const numberInputs = document.querySelectorAll(".p-inputnumber-input");
    numberInputs.forEach((input) => (input.value = ""));

    this.contributionFrequencies = await this.ajoStore.fetchAjoFrequencies();
  },
};
</script>

<style></style>
