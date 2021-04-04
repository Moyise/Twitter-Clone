import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_RESET,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_RETWEET_REQUEST,
  POST_RETWEET_SUCCESS,
  POST_RETWEET_FAIL,
  POST_REPLY_REQUEST,
  POST_REPLY_SUCCESS,
  POST_REPLY_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_RESET,
  POSTS_USER_REQUEST,
  POSTS_USER_SUCCESS,
  POSTS_USER_FAIL,
  POSTS_USER_RESET,
  POST_PIN_REQUEST,
  POST_PIN_SUCCESS,
  POST_PIN_FAIL,
  POST_PIN_RESET,
  POST_LIST_RESET,
} from "../constants/postConstants";
import { IAction } from "../types";

export const postListReducer = (state = { posts: [] }, { type, payload }: IAction) => {
  switch (type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };

    case POST_LIST_SUCCESS:
      return { loading: false, posts: payload.posts };

    case POST_LIST_FAIL:
      return { loading: false, error: payload };

    case POST_LIST_RESET:
      return { posts: [] };

    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_CREATE_REQUEST:
      return { loading: true };

    case POST_CREATE_SUCCESS:
      return { loading: false, success: true };

    case POST_CREATE_FAIL:
      return { loading: false, error: payload };

    case POST_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_LIKE_REQUEST:
      return { loading: true };

    case POST_LIKE_SUCCESS:
      return { loading: false, success: true };

    case POST_LIKE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const postRetweetReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_RETWEET_REQUEST:
      return { loading: true };

    case POST_RETWEET_SUCCESS:
      return { loading: false, success: true };

    case POST_RETWEET_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const postReplyReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_REPLY_REQUEST:
      return { loading: true };

    case POST_REPLY_SUCCESS:
      return { loading: false, success: true };

    case POST_REPLY_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const postDetailsReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_DETAILS_REQUEST:
      return { ...state, loading: true };

    case POST_DETAILS_SUCCESS:
      return { loading: false, post: payload };

    case POST_DETAILS_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: payload };

    case POST_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const postsUserReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POSTS_USER_REQUEST:
      return { loading: true };

    case POSTS_USER_SUCCESS:
      return { loading: false, posts: payload };

    case POSTS_USER_FAIL:
      return { loading: false, error: payload };

    case POSTS_USER_RESET:
      return {};

    default:
      return state;
  }
};

export const postPinReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case POST_PIN_REQUEST:
      return { loading: true };
    case POST_PIN_SUCCESS:
      return { loading: false, success: true };
    case POST_PIN_FAIL:
      return { loading: false, error: payload };

    case POST_PIN_RESET:
      return {};

    default:
      return state;
  }
};
