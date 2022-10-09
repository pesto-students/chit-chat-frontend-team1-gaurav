import { createStore, applyMiddleware, combineReducers } from "redux";
import { SingleChatReducer } from "./Reducers/SingleChatReducers";
import { GroupChatReducer } from "./Reducers/GroupChatReducer";
import { UserReducer } from "./Reducers/UserReducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  UserReducer,
  SingleChatReducer,
  GroupChatReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
