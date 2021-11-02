import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export const regiserUser = (userInfo) => API.post('/users/register', userInfo);
export const loginUser = (userInfo) => API.post('/users/login', userInfo);
export const userDetails = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const updateUserDisccount = (id, data) => API.patch(`/users/${id}/discount`, data);
export const updateUserActive = (id) => API.patch(`/users/${id}/activate`);
