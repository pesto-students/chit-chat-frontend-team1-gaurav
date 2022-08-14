import axios from "axios";
import {
    LOAD_CURRENT_GROUPS
  } from "../Types/GroupChatTypes";
 
  export const loadCurrentGroups = () => {

    console.log('group action',localStorage.getItem('userid'));
    return (dispatch) => {
      axios
        .post("http://localhost:5000/group/currentgroups", {
          userid: localStorage.getItem("userid"),
        })
        .then((res) => {
            console.log('groups data', res);
          dispatch({
            type: LOAD_CURRENT_GROUPS,
            payload: res.data,
          });
        })
        .catch((err) => {
            console.log('error groups data', err);
          dispatch({
            type:LOAD_CURRENT_GROUPS,
            payload: err,
          });
        });
    };
  };  