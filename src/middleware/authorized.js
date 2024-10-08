
import ls from "@/services/ls";
import { useGlobalsStore } from "@/stores/globals";
const CheckLoggedIn = () => {
    if (ls.get('auth.token')) {  
    
    } else {   
       
      useGlobalsStore().logout('/join')         
    }
};

export default CheckLoggedIn;