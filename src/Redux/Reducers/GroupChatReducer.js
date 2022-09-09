import {
  LOAD_CURRENT_GROUPS,
  LOAD_CURRENT_GROUPCHAT,
  SET_RECEIVER_GROUPDETAILS,
  UPDATE_MESSAGE_ARRAY,
  RESET_MESSAGE_ARRAY,
  GET_STARED_MESSAGES,
  GET_IMAGES_ARRAY,
  GET_DOCUMENTS_ARRAY,
  GET_MEMBERS
} from "../Types/GroupChatTypes";

var GroupChatState = {
  onlineUsers: [],
  receiverGroupDetails: {},
  currentGroups: [],
  GroupChatMessageArray: [],
  GroupChatInfo: [],
  StaredMessages: [],
  imagesArray: [],
  documentsArray: [],
  groupMembers:[]
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
    case GET_STARED_MESSAGES:
      return {
        ...currentState,
        StaredMessages: action.payload,
      };
    case GET_IMAGES_ARRAY:
      return {
        ...currentState,
        imagesArray: action.payload,
      };
    case GET_DOCUMENTS_ARRAY:
      return {
        ...currentState,
        documentsArray: action.payload,
      };
    case RESET_MESSAGE_ARRAY:
      return {
        ...currentState,
        GroupChatMessageArray: [],
      };
      case GET_MEMBERS:
        return {
          ...currentState,
          groupMembers: action.payload,
        };
    default:
      return currentState;
  }
}
