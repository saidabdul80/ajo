<template>
  <div class="tw-text-center">
    <h2 class="tw-text-2xl tw-font-medium tw-text-black">Log out</h2>
    <p clas="tw-text-[#333333] tw-pt-4">Are you sure you want to log out?</p>

    <div class="tw-flex tw-flex-col tw-gap-5 tw-pt-8">
      <Button label="Yes, log out" color="danger" />
      <Button label="No, go back" color="link" @click="closeDialog" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,
  },

  methods: {
    closeDialog() {
      eventBus.emit("close-dialog");
    },
  },
};
</script>
