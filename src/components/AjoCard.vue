<template>
  <div class="tw-max-w-full md:tw-max-w-[440px] tw-bg-white tw-p-6 tw-rounded">
    <div class="tw-space-y-2">
      <div class="tw-flex tw-justify-between tw-items-center">
        <p class="tw-text-[#C4C4C4]">BUSINESS</p>
        <img class="tw-inline-block" src="/images/cart.svg" alt="icon" />
      </div>
      <h5 class="tw-font-medium tw-text-[22px]">NNPC Techies</h5>
    </div>

    <div class="tw-py-5">
      <AvatarGroup>
        <Avatar image="/images/avatar.png" size="large" shape="circle" />
        <Avatar image="/images/avatar.png" size="large" shape="circle" />
        <Avatar image="/images/avatar.png" size="large" shape="circle" />
        <Avatar image="/images/avatar.png" size="large" shape="circle" />
        <Avatar image="/images/avatar.png" size="large" shape="circle" />
      </AvatarGroup>
    </div>

    <div class="tw-space-y-2">
      <div
        class="tw-flex tw-items-center tw-justify-between tw-text-base md:tw-text-lg tw-text-[#6A6A6A]">
        <p>
          <span class="tw-text-black">₦8.5M contributed </span>
          <span>of ₦12M</span>
        </p>
        <p>70.83%</p>
      </div>
      <ProgressBar
        :value="50"
        style="height: 9px"
        :show-value="false"></ProgressBar>
      <div
        class="tw-flex tw-justify-between tw-items-center tw-text-sm tw-text-[#6A6A6A]">
        <p class="tw-inline-flex tw-item-center tw-gap-2">
          <img class="tw-inline-block" src="/images/clock.svg" alt="icon" />
          <span class="">3 months left</span>
        </p>
        <p>Last contribution 56m ago</p>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from "primevue/progressbar";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";

export default {
  components: {
    ProgressBar,
    Avatar,
    AvatarGroup,
  },
};
</script>

<style>
.p-progressbar {
  background-color: rgba(0, 0, 0, 0.16) !important;
}

.p-progressbar-value {
  background-color: #000000 !important;
}
</style>
