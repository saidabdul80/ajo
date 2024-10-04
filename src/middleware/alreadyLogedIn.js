import router from "@/router";
import ls from "@/services/ls";
const AlreadyLogedIn = (to) => {
    if (ls.get('auth.token')) {  
        if(to.fullPath.includes('signin')|| to.fullPath.includes('join')){
            router.push('/app/overview')
        }
    } 
};

export default AlreadyLogedIn;