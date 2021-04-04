import {
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
} from "../constants/chatConstants";
import { IAction } from "../types";

export const chatCreateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case CHAT_CREATE_REQUEST:
      return { loading: true };

    case CHAT_CREATE_SUCCESS:
      return { loading: false, chat: payload };

    case CHAT_CREATE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
