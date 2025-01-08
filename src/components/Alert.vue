<template>
  <div class="text-center">
    <Dialog modal @hide="handleCancel" v-model:visible="internalModel" header=""
      :style="!md ? 'width:' + width + '!important' : ''"
      :pt="{ root: { class: 'tw-px-5' }, content: { class: 'tw-px-0' }, header: { style: 'flex-direction: row-reverse; padding-bottom: 0px;padding-right:0px' } }">
      <div class=" tw-mt-1">
        <div class="tw-pb-6" v-if="imgPath">
          <img :src="getImageUrl()" :width="imgWidth" class="tw-mx-auto" />
        </div>
        <div class="tw-pb-3 tw-flex tw-justify-center" v-if="icon">

          <v-icon class="!tw-text-[80px]  tw-mx-auto" :class="icon" :icon="icon"> </v-icon>
        </div>
        <h1 class="tw-text-[32px] tw-font-semibold tw-px-2 tw-text-center" >
          {{ title }}</h1>
      </div>

      <p @click="clickEvent" v-html="text" class="tw-text-center tw-pb-6 tw-px-0"></p>
      <template #footer>
        <div class="tw-w-full tw-flex" :class="cancelBtnText && confirmBtnText
          ? 'tw-justify-center tw-gap-x-3'
          : 'tw-justify-center'
          ">

          <Button v-if="cancelBtnText" @click="handleCancel" :label="cancelBtnText" severity="danger"
            class="tw-w-[45%] ">
          </Button>

          <Button v-if="confirmBtnText" @click="handleOk" :loading="loading"
            :class="` tw-w-[${btnWidth}] `" severity="secondary" :label="confirmBtnText">
          </Button>
        </div>
      </template>
    </Dialog>

  </div>
</template>
<script>

import { useGlobalsStore } from '@/stores/globals';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

export default {
  props: {
    width: {
      default: '579px'
    },
    imgWidth: {
      default: '148px'
    },
    btnWidth: {
      default: '45%'
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: "Ok",
    },
    viewAssetBtnText: {
      type: String,
      default: "View Asset",
    },
    addNewBtnText: {
      type: String,
      default: "Add New",
    },
    cancelBtnText: {
      type: String,
      default: null,
    },
    prependIcon: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ShowTwoButton: {
      type: Boolean,
      default: true,
    },
    imgPath: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    md:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      globals: useGlobalsStore()
    };
  },
  computed: {
    internalModel: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    handleOk() {
      // this.internalModel = false;
      this.$emit("confirm", this.text);
      this.globals.handleAlertResponse(true);
    },
    clickEvent(e){
      this.globals.alertClickEvent(e);
    },
    handleCancel() {
      this.$emit("cancelAlert", false);
      this.globals.handleAlertResponse(false);
      this.internalModel = false
    },
    handleViewAsset() {
      this.internalModel = false;
      this.$emit("ViewAsset");
    },
    getImageUrl() {
      return new URL(`../assets/${this.imgPath}`, import.meta.url);
    },
  },
  components: {
    Dialog,
    Button
  }
};
</script>
