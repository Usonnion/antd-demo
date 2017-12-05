import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchCustomerData } from '../../service/api';
import { List } from 'immutable';
import { delay } from '../../utils/utils';

export const watchFetchCustomer = function*() {
  yield takeEvery('customer/fetchCustomer', fetchCustomer)
}

function* fetchCustomer(action) {
  yield put({ type: 'customer/changeCustomerLoading', payload: true });
  const response = yield call(fetchCustomerData, action.payload);
  yield  put({
    type: 'customer/fetchCustomerSuccess',
    payload: List(response.data),
    current: response.current,
    total: response.total
  })
  yield put({ type: 'customer/changeCustomerLoading', payload: false });
}

export const watchSubmitCustomerInfo = function*() {
  yield takeEvery('customer/submitCustomerInfo', submitCustomerInfo);
}

function* submitCustomerInfo(action) {
  yield put({ type: 'customer/changeEditModalLoading', payload: true });
  yield delay(2000);
  yield put({ type: 'customer/changeCustomerInfo', payload: action.payload });
  yield put({ type: 'customer/changeEditModalLoading', payload: false });
  yield put({ type: 'customer/changeVisibleEditModal', payload: false });
}

export const watchSubmitRechargeInfo = function* () {
  yield takeEvery('customer/SubmitRechargeInfo', submitRechargeInfo);
}

function* submitRechargeInfo(action) {
  yield put({ type: 'customer/changeRechargeModalLoading', payload: true });
  yield delay(2000);
  yield put({ type: 'customer/changeRechargeModalLoading', payload: false });
  yield put({ type: 'customer/changeVisibleAccountModal', payload: false });
}
