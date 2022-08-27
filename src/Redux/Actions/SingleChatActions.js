import axios from "axios";
import {
  LOAD_CURRENT_CONTACTS,
  LOAD_CURRENT_CHAT,
  SET_ONLINE_USERS,
  UPDATE_CHAT_INFO,
  SET_RECEIVER_DETAILS,
  UPDATE_CURRENT_CHAT,
  GET_STARED_MESSAGES,
  RESET_MESSAGE_ARRAY
} from "../Types/SingleChatTypes";

// export function loadCurrentContacts(){
//     return {type:'',payload:{}};
// }

export const loadCurrentContacts = () => {
  
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/currentcontacts`, {
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

export const loadCurrentChat = (chatid,start,end) => {
  debugger
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/loadchat`, {
        chatid: chatid,
        start:start,
        end:end
      })
      .then((res) => {
        debugger;
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


export const getStaredMessages = (chatid) => {

  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/loadstarmessages`, {
        userid:localStorage.getItem('userid'),
        chatid: chatid,
      })
      .then((res) => {
        
        dispatch({
          type: GET_STARED_MESSAGES,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_STARED_MESSAGES,
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
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_CHAT,
      payload: data,
    });
  };
};


export const resetMessageArray = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESET_MESSAGE_ARRAY,
      payload: [],
    });
  };
};