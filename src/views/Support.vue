<template>
  <DefaultLayout HeaderTitle="Support" HeaderDescription="We are always available to attend to you.">
    <div class="tw-bg-white tw-p-3 tw-rounded-[5px] tw-mb-8">
      <div class="tw-flex tw-items-center tw-flex-col sm:tw-flex-row tw-justify-between tw-gap-5 tw-bg-black tw-rounded-[5px] tw-p-6 tw-text-white">
        <div>
          <h4 class="tw-text-3xl md:tw-text-[32px] tw-pb-3">Chat with our customer support on Cowris</h4>
          <p class="md:tw-text-lg tw-max-w-[100ch] tw-font-thin tw-mb-[42px]">
            For quick help, you can go through our Frequently Asked Questions (FAQs). We also have customer representatives across various platforms who are always ready and happy to attend to you.
          </p>
          <Button label="Start chatting on Cowris" :isFullWidth="false" color="secondary" :outlined="true" class="!tw-text-white hover:!tw-text-black" />
        </div>

        <div class="tw-shrink-0">
          <img class="tw-inline-block" src="/images/chat-support.svg" />
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col lg:tw-grid tw-grid-cols-2 tw-gap-6">
      <div class="tw-space-y-6 tw-bg-white tw-p-6">
        <h4 class="tw-text-lg tw-text-black">You can also reach us through:</h4>
        <Accordion>
          <AccordionPanel v-for="(section, idx) in contactSections" :key="idx" :value="idx">
            <AccordionHeader>{{ section.title }}</AccordionHeader>
            <AccordionContent>
              <div v-for="(item, index) in section.items" :key="index" class="tw-flex tw-items-center tw-justify-between">
                <div class="tw-flex tw-items-center tw-gap-2">
                  <img :src="item.imageUrl" class="tw-inline-block" :alt="item.name || 'contact icon'" width="24px" />
                  <p class="tw-text-base tw-text-[#000000]">{{ item.name || item.value }}</p>
                </div>

                <div v-if="item.link">
                  <a :href="item.link" target="_blank">
                    <img src="/images/arrow-up-right.svg" class="tw-inline-block" alt="arrow" width="24px" />
                  </a>
                </div>

                <div v-if="item.value && !item.link">
                  <TextClipboard :text="item.value" :isText="false" />
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <div class="tw-space-y-6 tw-bg-white tw-p-6">
        <h4 class="tw-text-lg tw-text-black">Frequently asked questions</h4>

        <Accordion value="0">
          <AccordionPanel v-for="(item, idx) in faqLists" :key="item.title" :value="idx">
            <AccordionHeader>{{ item.title }}</AccordionHeader>
            <AccordionContent>
              <p class="tw-text-[#333333]">
                {{ item.paragraph }}
              </p>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import Button from "@/components/Button.vue";
import DefaultLayout from "@/components/DefaultLayout.vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import TextClipboard from "@/components/TextClipboard.vue";

export default {
  components: {
    DefaultLayout,
    Button,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    TextClipboard,
  },

  setup() {
    const contactSections = [
      {
        title: "Chatting platforms",
        items: [
          {
            name: "WhatsApp",
            imageUrl: "/images/whatsapp.svg",
            link: "https://google.com",
          },
          {
            name: "Telegram",
            imageUrl: "/images/telegram.svg",
            link: "https://google.com",
          },
        ],
      },
      {
        title: "Phone calls",
        items: [
          {
            imageUrl: "/images/phone-call.png",
            value: "(+234)9032063405",
          },
          {
            imageUrl: "/images/phone-call.png",
            value: "(+234)9032039414",
          },
        ],
      },
      {
        title: "Email Support",
        items: [
          {
            imageUrl: "/images/email.png",
            value: "cowristect@cowris.tech",
          },
        ],
      },
      {
        title: "Social media platforms",
        items: [
          {
            name: "Facebook",
            imageUrl: "/images/facebook.png",
            link: "https://www.facebook.com/Cowris.Technologies.Limited?mibextid=LQQJ4d",
          },
          {
            name: "Twitter",
            imageUrl: "/images/twitter.png",
            link: "https://twitter.com/SendCowris",
          },
        ],
      },
    ];

    const faqLists = [
      {
        title: "What is an Ajo?",
        paragraph:
          "An Ajo is a traditional rotating savings and credit association where participants contribute a fixed amount of money periodically, and one member withdraws the lump sum in each round, taking turns until everyone has received their payout.",
      },
      {
        title: "How do I join an Ajo group?",
        paragraph:
          "An Ajo is a traditional rotating savings and credit association where participants contribute a fixed amount of money periodically, and one member withdraws the lump sum in each round, taking turns until everyone has received their payout.",
      },
      {
        title: "What is slot swapping?",
        paragraph:
          "An Ajo is a traditional rotating savings and credit association where participants contribute a fixed amount of money periodically, and one member withdraws the lump sum in each round, taking turns until everyone has received their payout.",
      },
      {
        title: "What happens if I miss a contribution?",
        paragraph:
          "An Ajo is a traditional rotating savings and credit association where participants contribute a fixed amount of money periodically, and one member withdraws the lump sum in each round, taking turns until everyone has received their payout.",
      },
      {
        title: "When can I withdraw my savings?",
        paragraph:
          "An Ajo is a traditional rotating savings and credit association where participants contribute a fixed amount of money periodically, and one member withdraws the lump sum in each round, taking turns until everyone has received their payout.",
      },
    ];

    return {
      contactSections,
      faqLists,
    };
  },
};
</script>

<style>
.p-accordion {
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
}
.p-accordionpanel {
  border-radius: 16px;
  overflow: hidden;
  border: none !important;
}

.p-accordionheader {
  font-size: 16px !important;
  color: #000000 !important;
  font-weight: 500 !important;
}

.p-accordioncontent-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.p-accordioncontent-content,
.p-accordionheader {
  background-color: #f3f5f9 !important;
}
</style>
