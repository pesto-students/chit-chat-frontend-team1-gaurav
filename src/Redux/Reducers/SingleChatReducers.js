import {LOAD_CURRENT_CONTACTS} from "../Types/SingleChatTypes"
var SingleChatState = {

    onlineUsers:[],
    chatDetails:{
        userid:'',
        username:'',
        chatid:''
    },
    currentContacts:[],
    curerntSingleChatDetails:[],
    flag:false
}



export function SingleChatReducer(currentState = SingleChatState,action){
    
    switch(action.type){
        case 'CHANGE_FLAG': return {...currentState,flag:action.payload}
        case LOAD_CURRENT_CONTACTS:
            return {...currentState, currentContacts:action.payload};
        default:
            return currentState;
    }
}