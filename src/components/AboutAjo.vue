<template>
  <div
    class="about-ajo tw-grid tw-grid-cols-1 custom-grid tw-gap-10 tw-items-start md:tw-grid-cols-7 md:tw-items-center tw-px-4 tw-py-8">
    <div
      class="tw-col-span-1 md:tw-col-span-3 tw-mb-8 md:tw-mb-0 md:tw-mr-[56px] tw-w-full md:tw-w-[100%]">
      <img
        class="tw-w-full tw-h-auto"
        src="/images/bodycont.png"
        alt="Ajo Image" />
    </div>

    <div class="tw-col-span-1 md:tw-col-span-4">
      <h3 class="tw-font-[600] tw-text-[25px] tw-mb-6">About Ajo</h3>

      <p class="tw-text-[15px] tw-font-[400] tw-mb-[18px]">
        Ajo is a traditional savings method practiced in many communities, where
        a group of people contribute a fixed amount of money regularly, and each
        member takes turns receiving the total amount collected. This practice
        fosters a sense of community, trust, and mutual support.
      </p>

      <p class="tw-text-[15px] tw-font-[400] tw-leading-6 tw-mb-8">
        Ajo by Cowris brings the age-old tradition of Ajo (group savings) into
        the digital age, providing a secure and transparent platform for people
        to save together and achieve their financial goals, no matter where they
        are.
      </p>

      <Button
        @click="$globals.to('/join')"
        label="Join Ajo by Cowris"
        :is-full-width="false" />
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
@media (max-width: 562px) {
  .custom-grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
