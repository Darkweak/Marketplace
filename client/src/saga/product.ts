import { all, takeEvery } from 'redux-saga/effects';
import {
    PRODUCT_FETCH_FAILED,
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS
} from '../components/Item/store/product';
import { commonRequest } from './common';

function* handleProduct(action: any) {
  const {payload, type} = action;
  switch (type) {
    case PRODUCT_FETCH_REQUEST:
      return yield commonRequest({
        callback: {
          error: PRODUCT_FETCH_FAILED,
          success: PRODUCT_FETCH_SUCCESS
        },
        path: `/products?${payload}`,
        method: 'GET'
      });
    default:
      break;
  }
}

export default function* watchProductActions() {
  yield all([takeEvery(PRODUCT_FETCH_REQUEST, handleProduct)]);
}
