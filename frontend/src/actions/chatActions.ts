import axios from "axios";
import {
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_RESET,
  CHAT_CREATE_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_GROUP_NAME_UPDATE_FAIL,
  CHAT_GROUP_NAME_UPDATE_REQUEST,
  CHAT_GROUP_NAME_UPDATE_RESET,
  CHAT_GROUP_NAME_UPDATE_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_LIST_READ_FAIL,
  CHAT_LIST_READ_REQUEST,
  CHAT_LIST_READ_SUCCESS,
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
} from "../constants/chatConstants";

export const createChat = (users: object[], username: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: CHAT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/chats`, { users, username }, config);

    dispatch({ type: CHAT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGroupChat = (users: object[]) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: CHAT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/chats/group`, { users }, config);

    dispatch({ type: CHAT_CREATE_SUCCESS, payload: data });
    dispatch({ type: CHAT_CREATE_RESET });
  } catch (error) {
    dispatch({
      type: CHAT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChats = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chats`, config);

    dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getChatsById = (chatId: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CHAT_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chats/${chatId}`, config);

    dispatch({ type: CHAT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateGroupName = (chatId: string, groupName: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({
      type: CHAT_GROUP_NAME_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/chats/${chatId}`, { groupName }, config);

    dispatch({
      type: CHAT_GROUP_NAME_UPDATE_SUCCESS,
    });
    dispatch({ type: CHAT_GROUP_NAME_UPDATE_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CHAT_GROUP_NAME_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const unreadChats = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST });
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

    const { data } = await axios.get(`/api/chats`, config);

    dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const markAllMessagesAsRead = (chatId: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: CHAT_LIST_READ_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/chats/${chatId}/messages/markAsRead`, { userInfo }, config);

    dispatch({ type: CHAT_LIST_READ_SUCCESS });
  } catch (error) {
    dispatch({
      type: CHAT_LIST_READ_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
