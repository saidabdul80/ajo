<template>
    <Card style="width: 382px; background-color: #FAF9F9; overflow: hidden; display: flex; justify-content: center;">
      <template #header>
        <img class="tw-w-full tw-h-auto tw-object-cover" :src="item.image_url" />
      </template>
  
      <template #title>
        <span class="tw-flex items-center tw-text-[#C4C4C4] tw-w-[338px] tw-flex tw-justify-between tw-text-gray tw-text-[16px]">
          {{ item.category }}
          <img class="tw-h-[16.63px]" :src="item.category_icon" />
        </span>
      </template>
  
      <template #subtitle>
        <span class="tw-font-[500] tw-text-black tw-text-[22px]">{{ item.name }}</span>
      </template>
  
      <template #content>
        <div>
          <span v-for="(member, index) in item.members" :key="index"  :style="{ marginLeft: `-${index * 5}px` }">
            <!-- Show Badge if there's no picture or image failed to load -->
            <Badge v-if="!member.picture_url || member.imageError" :style="{
                backgroundColor: getColorFromWord(getInitials(member.full_name)), 
                borderRadius: '50%', 
                width: '40px', 
                marginBottom: '20px', 
                height: '40px', 
                marginTop: '10px'
              }" severity="contrast">
              <span class="tw-text-[16px] tw-font-[500]">{{ getInitials(member.full_name) }}</span>
            </Badge>
            
            <!-- Show image if available and no error -->
            <img v-else :src="member.picture_url" @error="handleImageError(member)" :alt="member.full_name" class="tw-h-[40px] tw-w-[40px] tw-rounded-full" />
          </span>
        </div>
      </template>
  
      <template #footer>
        <div>
          <div class="tw-flex tw-w-[338px] tw-justify-between">
            <div class="tw-flex tw-w-[338px] tw-justify-between tw-text-[18px]">{{ $globals.toCurrency(item.total_contributed) }} contributed of 
                <span class="tw-text-[#6A6A6A]">{{ $globals.toCurrency(item.total_contribution)}}%</span>
            </div>
          </div>
  
          <ProgressBar
            :style="{ height: '9px', marginTop: '10px', Color: 'black', marginBottom: '16px', width: '338px' }">
          </ProgressBar>
  
          <div class="tw-justify-between tw-w-[338px] tw-flex">
            <span class="tw-flex tw-items-center">
              <span class="tw-mr-[6px]"><img src="/images/time.png" /></span>
              <span class="tw-font-[400] tw-text-[14px]">{{item.remaining_days}}</span>
            </span>
            <p class="tw-text-[#6A6A6A] tw-text-[14px]">
              Last contribution <span class="tw-mr[1px]">{{ item.last_contribution_time}}</span> ago
            </p>
          </div>
        </div>
      </template>
    </Card>
  </template>
  
  <script>
  import Badge from 'primevue/badge';
  import ProgressBar from 'primevue/progressbar';
  import Card from 'primevue/card';
  
  export default {
    components: {
      Card,
      Badge,
      ProgressBar,
    },
    props: {
      ajo: {
        type: Object,
        default: {
          id: 1,
          name: 'NNPC Techies',
          image_url: '/images/card-example.png',
          category: "Education",
          category_icon: "/images/hand-bag.png",
          description: "",
          total_contributed: 8500000,
          total_contribution: 12000000,
          remaining_days: "3 Months left",
          last_contribution_time: "55m ago",
          members: [
            {
              id: 1,
              full_name: 'Ibrahim A Sule',
              picture_url: 'image.png',
            },
            {
              id: 2,
              full_name: 'Mush Ilyas',
              picture_url: 'image.png',
            },
            {
              id: 3,
              full_name: 'Abdullahi Zawu',
              picture_url: 'image.png',
            },
          ],
        },
      },
    },
    data(){
        return {
            item:{},
        }
    },
    created(){
        this.item = {...this.ajo}
    },
    methods: {
      getInitials(fullName) {
        if (!fullName) return '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0].charAt(0).toUpperCase();
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';
        return firstName + lastName;
      },
  
      // Convert word to ASCII sum
      getAsciiSum(word) {
        return word
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
      },
  
      // Generate HSL color from the initials
      getColorFromWord(word) {
        const asciiSum = this.getAsciiSum(word);

        // Use a base color hue and adjust for more variation
        const hue = (asciiSum * 137) % 360; // 137 is a prime number to spread out hues

        // Use a higher saturation and varied lightness for deeper colors
        const saturation = 70; // Increase saturation for vibrant colors
        const lightness = 45 + (asciiSum % 20); // Vary lightness to add more depth

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        },

  
      // Handle image error and show initials
      handleImageError(member) {
        member.imageError = true; // Vue 3 automatically tracks this
      },
    },
  };
  </script>
  
  <style scoped>
  img {
    object-fit: cover;
  }
  </style>
  