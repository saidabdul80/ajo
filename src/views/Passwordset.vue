<template>
    <div class="tw-h-full tw-w-full" color="light">
        <template1>
            <template #content>
                <ion-content color="white" class="tw-flex tw-items-center tw-justify-center tw-h-full">
                    <div class="!tw-flex tw-flex-col tw-w-full tw-items-center tw-justify-center md:tw-h-[100vh] tw-h-auto tw-px-4">
                        <div class="md:tw-w-[50%] sm:tw-w-[70%] tw-w-[90%] tw-flex tw-flex-col tw-items-center">
                            <H1 class="tw-font-[600] tw-text-center tw-mb-4" text="Password Set!" />
                            <span class="tw-text-center tw-text-sm tw-mb-8 tw-block tw-text-gray-500">
                                Your new password has been successfully created. You can now sign in with your new password.
                            </span>
                            <Button label="Sign in" size="medium" class="tw-w-full" />
                        </div>
                    </div>
                </ion-content>
            </template>
        </template1>
    </div>
</template>

<script>
import { IonContent } from "@ionic/vue";
import Template1 from "@/components/Template1.vue";
import H1 from "@/components/H1.vue";
import Button from "@/components/Button.vue";

export default {
    components: {
        IonContent,
        Template1,
        H1,
        Button,
    },
    data() {
        return {
            form: {},
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
