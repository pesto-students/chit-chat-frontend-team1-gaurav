
import {
    CHANGE_VIEW
} from "../Types/UserTypes";

export const setView = (view) => {
    return (dispatch) => {
      dispatch({
        type:CHANGE_VIEW,
        payload: view,
      });
    };
  };