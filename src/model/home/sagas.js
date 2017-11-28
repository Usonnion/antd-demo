import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchReservationData } from '../../service/api';
import { notification } from 'antd';
import { List } from 'immutable';

export const watchFetchReservation = function*() {
  yield takeEvery('home/fetchReservation', fetchReservation)
}

function* fetchReservation(action) {
  const reservationList = yield select(x => x.get('home').get('reservationList'));
  yield put({ type: 'home/changeReservationLoading', payload: true });
  const response = yield call(fetchReservationData, action.payload);
  const allReservationList = List(response);
  const newReservationList = allReservationList.filter(newItem => reservationList.filter(item => item.id === newItem.id).size === 0);
  newReservationList.forEach(item => {
    notification.open({
      message: '预约提醒',
      description: item.description,
    });
  })
  yield put({ type: 'home/fetchReservationSuccess', payload: allReservationList });
  yield put({ type: 'home/changeReservationLoading', payload: false });
}
