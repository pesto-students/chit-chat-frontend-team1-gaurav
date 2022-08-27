import axios from "axios";
import {
  LOAD_CURRENT_GROUPS,
  LOAD_CURRENT_GROUPCHAT,
  SET_RECEIVER_GROUPDETAILS,
  UPDATE_MESSAGE_ARRAY,
  RESET_MESSAGE_ARRAY,
  GET_STARED_MESSAGES,
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
          payload: err,
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
          payload: err,
        });
      });
  };
};
