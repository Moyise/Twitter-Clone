import axios from "axios";
import {
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
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
  POSTS_USER_REQUEST,
  POSTS_USER_SUCCESS,
  POSTS_USER_FAIL,
  POST_PIN_REQUEST,
  POST_PIN_SUCCESS,
  POST_PIN_FAIL,
} from "../constants/postConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";

export const listPosts = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts`, config);

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllPosts = (keyword: string = "") => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/search?keyword=${keyword}`, config);

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (content: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/posts`, { content }, config);

    dispatch({ type: POST_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (postId: string, user: object) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/posts/${postId}/like`, { user }, config);

    dispatch({ type: POST_LIKE_SUCCESS });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const retweetPost = (postId: string, user: object) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_RETWEET_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/posts/${postId}/retweet`, { user }, config);

    dispatch({ type: POST_RETWEET_SUCCESS });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_RETWEET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const replyToPost = (postId: string, content: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: POST_REPLY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/posts/${postId}/reply`, { content }, config);
    dispatch({ type: POST_REPLY_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_REPLY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsPost = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userPosts = (id: string) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: POSTS_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts/profile/${id}`, config);

    dispatch({
      type: POSTS_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const pinPost = (id: string, post: object) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: POST_PIN_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/posts/profile/${id}`, { post }, config);

    dispatch({ type: POST_PIN_SUCCESS });
    //dispatch({ type: POST_PIN_RESET });
  } catch (error) {
    dispatch({
      type: POST_PIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
