import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../components/_forms/store/register';
import { commonRequest } from './common';

export function handleRegister(action: any) {
  const {dispatch, type, payload} = action;
  switch (type) {
    case REGISTER_REQUEST:
      return commonRequest({
        body: payload,
        callback: {
          error: REGISTER_FAILED,
          success: REGISTER_SUCCESS
        },
        dispatch,
        path: `/users`,
        method: 'POST'
      });
    default:
      break;
  }
}
