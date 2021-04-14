import axios from "axios";
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
import { emitNotification } from "../service/socket";

export const getNotifications = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: NOTIFICATION_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/notifications`, config);

    dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const openNotification = (notificationId: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: NOTIFICATION_OPEN_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/notifications/${notificationId}/markAsOpened`, config);

    dispatch({ type: NOTIFICATION_OPEN_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_OPEN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const openAllNotifications = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: NOTIFICATION_OPEN_ALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/notifications/markAsOpened`, { userInfo }, config);

    dispatch({ type: NOTIFICATION_OPEN_ALL_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_OPEN_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUnreadNotifications = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: NOTIFICATION_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        unreadOnly: true,
      },
    };

    const { data } = await axios.get(`/api/notifications`, config);

    dispatch({ type: NOTIFICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLatestNotification = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: NOTIFICATION_LATEST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/notifications/latest`, config);

    emitNotification(data.userFrom._id, userInfo._id);

    dispatch({ type: NOTIFICATION_LATEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_LATEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
