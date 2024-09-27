<template>
  <Password
    :placeholder="placeholder"
    :disabled="disabled"
    class="tw-h-[48px] !tw-text-sm"
    v-model="internalValue">
    <template #header>
      <div class="font-semibold text-xm mb-4">Pick a password</div>
    </template>
    <template #footer>
      <Divider />
      <ul class="pl-2 ml-2 my-0 leading-normal">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </template>
  </Password>
</template>

<script>
import Password from "primevue/password";

export default {
  name: "CustomInput",
  components: {
    Password,
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "normal",
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style>
.p-password {
  width: 100% !important;
}
.p-password-input {
  width: 100%;
  border-radius: 16px !important;
  padding: 0 20px !important;
  font-weight: 400;
}
.p-inputtext::placeholder {
  color: #eee;
  letter-spacing: 1px;
}
</style>
