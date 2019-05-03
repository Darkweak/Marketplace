import { all, takeEvery } from 'redux-saga/effects';
import {
    CATEGORY_FETCH_FAILED,
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS
} from '../components/Item/store/category';
import { commonRequest } from './common';

function* handleCategory(action: any) {
  const {payload, type} = action;
  switch (type) {
    case CATEGORY_FETCH_REQUEST:
      return yield commonRequest({
        callback: {
          error: CATEGORY_FETCH_FAILED,
          success: CATEGORY_FETCH_SUCCESS
        },
        path: `/categories${payload}`,
        method: 'GET'
      });
    default:
      break;
  }
}

export default function* watchCategoryActions() {
  yield all([takeEvery(CATEGORY_FETCH_REQUEST, handleCategory)]);
}
