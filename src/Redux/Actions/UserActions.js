import {
  CHANGE_VIEW,
  SET_LOADING,
  SET_USER_NAME,
  SET_USER_PROFILE,
} from "../Types/UserTypes";

export const setView = (view) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_VIEW,
      payload: view,
    });
  };
};

export const setLoading = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: value,
    });
  };
};

export const setUserProfile=(value)=>{
  return (dispatch) => {
    dispatch({
      type: SET_USER_PROFILE,
      payload: value,
    });
  };
};

export const setUserName = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_NAME,
      payload: value,
    });
  };
};
