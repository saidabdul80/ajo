  <template>
    
          <ion-content color="light">
      <div >
        <div id="container" class="tw-pt-5">
          <AjoLandContent />
    
          <div class="tw-mt-[40px] tw-mb-[40px]">
            <Card />
          </div>
    
          <div class="tw-p-[80px] tw-bg-[#36454F] tw-min-h-[280px] tw-w-full tw-grid xl:tw-grid-cols-4 md:tw-grid-cols-2 tw-gap-8 tw-items-center">
            <Counter v-for="x in 4" :key="x" />
          </div>
    
          <div class="tw-mt-[30px] tw-px-[9%] tw-min-h-[840px] tw-bg-[#F8F9D7]">
            <BodyContent />
          </div>
    
          <div class="tw-mt-[30px] tw-px-[9%] tw-min-h-[400px] tw-bg-[white]">
            <AjoGuide />
          </div>

            <div class="tw-bg-[#36454F] tw-min-h-[280px] tw-mt-[30px] tw-px-[8%] ">
              <joinAjoTradition />
            </div>

            <div class="tw-min-h-[48px] tw-bg-[#E1E1E1] tw-px-[8%] tw-py-[20px]">
              <AjoFooter />
            </div>

            <div class="tw-py-6">
              <AjoSignIn />
            </div>

            
            <div class=" tw-mt-[10px]">
              <AjoRecoverAcct />
            </div>

            <div class=" tw-mt-[10px]">
              <AjoverifyEmail />
            </div>
              
            <div class=" tw-mt-[10px]">
            <Newpassword />
            </div>

            <div class=" tw-mt-[10px]">
            <Passwordset />
            </div>

            

        </div>
      </div>
      </ion-content>
    </template>
    
    <script>
    import {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
    } from '@ionic/vue';
    import AjoLandContent from '@/components/AjoLandContent.vue';
    import Card from '@/components/Card.vue';
    import BodyContent from '@/components/BodyContent.vue';
    import Counter from '@/components/Counter.vue';
    import AjoGuide from '@/components/AjoGuide.vue';
    import joinAjoTradition from "@/components/joinAJoTradition.vue";
    import AjoFooter from '@/components/AjoFooter.vue';
    import AjoSignIn from '@/components/AjoSignIn.vue';
    import AjoRecoverAcct from "@/components/AjoRecoverAcct.vue";
    import AjoverifyEmail from '@/components/AjoverifyEmail.vue';
    import Newpassword from '@/components/Newpassword.vue';
    import Passwordset from "@/components/Passwordset.vue"
    
    export default {
      components: {
        AjoLandContent,
        IonContent,
        Card,
        Counter,
        BodyContent,
        AjoGuide,
        joinAjoTradition,
        AjoFooter,
        AjoSignIn,
        AjoverifyEmail,
        AjoRecoverAcct,
        Newpassword,
        Passwordset,
        
      },
    };
    </script>
    
    <style  scoped>
    </style>
    