/**
 * Created by Administrator on 2017-11-14.
 */
import * as actions from './actions';
import { take, put, select } from 'redux-saga/effects';

function* startOrStopLoading() {
  yield* take(actions.START_LOADING);
  const store = yield select();
  console.log(store);
  yield delay(1000);
  yield put({ type: actions.STOP_LOADING })
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default startOrStopLoading;
