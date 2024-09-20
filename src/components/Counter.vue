<template>
  <div class="tw-flex tw-gap-6 tw-items-center">
    <div
      :style="{ backgroundColor: item.bg_color }"
      class="tw-h-[120px] tw-w-[120px] tw-rounded-lg tw-flex tw-items-center tw-justify-center">
      <img class="tw-h-16 tw-w-16" :src="item.icon" alt="icon" />
    </div>

    <div class="tw-flex tw-flex-col tw-item-center">
      <p class="tw-text-[48px] tw-font-[700] tw-text-white">
        {{ item.count }}&#43;
      </p>
      <p class="tw-font-[400] tw-text-white tw-text-lg">
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
