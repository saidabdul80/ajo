<template>
  <Transition name="fade">
    <div v-if="isDialogOpen" class="dialog-overlay" @click="closeDialog">
      <div :class="['custom-dialog tw-max-w-[480px]', position, position === 'center' ? 'tw-w-[90%]' : 'tw-w-full', position === 'right' && 'slide-in']" @click.stop>
        <div class="tw-flex tw-justify-between tw-items-center tw-p-5 tw-border-b">
          <h4 v-if="title" class="tw-text-xl tw-text-black tw-text-left tw-w-full">
            {{ title }}
          </h4>
          <button @click="closeDialog" class="tw-ml-auto tw-flex-shrink-0">
            <img src="/images/close-circle.svg" alt="close" />
          </button>
        </div>
        <div class="content tw-p-8">
          <component :is="slotContent.default" v-bind="slotContent.props"></component>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { markRaw } from "vue";
import eventBus from "@/eventBus";

export default {
  name: "CustomDialog",
  data() {
    return {
      isDialogOpen: false,
      slotContent: {
        default: null,
      },
      position: "center",
      props:null,
      title: "",
    };
  },
  mounted() {
    eventBus.on("open-dialog", this.openDialogWithContent);
    eventBus.on("close-dialog", this.closeDialog);
  },
  beforeUnmount() {
    eventBus.off("open-dialog", this.openDialogWithContent);
    eventBus.off("close-dialog", this.closeDialog);
  },
  methods: {
    openDialogWithContent(content) {
      this.slotContent.default = markRaw(content.default);
      this.isDialogOpen = true;
      this.position = content.position || "center";
      this.title = content.title;
      this.slotContent.props = content.props || {};
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-dialog {
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .slide-in,
.fade-leave-active .slide-in {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from .slide-in,
.fade-leave-to .slide-in {
  transform: translateX(500px);
  opacity: 0;
}
</style>
