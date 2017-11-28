import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchProductData } from '../../service/api';
import { List } from 'immutable';

export function* watchFetchProduct() {
  yield takeEvery('product/fetchProduct', fetchProduct)
}

function* fetchProduct(action) {
  yield put({ type: 'product/changeProductLoading', payload: true });
  const response = yield call(fetchProductData, action.payload);
  yield put({ type:'product/fetchProductSuccess', payload: List(response.data) })
  yield put({ type: 'product/changeProductLoading', payload: false });
}

export function* watchDeleteProduct() {
  yield takeEvery('product/deleteProduct', deleteProduct);
}

function* deleteProduct(action) {
}
