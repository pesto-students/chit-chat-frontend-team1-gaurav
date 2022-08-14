import  axios  from "axios";
import {LOAD_CURRENT_CONTACTS} from "../Types/SingleChatTypes"


// export function loadCurrentContacts(){
//     return {type:'',payload:{}};
// }

export const loadCurrentContacts = () => {
    console.log("GetUsers");

    return dispatch => {
        console.log("GetUsers dispatch");
    axios.post("http://localhost:5000/chat/currentcontacts", {
      userid: localStorage.getItem("userid"),
    })
    .then((res) => {
        console.log('response',res)
        dispatch({
        type: LOAD_CURRENT_CONTACTS,
        payload:res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: LOAD_CURRENT_CONTACTS,
            payload:err
            });
    });
    };
};

export const changeflag=()=>{
 return{
    type:'CHANGE_FLAG',
    payload:true
 }
}
