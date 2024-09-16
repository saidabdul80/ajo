    <template>
        <div class="tw-h-full tw-w-full" color="light">
            <template1>
                <template #content>
                    <ion-content color="white">
                        <div class="!tw-flex tw-flex-col tw-w-full tw-h-[100vh] tw-mt-20 tw-items-center">
                            <div class="tw-w-[50%] tw-mt-20">
                                <H1 class="tw-font-[600]"text="Welcome back" />
                                <span class="tw-text-sm tw-mb-8 tw-mt-2 tw-block tw-text-gray-500">
                                    No Cowris account yet? 
                                    <a class="tw-underline tw-cursor-pointer tw-text-gray-800"> Sign up </a>
                                </span>

                                <Input class="tw-mb-5" placeholder="Email Address" size="medium" />
                                <Password class="tw-mb-8" placeholder="Password" size="medium" toggleMask />

                                <div class="tw-flex tw-items-center tw-w-full tw-gap-2 tw-mb-8 tw-justify-between">
                                    
                                    <span class=" tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500">
                                        <Checkbox :binary="true" v-model="form.accept"inputId="ingredient1" />
                                        <label for="ingredient1" class="ml-2"> Remember me</label>
                                    </span>

                                    <span style="font-size: 0.875rem; color: #6b7280;">
                                        <a  href="#" style="color: inherit; text-decoration: none;" onmouseover="this.style.color='#0369a1'"
                                            onmouseout="this.style.color='#6b7280'">Forgot password?
                                        </a>
                                    </span>

                                </div>

                                <Button label="Sign up" size="medium" class="tw-w-full" />
                            </div>
                        </div>
                    </ion-content>
                </template>
            </template1>
            <slot name="content"></slot>
        </div>
    </template>

    <script>
    import { IonContent } from "@ionic/vue";
    import Template1 from "@/components/Template1.vue";
    import Input from "@/components/Input.vue";
    import Password from "@/components/Password.vue";
    import Checkbox from "@/components/Checkbox.vue";
    import H1 from "@/components/H1.vue";
    import Button from "@/components/Button.vue";

    export default {
        components: {
            IonContent,
            Template1,
            Input,
            Password,
            H1,
            Checkbox,
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
