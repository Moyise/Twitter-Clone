import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  selectUserReducer,
  userDetailsReducer,
  userFollowReducer,
  userLoginReducer,
  userProfileUpdateReducer,
  userRegisterReducer,
  usersListReducer,
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
  postPinReducer,
} from "./reducers/postReducers";
import {
  chatCreateReducer,
  chatDetailsReducer,
  chatGroupeNameUpdateReducer,
  chatListReducer,
} from "./reducers/chatReducers";
import { messageCreateReducer, messageListReducer } from "./reducers/messageReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userFollow: userFollowReducer,
  userProfileUpdate: userProfileUpdateReducer,
  usersList: usersListReducer,
  userSelect: selectUserReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postLike: postLikeReducer,
  postRetweet: postRetweetReducer,
  postReply: postReplyReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postsUser: postsUserReducer,
  postPin: postPinReducer,
  chatCreate: chatCreateReducer,
  chatList: chatListReducer,
  chatDetails: chatDetailsReducer,
  chatGroupName: chatGroupeNameUpdateReducer,
  messageCreate: messageCreateReducer,
  messageList: messageListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const userSelectFromStorage = localStorage.getItem("selectedUser")
  ? JSON.parse(localStorage.getItem("selectedUser")!)
  : [];

const initialState: any = {
  userLogin: { userInfo: userInfoFromStorage },
  userSelect: { selectedUser: userSelectFromStorage },
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type reducerState = ReturnType<typeof reducer>;
