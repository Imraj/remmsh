import axios from 'axios';
import { toast } from 'react-toastify';
import * as api from '../api';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DISCOUNT_REQUEST,
  USER_UPDATE_DISCOUNT_SUCCESS,
  USER_UPDATE_DISCOUNT_FAIL,
  USER_UPDATE_ACTIVE_REQUEST,
  USER_UPDATE_ACTIVE_SUCCESS,
  USER_UPDATE_ACTIVE_FAIL,
  USER_UPDATE_EXPIRATION_DATE_REQUEST,
  USER_UPDATE_EXPIRATION_DATE_SUCCESS,
  USER_UPDATE_EXPIRATION_DATE_FAIL,
  USER_CHECK_CODE_REQUEST,
  USER_CHECK_CODE_SUCCESS,
  USER_CHECK_CODE_FAIL,
  USER_CREATE_PLAN,
  USER_CREATE_PLAN_SUCCESS,
  USER_CREATE_PLAN_FAIL,
  USER_DELETE_PLAN,
  USER_DELETE_PLAN_SUCCESS,
  USER_DELETE_PLAN_FAIL,
  USER_DELETE_PLAN_RESET,
  USER_PLANS_REQUEST,
  USER_PLANS_REQUEST_SUCCESS,
  USER_PLANS_REQUEST_FAIL,
  USER_UPDATE_PLAN_REQUEST,
  USER_UPDATE_PLAN_REQUEST_SUCCESS,
  USER_UPDATE_PLAN_REQUEST_FAIL,
  RESTAURANTS_REQUEST,
  RESTAURANTS_REQUEST_SUCCESS,
  RESTAURANTS_REQUEST_FAIL,
  ADMIN_GET_RESTAURANTS_REQUEST,
  ADMIN_GET_RESTAURANTS_FAIL,
  ADMIN_GET_RESTAURANTS_SUCCESS,
  ADMIN_EDIT_RESTAURANT_REQUEST,
  ADMIN_EDIT_RESTAURANT_FAIL,
  ADMIN_EDIT_RESTAURANT_SUCCESS,
  ADMIN_EDIT_RESTAURANT_RESET,
  ADMIN_UPDATE_RESTAURANT_REQUEST,
  ADMIN_UPDATE_RESTAURANT_SUCCESS,
  ADMIN_UPDATE_RESTAURANT_FAIL,
  ADMIN_UPDATE_RESTAURANT_RESET,
  ADMIN_UPDATE_RESTAURANT_STATUS_REQUEST,
  ADMIN_UPDATE_RESTAURANT_STATUS_SUCCESS,
  ADMIN_UPDATE_RESTAURANT_STATUS_FAIL,
  ADMIN_UPDATE_RESTAURANT_STATUS_RESET,
  ADMIN_DELETE_RESTAURANT_REQUEST,
  ADMIN_DELETE_RESTAURANT_SUCCESS,
  ADMIN_DELETE_RESTAURANT_FAIL,
  ADMIN_DELETE_RESTAURANT_RESET,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL
} from '../constants/userConstants';

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { data } = await api.regiserUser(formData);

    console.log('Reg::userActions::', data, formData);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const { data } = await api.loginUser({ email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    const { token } = JSON.parse(localStorage.getItem('userInfo'));

    localStorage.removeItem('userInfo');

    const axiosInstance = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      timeout: 1000,
      headers: { Authorization: `Bearer ${token}` }
    });

    axiosInstance.post(`/users/logout`);

    dispatch({ type: USER_LOGOUT });

    navigate('/login', { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const { data } = await api.userDetails(id);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const updateUserDisccount = (id, userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_DISCOUNT_REQUEST
    });

    const { data } = await api.updateUserDisccount(id, userData);

    dispatch({
      type: USER_UPDATE_DISCOUNT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const updateUserActive = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_ACTIVE_REQUEST
    });

    const { data } = await api.updateUserActive(id);

    dispatch({
      type: USER_UPDATE_ACTIVE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const userCheckcode = (codeData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CHECK_CODE_REQUEST
    });

    const { data } = await api.userCheckcode(codeData);

    dispatch({
      type: USER_CHECK_CODE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_CHECK_CODE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const addPlan = (planData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_PLAN
    });

    const { data } = await api.createPlan(planData);

    dispatch({
      type: USER_CREATE_PLAN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_PLAN_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const deletePlan = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_PLAN
    });

    const { data } = await api.deletePlan(id);

    dispatch({
      type: USER_DELETE_PLAN_SUCCESS,
      payload: data
    });

    // showToast('plan deleted successfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_DELETE_PLAN_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const getPlans = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PLANS_REQUEST
    });

    const { data } = await api.getPlans(id);
    console.log('userActions::getPlans', data);

    dispatch({
      type: USER_PLANS_REQUEST_SUCCESS,
      payload: data
    });

    // showToast('plan returned successfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_PLANS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const updatePlanDiscount = (uid, pdata) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_DISCOUNT_REQUEST
    });

    const { data } = await api.updatePlanDiscount(uid, pdata);

    dispatch({
      type: USER_UPDATE_DISCOUNT_SUCCESS,
      payload: data
    });

    // showToast('discount updated succesfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const updatePlanExpirationDate = (uid, pdata) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_EXPIRATION_DATE_REQUEST
    });

    const { data } = await api.updatePlanExpirationDate(uid, pdata.toString());

    dispatch({
      type: USER_UPDATE_EXPIRATION_DATE_SUCCESS,
      payload: data
    });
    // showToast('expiration date updated succesfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_EXPIRATION_DATE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const updatePlanActivate = (uid, status) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_ACTIVE_REQUEST
    });

    const { data } = await api.updatePlanActivate(uid, status);

    dispatch({
      type: USER_UPDATE_ACTIVE_SUCCESS,
      payload: data
    });

    // showToast('plan state updated succesfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

export const getRestaurants = () => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANTS_REQUEST
    });

    const { data } = await api.getRestaurants();

    dispatch({
      type: RESTAURANTS_REQUEST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: RESTAURANTS_REQUEST_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    );
  }
};

export const adminGetRestaurants = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_GET_RESTAURANTS_REQUEST
    });

    const { data } = await api.adminGetRestaurants();

    dispatch({
      type: ADMIN_GET_RESTAURANTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_RESTAURANTS_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    /* showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    ); */
  }
};

export const adminEditRestaurant = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_EDIT_RESTAURANT_REQUEST
    });

    const { data } = await api.adminEditRestaurant(id);

    dispatch({
      type: ADMIN_EDIT_RESTAURANT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EDIT_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    /* showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    ); */
  }
};

export const adminUpdateRestaurant = (id, rdata) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_REQUEST
    });

    const { data } = await api.adminUpdateRestaurant(id, rdata);

    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_SUCCESS,
      payload: data
    });

    // showToast('restaurant updated succesfully', 'success');
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    /* showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    ); */
  }
};

export const adminUpdateRestaurantStatus = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_STATUS_REQUEST
    });

    const { data } = await api.adminUpdateRestaurantStatus(id);

    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_STATUS_SUCCESS,
      payload: data
    });

    // showToast('restaurant status updated succesfully', 'success');
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_RESTAURANT_STATUS_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    /* showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    ); */
  }
};

export const adminDeleteRestaurant = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_RESTAURANT_REQUEST
    });

    const { data } = await api.adminDeleteRestaurant(id);

    dispatch({
      type: ADMIN_DELETE_RESTAURANT_SUCCESS,
      payload: data
    });
    // showToast('restaurant deleted succesfully', 'success');
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_RESTAURANT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    /* showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    ); */
  }
};

export const search = (query) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SEARCH_REQUEST
    });

    const { data } = await api.searchRestaurants(query);

    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });
  }
};

const showToast = (text, severity) => {
  toast[severity](text);
};
