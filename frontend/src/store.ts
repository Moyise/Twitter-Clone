import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userFollowReducer,
  userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  postLikeReducer,
  postCreateReducer,
  postListReducer,
  postRetweetReducer,
  postReplyReducer,
  postDetailsReducer,
  postDeleteReducer,
  postsUserReducer,
} from "./reducers/postReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userFollow: userFollowReducer,
  userProfileUpdate: userProfileUpdateReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postLike: postLikeReducer,
  postRetweet: postRetweetReducer,
  postReply: postReplyReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postsUser: postsUserReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const initialState: any = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type reducerState = ReturnType<typeof reducer>;
