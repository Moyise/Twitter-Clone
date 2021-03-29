import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_FOLLOW_FAIL,
  USER_FOLLOW_REQUEST,
  USER_FOLLOW_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import { IAction } from "../types";

export const userLoginReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const userFollowReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case USER_FOLLOW_REQUEST:
      return { loading: true, success: false };

    case USER_FOLLOW_SUCCESS:
      return { loading: false, success: true };

    case USER_FOLLOW_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const userProfileUpdateReducer = (state = {}, { type, payload }: IAction) => {
  switch (type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_PROFILE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
