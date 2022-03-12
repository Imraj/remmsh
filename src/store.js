import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserDisccountReducer,
  updateUserExpirationDateReducer,
  updateUserActiveReducer,
  userCheckCodeReducer,
  createPlanReducer,
  deletePlanReducer,
  getPlansReducer,
  updatePlanReducer,
  getRestaurantsReducer,
  adminEditRestaurantReducer,
  adminUpdateRestaurantReducer,
  adminUpdateRestaurantStatusReducer,
  adminDeleteRestaurantReducer
} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserDisccount: updateUserDisccountReducer,
  updateUserActive: updateUserActiveReducer,
  userCheckCode: userCheckCodeReducer,
  createPlan: createPlanReducer,
  deletePlan: deletePlanReducer,
  getPlans: getPlansReducer,
  updatePlan: updatePlanReducer,
  getRestaurants: getRestaurantsReducer,
  adminEditRestaurant: adminEditRestaurantReducer,
  adminUpdateRestaurant: adminUpdateRestaurantReducer,
  adminUpdateRestaurantStatus: adminUpdateRestaurantStatusReducer,
  adminDeleteRestaurant: adminDeleteRestaurantReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// 0816 772 7692
const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
  // getPlans: ['hello', 'world'],
  // getRestaurants: []
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
