<template>
    <div :class="' tw-bg-yellow-400/35 tw-border tw-border-yellow-500'" class="tw-w-full tw-py-2 tw-px-3 tw-flex tw-justify-between">
        <div class="tw-text-xs tw-flex tw-gap-2">
            <img :src="warning" v-if="type=='warning'"  class="tw-w-4 tw-border-yellow-600"  name="warning" />
            {{ message }}</div>
        <div>
            <slot name="end"></slot>
        </div>
    </div>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import { warning } from 'ionicons/icons';

    export default {
        props: {
            type: {
                type: String,
                default: 'warning'
            },
            message:{
                type:String,
                default:'Verify your email address to explore Ajo by Cowris.'
            }
        },
        components: {
            IonIcon,
        },
        data() {
            return {
                warning:warning
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>