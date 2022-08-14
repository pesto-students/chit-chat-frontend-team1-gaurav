import { createStore, applyMiddleware,combineReducers } from 'redux'
import {SingleChatReducer} from "./Reducers/SingleChatReducers"
import thunk from 'redux-thunk'

let rootReducer = combineReducers({SingleChatReducer})

export const store = createStore(rootReducer,applyMiddleware(thunk));