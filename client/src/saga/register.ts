import { all, takeEvery } from 'redux-saga/effects';
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../components/_forms/store/register';
import { commonRequest } from './common';

function* handleRegister(action: any) {
  const {type, payload} = action;
  switch (type) {
    case REGISTER_REQUEST:
      return yield commonRequest({
        body: payload,
        callback: {
          error: REGISTER_FAILED,
          success: REGISTER_SUCCESS
        },
        path: `/users`,
        method: 'POST'
      });
    default:
      break;
  }
}

export default function* watchRegisterActions() {
  yield all([takeEvery(REGISTER_REQUEST, handleRegister)]);
}
