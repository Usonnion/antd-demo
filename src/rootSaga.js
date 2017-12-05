import {takeEvery, fork } from 'redux-saga/effects';
import loginSagas from './model/login/sagas';
import {
  watchFetchReservationNotice,
  watchDealReservation
} from './model/home/sagas';
import {
  watchFetchCustomer,
  watchSubmitCustomerInfo,
  watchSubmitRechargeInfo
} from './model/customer/sagas';
import { watchFetchProduct } from './model/product/sagas';
import { watchFetchReservation } from './model/reservation/sagas';
import {
  watchProductSelectProductSuccess,
  watchCustomerSelectProductSuccess,
  watchCustomerSelectReservationSuccess
} from './model/order/sagas';

function* watchAndLog() {
  // eslint-disable-next-line
  yield takeEvery('*', function* logger(action) {
    console.log('action', action)
  })
}

export default function* rootSaga() {
  yield fork(watchAndLog);
  yield fork(loginSagas);
  yield fork(watchFetchReservationNotice);
  yield fork(watchFetchCustomer);
  yield fork(watchFetchProduct);
  yield fork(watchFetchReservation);
  yield fork(watchSubmitCustomerInfo);
  yield fork(watchSubmitRechargeInfo);
  yield fork(watchDealReservation);
  yield fork(watchProductSelectProductSuccess);
  yield fork(watchCustomerSelectProductSuccess);
  yield fork(watchCustomerSelectReservationSuccess);
}
