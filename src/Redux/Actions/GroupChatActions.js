import axios from "axios";
import {
  LOAD_CURRENT_GROUPS,
  LOAD_CURRENT_GROUPCHAT,
  SET_RECEIVER_GROUPDETAILS,
  UPDATE_MESSAGE_ARRAY,
  RESET_MESSAGE_ARRAY,
  GET_STARED_MESSAGES,
  GET_IMAGES_ARRAY,
  GET_DOCUMENTS_ARRAY
} from "../Types/GroupChatTypes";

export const loadCurrentGroups = () => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/currentgroups`, {
        userid: localStorage.getItem("userid"),
      })
      .then((res) => {
        dispatch({
          type: LOAD_CURRENT_GROUPS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("error groups data", err);
        dispatch({
          type: LOAD_CURRENT_GROUPS,
          payload: [],
        });
      });
  };
};

export const loadCurrentGroupChat = (chatid, start, end) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/loadgroupchat`, {
        chatid: chatid,
        start: start,
        end: end,
      })
      .then((res) => {
        console.log("res-chat", res);
        dispatch({
          type: LOAD_CURRENT_GROUPCHAT,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOAD_CURRENT_GROUPCHAT,
          payload: [],
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

export const updateMessageArray = (data) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MESSAGE_ARRAY,
      payload: data,
    });
  };
};

export const ResetMessageArray = (data) => {
  return (dispatch) => {
    dispatch({
      type: RESET_MESSAGE_ARRAY,
      payload: [],
    });
  };
};

export const getGroupStaredMessages = (groupid) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/loadstarmessages`, {
        userid: localStorage.getItem("userid"),
        groupid: groupid,
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
          payload: [],
        });
      });
  };
};


export const getGroupImagesArray = (groupid) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/getimagesarray`, {
        groupid: groupid,
      })
      .then((res) => {
        dispatch({
          type: GET_IMAGES_ARRAY,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_IMAGES_ARRAY,
          payload: [],
        });
      });
  };
};

export const getGroupDocumentsArray = (groupid) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/group/getdocumentsarray`, {
        groupid: groupid,
      })
      .then((res) => {
        dispatch({
          type: GET_DOCUMENTS_ARRAY,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_DOCUMENTS_ARRAY,
          payload: [],
        });
      });
  };
};
