import {
  NOTIFICATION_LATEST_FAIL,
  NOTIFICATION_LATEST_REQUEST,
  NOTIFICATION_LATEST_SUCCESS,
  NOTIFICATION_LIST_FAIL,
  NOTIFICATION_LIST_REQUEST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_OPEN_ALL_FAIL,
  NOTIFICATION_OPEN_ALL_REQUEST,
  NOTIFICATION_OPEN_ALL_SUCCESS,
  NOTIFICATION_OPEN_FAIL,
  NOTIFICATION_OPEN_REQUEST,
  NOTIFICATION_OPEN_SUCCESS,
} from "../constants/notificationConstants";
import { IAction } from "../types";

export const notificationListReducer = (
  state = { notifications: [] },
  { type, payload }: IAction
) => {
  switch (type) {
    case NOTIFICATION_LIST_REQUEST:
      return { ...state, loading: true, success: false };

    case NOTIFICATION_LIST_SUCCESS:
      return { ...state, loading: false, success: true, notifications: payload };

    case NOTIFICATION_LIST_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const notificationOpenReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case NOTIFICATION_OPEN_REQUEST:
      return { loading: true, success: false };

    case NOTIFICATION_OPEN_SUCCESS:
      return { loading: false, success: true };

    case NOTIFICATION_OPEN_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const notificationOpenAllReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case NOTIFICATION_OPEN_ALL_REQUEST:
      return { loading: true, success: false };

    case NOTIFICATION_OPEN_ALL_SUCCESS:
      return { loading: false, success: true };

    case NOTIFICATION_OPEN_ALL_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const notificationLatestReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case NOTIFICATION_LATEST_REQUEST:
      return { loading: true, success: false };

    case NOTIFICATION_LATEST_SUCCESS:
      return { loading: false, success: true, notification: payload };

    case NOTIFICATION_LATEST_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};
