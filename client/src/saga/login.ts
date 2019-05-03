import { all, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../components/_forms/store/login';
import { commonRequest } from './common';

function* handleLogin(action: any) {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_REQUEST:
      return yield commonRequest({
        body: payload,
        callback: {
          error: LOGIN_FAILED,
          success: LOGIN_SUCCESS
        },
        path: `/login`,
        method: 'POST'
      });
    default:
      break;
  }
}

export default function* watchLoginActions() {
  yield all([takeEvery(LOGIN_REQUEST, handleLogin)]);
}
