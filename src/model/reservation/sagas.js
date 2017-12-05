import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchCustomerData } from '../../service/api';
import { List } from 'immutable';

export const watchFetchReservation = function*() {
  yield takeEvery('reservation/fetchReservation', searchReservation);
}

function* searchReservation(action) {
  yield put({ type:'reservation/changeReservationLoading', payload: true });
  yield call(fetchCustomerData, action.payload);
  yield put({ type:'reservation/changeReservationLoading', payload: false });
}
