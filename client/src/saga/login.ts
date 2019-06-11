import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from '../components/_forms/store/login';
import { commonRequest } from './common';

export function handleLogin(action: any) {
  const {dispatch, type, payload} = action;
  switch (type) {
    case LOGIN_REQUEST:
      return commonRequest({
        body: payload,
        callback: {
          error: LOGIN_FAILED,
          success: LOGIN_SUCCESS
        },
        dispatch,
        path: `/login`,
        method: 'POST'
      });
    default:
      break;
  }
}
