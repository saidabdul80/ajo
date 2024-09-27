<template>
  <DefaultLayout
    headerTitle="Start New Ajo"
    headerDescription="Experience the power of group savings.">
    <div class="tw-basis-full">
      <div
        class="xl:tw-grid xl:tw-grid-cols-6 tw-gap-8 tw-basis-full tw-h-full">
        <div
          class="xl:tw-col-span-4 tw-flex tw-flex-col xl:tw-h-full tw-pb-6 xl:tw-pb-0">
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
                  class="tw-w-full tw-h-[54px] !tw-rounded-2xl" />

                <Input
                  placeholder="Goal of Contribution / Description"
                  size="medium"
                  v-model="form.description" />

                <div class="tw-relative">
                  <img
                    class="tw-inline-block tw-absolute tw-z-40 tw-w-4 tw-h-4 tw-top-1/2 -tw-translate-y-1/2 tw-left-3"
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
                    class="tw-inline-block tw-absolute tw-z-40 tw-w-4 tw-h-4 tw-top-1/2 -tw-translate-y-1/2 tw-left-3"
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
                  class="tw-w-full tw-h-[54px] !tw-rounded-2xl" />

                <DatePicker
                  v-model="form.startDate"
                  showIcon
                  fluid
                  iconDisplay="input"
                  placeholder="Starting Date"
                  class="tw-w-full tw-h-[54px]">
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

            <div v-if="currentStep === 2"></div>

            <Button
              :label="continueButtonLabel"
              size="large"
              class="tw-w-full tw-mt-auto"
              :disabled="!isFormValid" />
          </form>
        </div>
        <div
          class="xl:tw-col-span-2 tw-flex tw-flex-col tw-w-full tw-space-y-5">
          <AjoGroupList />
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

export default {
  name: "StartAjo",
  components: {
    DefaultLayout,
    AjoGroupList,
    Input,
    Select,
    DatePicker,
    Button,
  },
  data() {
    return {
      currentStep: 1,
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
    };
  },

  computed: {
    isFormValid() {
      return (
        this.form.groupName &&
        this.form.category &&
        this.form.description &&
        this.form.totalAmount &&
        this.form.amountPerPerson &&
        this.form.contributionFrequency &&
        this.form.startDate
      );
    },

    continueButtonLabel() {
      return this.isFormValid ? "Continue" : "Fill in all fields";
    },
  },
};
</script>

<style></style>
