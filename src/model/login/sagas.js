import {takeEvery, call, put } from 'redux-saga/effects';
import { accountLogin } from '../../service/api';
import { push } from 'react-router-redux';

export default function* watchAccountSubmit() {
  yield takeEvery('login/accountSubmit', accountSubmit)
}

function* accountSubmit(action) {
  yield put({ type: 'login/changeSubmitting', payload: true });
  yield call(accountLogin, action.payload);
  yield put({ type: 'login/changeSubmitting', payload: false });
  yield put(push('/home'));
}
