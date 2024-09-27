<template>
  <div class="tw-bg-white">
    <div class="tw-py-4 tw-px-6">
      <h4 class="tw-text-xl tw-font-semibold tw-text-[#0F1419] tw-pb-3">
        {{ title }}
      </h4>
      <p class="tw-text-[#333333] tw-max-w-[35ch]">
        {{ description }}
      </p>
    </div>
    <ul>
      <li v-for="(item, index) in steps" :key="index">
        <p
          class="tw-py-4 tw-px-6 tw-border-t tw-space-x-4 tw-inline-flex tw-items-center tw-w-full">
          <span
            :class="[
              'tw-flex tw-justify-center tw-items-center leading-none tw-w-[38px] tw-h-[38px] tw-rounded-full  tw-text-[#36454F] tw-text-xl',
              item.isCompleted ? 'tw-bg-[#36454F]' : 'tw-bg-[#EBECED]',
            ]">
            <img v-if="item.isCompleted" src="/images/check.svg" alt="icon" />
            <span v-else>{{ index + 1 }}</span>
          </span>
          <span
            :class="[
              'tw-text-xl tw-text-left',
              item.isCompleted
                ? 'tw-text-[#36454F] tw-line-through'
                : ' tw-text-[#000000]',
            ]"
            >{{ item.text }}</span
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AccountSetup",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
