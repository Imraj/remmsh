import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserDisccountReducer,
  updateUserActiveReducer,
  userCheckCodeReducer,
  createPlanReducer,
  getPlansReducer,
  updatePlanReducer,
  getRestaurantsReducer
} from './reducers/userReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserDisccount: updateUserDisccountReducer,
  updateUserActive: updateUserActiveReducer,
  userCheckCode: userCheckCodeReducer,
  createPlan: createPlanReducer,
  getPlans: getPlansReducer,
  updatePlan: updatePlanReducer,
  getRestaurants: getRestaurantsReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getPlans: [],
  getRestaurants: []
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
