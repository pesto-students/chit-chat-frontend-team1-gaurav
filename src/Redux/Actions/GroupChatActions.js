import axios from "axios";
import {
    LOAD_CURRENT_GROUPS,LOAD_CURRENT_GROUPCHAT,SET_RECEIVER_GROUPDETAILS
  } from "../Types/GroupChatTypes";
 
  export const loadCurrentGroups = () => {
    return (dispatch) => {
      axios
        .post("http://localhost:5000/group/currentgroups", {
          userid: localStorage.getItem("userid"),
        })
        .then((res) => {
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

  export const loadCurrentGroupChat = (chatid) => {
    console.log('inside loadcurrentgroupchat');
    return (dispatch) => {
      axios
        .post("http://localhost:5000/group/loadgroupchat", {
          chatid: chatid,
        })
        .then((res) => {
          console.log('res-chat',res);
          dispatch({
            type:LOAD_CURRENT_GROUPCHAT,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type:LOAD_CURRENT_GROUPCHAT,
            payload: err,
          });
        });
    };
  };

  export const setReceiverGroupDetails = (data) => {
    return (dispatch) => {
      dispatch({
        type: SET_RECEIVER_GROUPDETAILS,
        payload: data,
      });
    };
  };