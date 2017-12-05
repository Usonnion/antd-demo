import { takeEvery, put } from 'redux-saga/effects';

export function* watchProductSelectProductSuccess() {
  yield takeEvery('order/SelectProductSuccess', selectProductSuccess);
}

function* selectProductSuccess(action) {
  yield put({ type: 'order/setEditOrderProductList', payload: action.payload });
  yield put({ type: 'home/ProductSelectorModalVisible', payload: false, completionAction: null });
}

export function* watchCustomerSelectProductSuccess() {
  yield takeEvery('order/SelectCustomerSuccess', selectCustomerSuccess);
}

function* selectCustomerSuccess(action) {
  if (action.payload && action.payload.length && action.payload.length > 0) {
    yield put({ type: 'order/setEditOrderCustomerInfo', payload: action.payload[0] });
  }
  yield put({ type: 'home/CustomerSelectorModalVisible', payload: false, completionAction: null });
}

export function* watchCustomerSelectReservationSuccess() {
  yield takeEvery('order/SelectReservationSuccess', selectReservationSuccess);
}

function* selectReservationSuccess(action) {
  if (action.payload && action.payload.length && action.payload.length > 0) {
    yield put({ type: 'order/setEditOrderReservation', payload: action.payload[0] });
  }
  yield put({ type: 'home/ReservationSelectorModalVisible', payload: false, completionAction: null });
}
