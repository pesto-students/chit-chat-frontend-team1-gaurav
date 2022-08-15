import {CHANGE_VIEW} from "../Types/UserTypes"

var UserState = {
  view:'default'
  };
  
  export function UserReducer(currentState = UserState, action) {
    switch (action.type) {
      case CHANGE_VIEW:
        return { ...currentState, view: action.payload };
     
      default:
        return currentState;
    }
  }