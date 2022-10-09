import {
  CHANGE_VIEW,
  SET_LOADING,
  SET_USER_PROFILE,
  SET_USER_NAME,
} from "../Types/UserTypes";

var UserState = {
  view: "default",
  loading: false,
  userName: "",
  profilepic: "",
};

export function UserReducer(currentState = UserState, action) {
  switch (action.type) {
    case CHANGE_VIEW:
      return { ...currentState, view: action.payload };
    case SET_LOADING:
      return { ...currentState, loading: action.payload };
    case SET_USER_PROFILE:
      return { ...currentState, profilepic: action.payload };
    case SET_USER_NAME:
      return { ...currentState, userName: action.payload };
    default:
      return currentState;
  }
}
