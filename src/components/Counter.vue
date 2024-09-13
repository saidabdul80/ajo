<template>
  <div class="tw-flex tw-justify-around tw-w-[368px] tw-items-center">
    <div :style="{ backgroundColor: item.bg_color }" class="tw-h-[120px] tw-w-[120px] tw-rounded-lg tw-flex tw-items-center tw-justify-center">
      <img class="tw-h-[51.11px]" :src="item.icon" alt="icon" />
    </div>

    <div class=" tw-flex-col">
      
      <span class="tw-text-[48px] tw-font-[700] tw-text-white">{{ item.count }}&#43;</span>
      
      <p class="tw-font-[400] tw-text-white tw-text-[18px]">{{ item.text }}</p>
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
