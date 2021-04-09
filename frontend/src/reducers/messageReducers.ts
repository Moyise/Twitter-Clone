import {
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_RESET,
  MESSAGE_CREATE_SUCCESS,
} from "../constants/messageConstants";
import { IAction } from "../types";

export const messageCreateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case MESSAGE_CREATE_REQUEST:
      return { loading: true };

    case MESSAGE_CREATE_SUCCESS:
      return { loading: false, success: true, message: payload };

    case MESSAGE_CREATE_FAIL:
      return { loading: false, error: payload };

    case MESSAGE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};
