import login from './model/login/reducer';
import home from './model/home/reducer';
import customer from './model/customer/reducer';
import product from './model/product/reducer';
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutablejs'
import { routerReducer } from 'react-router-redux'

const rootCombinedReducer = combineReducers(
  Map({
    home,
    login,
    customer,
    product,
    router: routerReducer
  })
);

export default rootCombinedReducer;
