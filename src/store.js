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
  adminGetRestaurantsReducer,
  adminEditRestaurantReducer,
  adminUpdateRestaurantReducer,
  adminUpdateRestaurantStatusReducer,
  adminDeleteRestaurantReducer,
  userSearchReducer
} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userSearch: userSearchReducer,
  updateUserDisccount: updateUserDisccountReducer,
  updateUserActive: updateUserActiveReducer,
  userCheckCode: userCheckCodeReducer,
  createPlan: createPlanReducer,
  deletePlan: deletePlanReducer,
  getPlans: getPlansReducer,
  updatePlan: updatePlanReducer,
  getRestaurants: getRestaurantsReducer,
  adminGetRestaurants: adminGetRestaurantsReducer,
  adminEditRestaurant: adminEditRestaurantReducer,
  adminUpdateRestaurant: adminUpdateRestaurantReducer,
  adminUpdateRestaurantStatus: adminUpdateRestaurantStatusReducer,
  adminDeleteRestaurant: adminDeleteRestaurantReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getRestaurants: []
  // getPlans: ['hello', 'world'],
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
