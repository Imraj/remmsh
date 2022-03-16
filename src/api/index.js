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

export const regiserUser = (formData) =>
  API.post('/users/register', formData, { headers: { 'Content-Type': `multipart/form-data` } });
export const loginUser = (userInfo) => API.post('/users/login', userInfo);
export const userDetails = (id) => API.get(`/users/${id}`);

export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const updateUserDisccount = (id, data) => API.patch(`/users/${id}/discount`, data);
export const updateUserActive = (id) => API.patch(`/users/${id}/activate`);
export const userCheckcode = (codeData) => API.post(`/users/checkcode`, codeData);

export const createPlan = (planData) => API.post(`/public-figures`, planData);
export const deletePlan = (id) => API.delete(`/public-figures/${id}`);
export const getPlans = (id) => API.get(`/public-figures`);
export const updatePlanDiscount = (id, planData) =>
  API.patch(`/public-figures/${id}/discount`, { discount: planData });
export const updatePlanExpirationDate = (id, planData) =>
  API.patch(`/public-figures/${id}/expirationdate`, { discountExpireAt: planData });
export const updatePlanActivate = (id) => API.patch(`/public-figures/${id}/activate`);

export const getRestaurants = () => API.get(`/restaurants`);
export const searchRestaurants = (query) => API.get(`/restaurants/search`, query);

export const adminGetRestaurants = () => API.get(`/restaurants/all`);
export const adminEditRestaurant = (id) => API.get(`/restaurants/${id}`);
export const adminUpdateRestaurant = (id, rdata) => API.patch(`/restaurants/${id}`, rdata);
export const adminUpdateRestaurantStatus = (id) => API.patch(`/restaurants/${id}/status`);
export const adminDeleteRestaurant = (id) => API.delete(`/restaurants/${id}`);
