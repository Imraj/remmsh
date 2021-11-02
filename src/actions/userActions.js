import axios from 'axios';
import * as api from '../api';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/userConstants';

export const register = (name, email, password, type) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { data } = await api.regiserUser({ name, email, password, type });

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
