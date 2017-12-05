import { takeEvery, call, put, select } from 'redux-saga/effects';
import { fetchReservationNoticeData } from '../../service/api';
import { notification } from 'antd';
import { List } from 'immutable';

export const watchFetchReservationNotice = function*() {
  yield takeEvery('home/fetchReservation', fetchReservation)
}

function* fetchReservation(action) {
  const reservationList = yield select(x => x.get('home').get('reservationList'));
  yield put({ type: 'home/changeReservationLoading', payload: true });
  const response = yield call(fetchReservationNoticeData, action.payload);
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

export const watchDealReservation = function*() {
  yield takeEvery('home/dealReservation', dealReservation);
}

function* dealReservation(action) {
  yield put({ type: 'home/DealReservationModalVisible', payload: true });
  yield put({
    type: 'home/setDealReservation', payload: {
      no: '12452122',
      productTitle: '推拿',
      customerName: '王友生',
      customerPhone: '18801615551',
      customerWechat: '2563',
      date: '2017-5-8: 8:30'
    }
  });
}
