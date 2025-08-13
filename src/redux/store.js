import { createStore, combineReducers, applyMiddleware } from "redux";
import { postReducer } from "./posts/postReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  posts: postReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;