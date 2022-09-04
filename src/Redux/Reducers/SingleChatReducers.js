import {
  LOAD_CURRENT_CONTACTS,
  LOAD_CURRENT_CHAT,
  SET_ONLINE_USERS,
  UPDATE_CHAT_INFO,
  SET_RECEIVER_DETAILS,
  UPDATE_CURRENT_CHAT,
  GET_STARED_MESSAGES,
  RESET_MESSAGE_ARRAY,
  GET_IMAGES_ARRAY,
  GET_DOCUMENTS_ARRAY,
} from "../Types/SingleChatTypes";

var SingleChatState = {
  onlineUsers: [],
  receiverDetails: {},
  currentContacts: [],
  SingleChatMessageArray: [],
  SingleChatInfo: [],
  StaredMessages: [],
  imagesArray: [],
  documentsArray: [],
  flag: false,
};

export function SingleChatReducer(currentState = SingleChatState, action) {
  switch (action.type) {
    case LOAD_CURRENT_CONTACTS:
      return { ...currentState, currentContacts: action.payload };
    case LOAD_CURRENT_CHAT:
      return {
        ...currentState,
        SingleChatMessageArray: [
          ...currentState.SingleChatMessageArray,
          ...action.payload.messageArray,
        ],
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
      return {
        ...currentState,
        SingleChatMessageArray: [
          action.payload,
          ...currentState.SingleChatMessageArray,
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
        SingleChatMessageArray: [],
      };
    default:
      return currentState;
  }
}
