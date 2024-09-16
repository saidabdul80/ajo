<template>

    <div class="tw-max-w-[660px] tw-bg-white">
        <p class="tw-text-[20px] tw-font-[500] tw-mb-6 sm:tw-text-left tw-tracking-wide tw-text-center" >AJO BY COWRIS 🥳</p>
        <h1 class="md:tw-text-[64px] sm:tw-text-[3.5rem] sm:tw-text-left tw-tracking-wide tw-text-center tw-text-balance tw-text-[2.8rem] tw-m-0 tw-font-semibold md:tw-leading-[78px] tw-mb-2 ">Experience the power of collective savings.</h1>
        <p class="sm:tw-text-[22px] tw-text-md tw-font-[500] tw-mb-12 sm:tw-text-left tw-tracking-wide tw-text-center">Save money, achieve goals, build community.</p>
        <span class="sm:tw-flex tw-grid xs:tw-grid-cols-2 sm:tw-justify-between tw-w-full tw-gap-4 sm:tw-w-[260px]">
            <Button @click="$globals.to('/join')" label="Join Ajo by Cowris" class="tw-w-full sm:tw-w-auto" />
            <Button @click="$globals.to('/signin')" class="tw-w-full sm:tw-w-auto" size="large "  :outlined="true" label="Sign in"   />
        </span>
    </div>

</template>

<script>
import { IonContent } from "@ionic/vue";
import Button from "./Button.vue"
    export default {
     components: {
        Button,
        IonContent
     },   
    }
</script>

<style scoped>

</style>