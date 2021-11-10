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
  USER_CHECK_CODE_REQUEST,
  USER_CHECK_CODE_SUCCESS,
  USER_CHECK_CODE_FAIL
} from '../constants/userConstants';

export const register = (name, nameAr, email, password, type, location) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { data } = await api.regiserUser({ name, nameAr, email, password, type, location });

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

    showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    );
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

    showToast('Disccount updated successfully', 'success');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    );
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

    showToast('User status changed', 'info');
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    );
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

    showToast('Code is vaild', 'success');
  } catch (error) {
    dispatch({
      type: USER_CHECK_CODE_FAIL,
      payload:
        error.response && error.response.data.error ? error.response.data.error : error.message
    });

    showToast(
      error.response && error.response.data.error ? error.response.data.error : error.message,
      'error'
    );
  }
};

const showToast = (text, severity) => {
  toast[severity](text);
};
