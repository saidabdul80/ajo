<template>
  <div class="tw-bg-white tw-flex tw-flex-col tw-basis-full tw-p-4">
    <div
      class="tw-flex tw-justify-between tw-items-center tw-px-6 tw-py-4 tw-text-[#0F1419] tw-border-b">
      <h4 class="tw-font-medium tw-text-xl">Ajo Groups</h4>
      <span class="tw-font-bold tw-text-lg">See all</span>
    </div>
    <div
      class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
      <div>
        <img src="/images/groups.svg" alt="icon" />
      </div>
      <h5 class="tw-text-2xl tw-text-[#0F1419] tw-font-medium tw-pb-2">
        No Ajo group yet
      </h5>
      <p class="tw-max-w-[30ch] tw-text-center tw-text-[#333333]">
        You will find the ajo groups you have joined here
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AjoGroupList",
};
</script>
