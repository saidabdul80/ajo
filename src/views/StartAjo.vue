<template>
  <DefaultLayout
    HeaderTitle="Start New Ajo"
    HeaderDescription="Experience the power of group savings.">
    <div class="tw-basis-full">
      <div
        class="tw-flex tw-flex-col-reverse tw-justify-end xl:tw-grid xl:tw-grid-cols-6 tw-gap-8 tw-basis-full tw-h-full">
        <div class="xl:tw-col-span-4 tw-flex tw-flex-col xl:tw-h-full">
          <form class="tw-bg-white tw-h-full tw-p-6 tw-flex tw-flex-col">
            <h2 class="tw-text-[22px] tw-text-black">
              Step {{ currentStep }}:
              {{ currentStepTitle[currentStep]["name"] }}
            </h2>
            <p
              v-if="currentStepTitle[currentStep]['subTitle']"
              class="tw-text-[#333333] tw-pt-1">
              {{ currentStepTitle[currentStep]["subTitle"] }}
            </p>

            <div v-if="currentStep === 1">
              <div class="tw-space-y-8 tw-pt-8">
                <Input
                  placeholder="Group Name"
                  size="medium"
                  v-model="form.groupName" />

                <Select
                  v-model="form.category"
                  :options="categories"
                  optionLabel="name"
                  placeholder="Select a Category"
                  class="tw-w-full tw-h-[48px] !tw-rounded-2xl" />

                <Input
                  placeholder="Goal of Contribution / Description"
                  size="medium"
                  v-model="form.description" />

                <div class="tw-relative">
                  <img
                    class="tw-inline-block tw-absolute tw-z-40 tw-w-4 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3"
                    src="/images/naira.svg"
                    alt="currency-icon" />
                  <Input
                    placeholder="Total Contribution Amount"
                    size="medium"
                    icon=" "
                    v-model="form.totalAmount" />
                </div>

                <div class="tw-relative">
                  <img
                    class="tw-inline-block tw-absolute tw-z-40 tw-w-3 tw-h-3 tw-top-1/2 -tw-translate-y-1/2 tw-left-3"
                    src="/images/naira.svg"
                    alt="currency-icon" />
                  <Input
                    placeholder="Contribution Per Person"
                    size="medium"
                    icon=" "
                    v-model="form.amountPerPerson" />
                </div>

                <Select
                  v-model="form.contributionFrequency"
                  :options="contributionFrequencies"
                  optionLabel="name"
                  placeholder="Select Contribution Frequency"
                  class="tw-w-full tw-h-[48px] !tw-rounded-2xl" />

                <DatePicker
                  v-model="form.startDate"
                  showIcon
                  fluid
                  iconDisplay="input"
                  placeholder="Starting Date"
                  class="tw-w-full tw-h-[48px]">
                  <template #inputicon="slotProps">
                    <img
                      class="tw-inline-block"
                      src="/images/calendar.svg"
                      alt="calendar-icon"
                      @click="slotProps.clickCallback" />
                  </template>
                </DatePicker>
              </div>
            </div>

            <div v-if="currentStep === 2">
              <div class="tw-space-y-8 tw-pt-8">
                <div class="tw-relative">
                  <Input
                    placeholder="Enter email address of participant"
                    v-model="newEmail"
                    class="!tw-pr-28 !tw-h-16" />
                  <div
                    class="tw-inline-block tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-right-2">
                    <Button
                      label="Add email"
                      size="medium"
                      @click="addEmail"
                      :is-full-width="false"
                      :disabled="!isValidEmail(newEmail)" />
                  </div>
                </div>

                <div v-if="participantsEmail.length">
                  <ul class="tw-list-disc">
                    <li
                      v-for="(email, index) in participantsEmail"
                      :key="index"
                      class="tw-flex tw-justify-between">
                      <div class="tw-inline-flex tw-items-center tw-gap-3">
                        <span
                          class="tw-flex tw-justify-center tw-items-center leading-none tw-w-8 tw-h-8 tw-rounded-full tw-text-white tw-text-xl tw-bg-[#36454F]"
                          >{{ index + 1 }}</span
                        >
                        <span class="tw-text-lg">{{ email }}</span>
                      </div>
                      <Button
                        label="Remove"
                        @click="removeEmail(index)"
                        class="!tw-text-[#D80027]"
                        icon="pi pi-times"
                        iconPos="right"
                        :is-full-width="false"
                        color="link" />
                    </li>
                  </ul>
                </div>

                <div
                  v-if="participantsEmail.length"
                  class="tw-inline-flex tw-gap-3 tw-bg-[#FFF7E9] tw-p-5 tw-rounded-lg tw-border tw-border-[#E0C9A5]">
                  <i class="pi pi-exclamation-circle tw-text-[#F0B149]"></i>
                  <div class="tw-text-sm">
                    <p
                      class="tw-text-black tw-font-semibold tw-leading-none tw-pb-2">
                      Withdrawal slot is as numbered - You can drag to adjust.
                    </p>
                    <p class="tw-text-[#333333]">
                      Participants will be be able to withdraw their
                      contribution in the order of number assigned above. You
                      can adjust the order by dragging the numbers to fit what
                      you want.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="tw-pt-8">
              <Button
                label="Continue"
                @click="nextStep"
                size="large"
                class="tw-w-full tw-mt-auto"
                :disabled="!isFormValid" />
            </div>
          </form>
        </div>
        <div
          class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
          <AccountSetup
            title="Follow these 3 simple steps."
            description="Cowris will make the Ajo creation experience smooth and easy for you."
            :steps="steps" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/DefaultLayout.vue";
import AjoGroupList from "@/components/AjoGroupList.vue";
import Input from "@/components/Input.vue";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Button from "@/components/Button.vue";
import AccountSetup from "@/components/AccountSetup.vue";

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
  },
  data() {
    return {
      currentStep: 2,
      newEmail: "",
      form: {
        startDate: "",
        groupName: "",
        category: "",
        description: "",
        totalAmount: "",
        amountPerPerson: "",
        contributionFrequency: "",
      },
      categories: [{ name: "Group" }, { name: "Single" }],
      contributionFrequencies: [{ name: "Monthly" }, { name: "Daily" }],
      currentStepTitle: {
        1: { name: "Fill in Basic Details" },
        2: {
          name: "Manage participants",
          subTitle:
            "Invitation to join your Ajo group will be sent to the email addresses you add.",
        },
        3: {
          name: "Set rules",
          subTitle: "You can search and select from the rules below.",
        },
      },

      participantsEmail: [],

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
    };
  },

  computed: {
    isFormValid() {
      if (this.currentStep == 1) {
        return (
          this.form.groupName &&
          this.form.category &&
          this.form.description &&
          this.form.totalAmount &&
          this.form.amountPerPerson &&
          this.form.contributionFrequency &&
          this.form.startDate
        );
      }

      if (this.currentStep == 2) {
        return this.participantsEmail.length > 0;
      }
    },

    continueButtonLabel() {
      return this.isFormValid ? "Continue" : "Fill in all fields";
    },
  },

  methods: {
    addEmail() {
      if (
        this.isValidEmail(this.newEmail) &&
        !this.participantsEmail.includes(this.newEmail)
      ) {
        this.participantsEmail.push(this.newEmail);
        this.newEmail = "";
      }
    },
    removeEmail(index) {
      this.participantsEmail.splice(index, 1);
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },

    nextStep() {
      console.log(this.currentStep);
    },
  },
};
</script>

<style></style>
