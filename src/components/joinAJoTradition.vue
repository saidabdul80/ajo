<template>
  <div
    class="tw-flex tw-gap-9 tw-py-4 tw-items-center tw-flex-col md:tw-flex-row tw-justify-between tw-text-center">
    <div
      class="tw-font-[600] tw-text-[35px] tw-text-[#FFFFFF] tw-pointer-events-none">
      Join the Tradition of Group Savings
    </div>

    <div>
      <Button
        @click="$globals.to('/join')"
        class="tw-whitespace-nowrap"
        size="small"
        label="Join Ajo by Cowris" />
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

<style scoped></style>
