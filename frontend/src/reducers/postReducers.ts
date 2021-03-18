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
