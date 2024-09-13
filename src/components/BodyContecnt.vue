<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-px-4 tw-py-8">

    <div class="tw-mb-8 md:tw-mb-0 md:tw-mr-[56px] tw-w-full md:tw-w-[636px]">
      <img class="tw-w-full tw-h-auto" src="/images/bodycont.png" alt="Ajo Image" />
    </div>


    <div class="tw-w-full md:tw-w-[780px] tw-min-w-[660px]">

      <h3 class="tw-font-[600] tw-text-[36px] tw-mb-[32px]">About Ajo</h3>


      <p class="tw-text-[22px] tw-font-[400] tw-leading-9 tw-mb-[32px]">
        Ajo is a traditional savings method practiced in many communities, where a group of people contribute a fixed amount of money regularly, and each member takes turns receiving the total amount collected. This practice fosters a sense of community, trust, and mutual support.
      </p>

      <p class="tw-text-[22px] tw-font-[400] tw-leading-9">
        Ajo by Cowris brings the age-old tradition of Ajo (group savings) into the digital age, providing a secure and transparent platform for people to save together and achieve their financial goals, no matter where they are.
      </p>

      <!-- Button -->
      <Button
        :style="{
          padding: '16px 32px 18px 30px',
          fontSize: '18px',
          marginTop: '64px',
          height: '56px',
          borderRadius: '12px'
        }"
        label="Join Ajo by Cowris"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
};
</script>

<style scoped>
/* Optional responsive adjustments */
@media (max-width: 768px) {
  .tw-text-[22px] {
    font-size: 20px; /* Adjust font size for smaller screens */
  }

  .tw-font-[600] {
    font-weight: 500; /* Adjust font weight for smaller screens */
  }

  .tw-mr-[56px] {
    margin-right: 0; /* Remove margin on smaller screens */
  }

  .tw-mb-8 {
    margin-bottom: 16px; /* Adjust bottom margin for smaller screens */
  }
}
</style>
