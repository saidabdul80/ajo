// src/stores/constants.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('loginedUser', {
  
  state: () => ({
    user:{}
  })  

});
