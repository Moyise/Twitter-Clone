import {
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_RESET,
  CHAT_CREATE_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_RESET,
  CHAT_DETAILS_SUCCESS,
  CHAT_GROUP_NAME_UPDATE_FAIL,
  CHAT_GROUP_NAME_UPDATE_REQUEST,
  CHAT_GROUP_NAME_UPDATE_RESET,
  CHAT_GROUP_NAME_UPDATE_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
} from "../constants/chatConstants";
import { IAction } from "../types";

export const chatCreateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case CHAT_CREATE_REQUEST:
      return { loading: true };

    case CHAT_CREATE_SUCCESS:
      return { loading: false, success: true, chat: payload };

    case CHAT_CREATE_FAIL:
      return { loading: false, error: payload };

    case CHAT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const chatListReducer = (state = { chats: [] }, { type, payload }: IAction) => {
  switch (type) {
    case CHAT_LIST_REQUEST:
      return { ...state, loading: true };

    case CHAT_LIST_SUCCESS:
      return { ...state, loading: false, chats: payload };

    case CHAT_LIST_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const chatDetailsReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case CHAT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chat: payload, success: true };

    case CHAT_DETAILS_FAIL:
      return { loading: false, error: payload, success: false };

    case CHAT_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const chatGroupeNameUpdateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case CHAT_GROUP_NAME_UPDATE_REQUEST:
      return { loading: true };
    case CHAT_GROUP_NAME_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CHAT_GROUP_NAME_UPDATE_FAIL:
      return { loading: false, error: payload };
    case CHAT_GROUP_NAME_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
