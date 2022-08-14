import axios from "axios";
import {
  LOAD_CURRENT_CONTACTS,
  LOAD_CURRENT_CHAT,
  SET_ONLINE_USERS,
  UPDATE_CHAT_INFO,
  SET_RECEIVER_DETAILS,
  UPDATE_CURRENT_CHAT,
} from "../Types/SingleChatTypes";

// export function loadCurrentContacts(){
//     return {type:'',payload:{}};
// }

export const loadCurrentContacts = () => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/chat/currentcontacts", {
        userid: localStorage.getItem("userid"),
      })
      .then((res) => {
        dispatch({
          type: LOAD_CURRENT_CONTACTS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOAD_CURRENT_CONTACTS,
          payload: err,
        });
      });
  };
};

export const loadCurrentChat = (chatid) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/chat/loadchat", {
        chatid: chatid,
      })
      .then((res) => {
        dispatch({
          type: LOAD_CURRENT_CHAT,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOAD_CURRENT_CHAT,
          payload: err,
        });
      });
  };
};

export const setCurrentOnlinUsers = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_ONLINE_USERS,
      payload: data,
    });
  };
};

export const updateChatInfo = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CHAT_INFO,
      payload: data,
    });
  };
};

export const setReceiverDetails = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_RECEIVER_DETAILS,
      payload: data,
    });
  };
};


export const updateCurrentChat = (data) => {
  debugger;
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_CHAT,
      payload: data,
    });
  };
};
