import {CHANGE_VIEW,SET_LOADING} from "../Types/UserTypes"

var UserState = {
  view:'default',
  loading:false
  };
  
  export function UserReducer(currentState = UserState, action) {
    switch (action.type) {
      case CHANGE_VIEW:
        return { ...currentState, view: action.payload };
      case SET_LOADING:
        return { ...currentState, loading: action.payload };  
      default:
        return currentState;
    }
  }