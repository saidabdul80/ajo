<template>
  <div class="tw-mb-3">
    <Notify message="Verify your email address to explore Ajo by Cowris." type="warning" />
  </div>
  <ion-content color="transparent">
    <div class="tw-grid md:tw-grid-cols-6">
      <div class="md:tw-col-span-4">
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
          <div class="tw-bg-black tw-relative tw-h-[180px]">
            <div class="tw-flex tw-p-3 tw-items-center tw-justify-between tw-text-white tw-text-sm">
              <span>Wallet Balance</span>
              <PButton label="Fund Wallet" outlined="" size="small" />
            </div>
            <span class="tw-text-2xl tw-block tw-p-3 tw-text-white">N0.00</span>
            <div class="tw-absolute -tw-bottom-[1px] tw-h-[144px] tw-w-full">
              <apexchart height="100%" width="100%" type="area" :options="chartOptions" :series="series"></apexchart>
            </div>
          
          </div>
        </div>
      </div>
      <div class="md:tw-col-span-2">
    
      </div>
    </div>
  </ion-content>
</template>

<script>
import PButton from '@/components/Button.vue';
import Notify from '@/components/Notify.vue';
import VueApexCharts from 'vue3-apexcharts';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

export default {
  components: {
    IonContent,
    Notify,
    PButton,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Balance',
        data: [0, 1, 3, 2, 5, 4, 6]
      }],
      chartOptions: {
        colors: ['#546E7A', '#E91E63'],
        chart: {
          type: 'area',
          height:  'auto',
          background: 'transparent',
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          colors: ['#ccc'],
 
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.5,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          enabled: true
        }
      }
    };
  }
};
</script>

<style scoped>
.chart-card {
  width: 350px;
  padding: 20px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
}
.chart-container {
    width: 100%;
    height: 100px;
    margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance-title {
  font-size: 1.2em;
}

.fund-button {
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.card-balance {
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-size: 2em;
}

.currency-symbol {
  margin-right: 5px;
}

.balance-amount {
  font-weight: bold;
}
</style>
