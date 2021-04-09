import axios from "axios";
import {
  MESSAGE_CREATE_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
} from "../constants/messageConstants";

export const createMessage = (content: string, chatId: string) => async (
  dispatch: any,
  getState: any
) => {
  try {
    dispatch({ type: MESSAGE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/messages`, { content, chatId }, config);

    dispatch({ type: MESSAGE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
