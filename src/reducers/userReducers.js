import {
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DISCOUNT_REQUEST,
  USER_UPDATE_DISCOUNT_SUCCESS,
  USER_UPDATE_DISCOUNT_FAIL,
  USER_UPDATE_ACTIVE_REQUEST,
  USER_UPDATE_ACTIVE_SUCCESS,
  USER_UPDATE_ACTIVE_FAIL,
  USER_CHECK_CODE_REQUEST,
  USER_CHECK_CODE_SUCCESS,
  USER_CHECK_CODE_FAIL
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const updateUserDisccountReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DISCOUNT_REQUEST:
      return { loading: true };
    case USER_UPDATE_DISCOUNT_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_DISCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_ACTIVE_REQUEST:
      return { loading: true };
    case USER_UPDATE_ACTIVE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ACTIVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCheckCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHECK_CODE_REQUEST:
      return { loading: true };
    case USER_CHECK_CODE_SUCCESS:
      return { loading: false, success: true };
    case USER_CHECK_CODE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
