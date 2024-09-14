<template>
  <div class="tw-flex tw-justify-around tw-gap-3 tw-items-center">
    <div :style="{ backgroundColor: item.bg_color }" class="tw-p-6 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
      <img class="tw-h-[51px] tw-max-w-[51px]" :src="item.icon" alt="icon" />
    </div>

    <div>
      <p class="tw-text-[48px] tw-font-[700] tw-text-white tw-my-0 ">{{ item.count }}&#43;</p>
      <p class="tw-font-[400] tw-text-white tw-text-[12px] tw-my-0 ">{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        bg_color: 'red',
        icon: '/images/good.png',
        count: 210,
        text: 'Completed Contributions',
      }),
    },
      item: {
      type: Object,
      default: () => ({
        bg_color: '#F8F9D7',
        icon: '/images/good.png',
        count: 210,
        text: 'Completed Contributions',
      }),
    },
  },
};
</script>

<style scoped>
</style>
