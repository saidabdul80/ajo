<template>
  <div
    class="tw-inline-flex tw-w-fit tw-items-center tw-h-[40px] tw-rounded-2xl tw-bg-[#E8EBEF] tw-overflow-hidden">
    <button
      v-for="(title, idx) in buttonsTitle"
      :key="title"
      :class="[
        'tw-px-3 tw-h-full tw-inline-flex tw-items-center tw-transition-all',
        { active: activeButton === idx },
      ]"
      @click="handleButtonClick(idx, title)">
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Pills",
  props: {
    buttonsTitle: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      activeButton: 0,
    };
  },

  methods: {
    handleButtonClick(idx, value) {
      this.activeButton = idx;

      this.$emit("pill-selected", value);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
