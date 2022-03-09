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
  USER_DETAILS_RESET,
  USER_UPDATE_DISCOUNT_REQUEST,
  USER_UPDATE_DISCOUNT_SUCCESS,
  USER_UPDATE_DISCOUNT_FAIL,
  USER_UPDATE_DISCOUNT_RESET,
  USER_UPDATE_ACTIVE_REQUEST,
  USER_UPDATE_ACTIVE_SUCCESS,
  USER_UPDATE_ACTIVE_FAIL,
  USER_UPDATE_ACTIVE_RESET,
  USER_CHECK_CODE_REQUEST,
  USER_CHECK_CODE_SUCCESS,
  USER_CHECK_CODE_FAIL,
  USER_CHECK_CODE_RESET,
  USER_CREATE_PLAN,
  USER_CREATE_PLAN_SUCCESS,
  USER_CREATE_PLAN_FAIL,
  USER_CREATE_PLAN_RESET,
  USER_PLANS_REQUEST,
  USER_PLANS_REQUEST_SUCCESS,
  USER_PLANS_REQUEST_FAIL,
  USER_PLANS_REQUEST_RESET,
  USER_UPDATE_PLAN_REQUEST,
  USER_UPDATE_PLAN_REQUEST_SUCCESS,
  USER_UPDATE_PLAN_REQUEST_FAIL,
  USER_UPDATE_PLAN_REQUEST_RESET,
  RESTAURANTS_REQUEST,
  RESTAURANTS_REQUEST_SUCCESS,
  RESTAURANTS_REQUEST_FAIL,
  RESTAURANTS_REQUEST_RESET
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
    case USER_DETAILS_RESET:
      return {};
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
    case USER_UPDATE_DISCOUNT_RESET:
      return {};
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
    case USER_UPDATE_ACTIVE_RESET:
      return {};
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
    case USER_CHECK_CODE_RESET:
      return {};
    default:
      return state;
  }
};

export const createPlanReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_PLAN:
      return { loading: true };
    case USER_CREATE_PLAN_SUCCESS:
      return { loading: false, success: true, plan: action.payload };
    case USER_CREATE_PLAN_FAIL:
      return { loading: false, error: action.payload };
    case USER_CREATE_PLAN_RESET:
      return {};
    default:
      return state;
  }
};

export const getPlansReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PLANS_REQUEST:
      return { loading: true };
    case USER_PLANS_REQUEST_SUCCESS:
      return { loading: false, success: true, userPlans: action.payload };
    case USER_PLANS_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_PLANS_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const updatePlanReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PLAN_REQUEST:
      return { loading: true };
    case USER_UPDATE_PLAN_REQUEST_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PLAN_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PLAN_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};

export const getRestaurantsReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANTS_REQUEST:
      return { loading: true };
    case RESTAURANTS_REQUEST_SUCCESS:
      return { loading: false, success: true, restaurants: action.payload };
    case RESTAURANTS_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANTS_REQUEST_RESET:
      return {};
    default:
      return state;
  }
};
