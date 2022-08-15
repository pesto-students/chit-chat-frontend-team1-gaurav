import {
    LOAD_CURRENT_GROUPS,LOAD_CURRENT_GROUPCHAT,SET_RECEIVER_GROUPDETAILS
  } from "../Types/GroupChatTypes";

var GroupChatState = {
    onlineUsers: [],
    receiverGroupDetails: {},
    currentGroups: [],
    GroupChatMessageArray: [],
    GroupChatInfo: [],
  };

  export function GroupChatReducer(currentState = GroupChatState, action) {
    switch (action.type) {
      case LOAD_CURRENT_GROUPS:
        return { ...currentState, currentGroups: action.payload };
      
      case LOAD_CURRENT_GROUPCHAT:
        return {...currentState,GroupChatMessageArray: action.payload.messageArray}
      
      case SET_RECEIVER_GROUPDETAILS:
        return {...currentState, receiverGroupDetails:action.payload}  
      default:
        return currentState;
    }
  }  