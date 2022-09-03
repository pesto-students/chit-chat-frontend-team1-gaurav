
import {
    CHANGE_VIEW, SET_LOADING
} from "../Types/UserTypes";

export const setView = (view) => {
    return (dispatch) => {
      dispatch({
        type:CHANGE_VIEW,
        payload: view,
      });
    };
  };

export const setLoading=(value)=>{
  return (dispatch) => {
    dispatch({
      type:SET_LOADING,
      payload: value,
    });
  };
}  