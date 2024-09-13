<template>
 
    <div class="tw-max-w-[660px] tw-bg-white">
        <p class="tw-text-[20px] tw-font-[500] tw-mb-6" >AJO BY COWRIS 🥳</p>
        <h1 class="tw-text-[64px] tw-m-0 tw-font-semibold tw-leading-[78px] tw-mb-2 ">Experience the power of collective savings.</h1>
        <p class="tw-text-[22px] tw-font-[500] tw-mb-12">Save money, achieve goals, build community.</p>
        <span class="tw-flex tw-justify-between tw-w-[260px]">
            <Button label="Join Ajo by Cowris" />
            <Button class="" size="large "  :outlined="true" label="Sign in"   />
        </span>
    </div>

</template>

<script>
import Button from "./Button.vue"
    export default {
     components: {
        Button,
     },   
    }
</script>

<style scoped>

</style>