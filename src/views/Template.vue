<template>
    <div class="tw-py-10">
        <div id="container"  class="tw-pt-5">
            <AjoLandContent />
            
            <div class="tw-mt-[40px] tw-mb-[40px]"><Card /></div>

            <div  class=" tw-p-[80px] tw-bg-[#36454F] tw-h-[280px] tw-w-full tw-flex tw-items-center">
                <Counter />
            </div>

            <div class="tw-mt-[30px] tw-p-[120px] tw-h-[840px] tw-bg-[#F8F9D7] tw-flex tw-items-cente">
                <BodyContecnt />
            </div>


        </div>
    </div>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import AjoLandContent from "@/components/AjoLandContent.vue"
import Card from "@/components/Card.vue";
import BodyContecnt from "@/components/BodyContecnt.vue"
import Counter from "@/components/Counter.vue";
    export default {
        components: {
            AjoLandContent,
            IonContent,
            Card,
            Counter,
            BodyContecnt,
        },
    }

    
</script>

<style lang="scss" scoped>

</style>@/components/Footer.vue