import {takeEvery, fork } from 'redux-saga/effects';
import loginSagas from './model/login/sagas';
import { watchFetchReservation } from './model/home/sagas';
import { watchFetchCustomer } from './model/customer/sagas';
import { watchFetchProduct } from './model/product/sagas';

function* watchAndLog() {
  // eslint-disable-next-line
  yield takeEvery('*', function* logger(action) {
    console.log('action', action)
  })
}

export default function* rootSaga() {
  yield fork(watchAndLog);
  yield fork(loginSagas);
  yield fork(watchFetchReservation);
  yield fork(watchFetchCustomer);
  yield fork(watchFetchProduct);
}
