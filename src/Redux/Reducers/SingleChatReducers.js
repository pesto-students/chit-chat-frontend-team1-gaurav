import {
  LOAD_CURRENT_CONTACTS,
  LOAD_CURRENT_CHAT,
  SET_ONLINE_USERS,
  UPDATE_CHAT_INFO,
  SET_RECEIVER_DETAILS,
  UPDATE_CURRENT_CHAT,
} from "../Types/SingleChatTypes";

var SingleChatState = {
  onlineUsers: [],
  receiverDetails: {},
  currentContacts: [],
  SingleChatMessageArray: [],
  SingleChatInfo: [],
  flag: false,
};

export function SingleChatReducer(currentState = SingleChatState, action) {
  switch (action.type) {
    case LOAD_CURRENT_CONTACTS:
      return { ...currentState, currentContacts: action.payload };
    case LOAD_CURRENT_CHAT:
      return {
        ...currentState,
        SingleChatMessageArray: action.payload.messageArray,
        SingleChatInfo: action.payload.chatInfo,
      };
    case SET_ONLINE_USERS:
      return {
        ...currentState,
        onlineUsers: action.payload,
      };
    case UPDATE_CHAT_INFO:
      return {
        ...currentState,
        SingleChatInfo: action.payload,
      };
    case SET_RECEIVER_DETAILS:
      return {
        ...currentState,
        receiverDetails: action.payload,
      };
      case UPDATE_CURRENT_CHAT:
        debugger;
      return {
        ...currentState,
        SingleChatMessageArray: action.payload,
      };
    default:
      return currentState;
  }
}
