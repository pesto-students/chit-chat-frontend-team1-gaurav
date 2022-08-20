import {
  LOAD_CURRENT_GROUPS,
  LOAD_CURRENT_GROUPCHAT,
  SET_RECEIVER_GROUPDETAILS,
  UPDATE_MESSAGE_ARRAY,
  RESET_MESSAGE_ARRAY,
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
      return {
        ...currentState,
        GroupChatMessageArray: [
          ...currentState.GroupChatMessageArray,
          ...action.payload.messageArray,
        ],
      };

    case SET_RECEIVER_GROUPDETAILS:
      return { ...currentState, receiverGroupDetails: action.payload };

    case UPDATE_MESSAGE_ARRAY:
      return {
        ...currentState,
        GroupChatMessageArray: [
          action.payload,
          ...currentState.GroupChatMessageArray,
        ],
      };
    case RESET_MESSAGE_ARRAY:
      return {
        ...currentState,
        GroupChatMessageArray: [],
      };
    default:
      return currentState;
  }
}
