import axios from "axios";
import {
  CHAT_CREATE_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
} from "../constants/chatConstants";

export const createChat = (users: object[]) => async (dispatch: any, getState: any) => {
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

    const { data } = await axios.post(`/api/chats`, { users }, config);

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
