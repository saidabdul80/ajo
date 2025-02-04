<template>
  <Password class="tw-h-[48px] !tw-text-sm" toggleMask aria-label="Password">
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
import Divider from "primevue/divider";

export default {
  name: "CustomInput",
  components: {
    Password,
    Divider,
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
