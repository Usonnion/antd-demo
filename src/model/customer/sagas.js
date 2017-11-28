import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchCustomerData } from '../../service/api';
import { List } from 'immutable';

export const watchFetchCustomer = function*() {
  yield takeEvery('customer/fetchCustomer', fetchCustomer)
}

function* fetchCustomer(action) {
  yield put({ type: 'customer/changeCustomerLoading', payload: true });
  const response = yield call(fetchCustomerData, action.payload);
  yield  put({ type: 'customer/fetchCustomerSuccess', payload: List(response.data), current: response.current, total: response.total })
  yield put({ type: 'customer/changeCustomerLoading', payload: false });
}
