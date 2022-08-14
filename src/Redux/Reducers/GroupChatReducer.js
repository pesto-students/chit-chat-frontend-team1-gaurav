import {
    LOAD_CURRENT_GROUPS
  } from "../Types/GroupChatTypes";

var GroupChatState = {
    onlineUsers: [],
    currentGroups: [],
    GroupChatMessageArray: [],
    GroupChatInfo: [],
  };

  export function GroupChatReducer(currentState = GroupChatState, action) {
    console.log('action',action);
    switch (action.type) {
      case LOAD_CURRENT_GROUPS:
        return { ...currentState, currentGroups: action.payload };
     
      default:
        return currentState;
    }
  }  