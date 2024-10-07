import ls from "@/services/ls";

const CheckAbility = (globals, abilites) => {
    if(typeof abilites == 'object'){
        const abilitesStore = JSON.parse(ls.get('user'))?.abilities
        return abilites.some(item=> abilitesStore.includes(item))
    }else{
        return true
    }
};

export default CheckAbility;