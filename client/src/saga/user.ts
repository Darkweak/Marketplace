import {
    USER_CHANGE_PASSWORD_FAILED,
    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAILED,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_APPLY_RESET_PASSWORD_FAILED,
    USER_APPLY_RESET_PASSWORD_REQUEST,
    USER_APPLY_RESET_PASSWORD_SUCCESS,
    USER_FAILED,
    USER_REQUEST,
    USER_SUCCESS, USER_ACTIVATE_REQUEST, USER_ACTIVATE_FAILED, USER_ACTIVATE_SUCCESS
} from '../components/_forms/store/user';
import { commonRequest } from './common';

export const handleUser = (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case USER_REQUEST:
            return commonRequest({
                callback: {
                    error: USER_FAILED,
                    success: USER_SUCCESS
                },
                dispatch,
                path: `/me`,
                method: 'GET'
            });
        case USER_CHANGE_PASSWORD_REQUEST:
            return commonRequest({
                body: payload,
                callback: {
                    error: USER_CHANGE_PASSWORD_FAILED,
                    success: USER_CHANGE_PASSWORD_SUCCESS
                },
                dispatch,
                path: `/change-password`,
                method: 'POST'
            });
        case USER_RESET_PASSWORD_REQUEST:
            return commonRequest({
                body: payload,
                callback: {
                    error: USER_RESET_PASSWORD_FAILED,
                    success: USER_RESET_PASSWORD_SUCCESS
                },
                dispatch,
                path: `/reset-password/request`,
                method: 'POST'
            });
        case USER_APPLY_RESET_PASSWORD_REQUEST:
            return commonRequest({
                body: payload,
                callback: {
                    error: USER_APPLY_RESET_PASSWORD_FAILED,
                    success: USER_APPLY_RESET_PASSWORD_SUCCESS
                },
                dispatch,
                path: `/reset-password/apply`,
                method: 'POST'
            });
        case USER_ACTIVATE_REQUEST:
            return commonRequest({
                body: payload,
                callback: {
                    error: USER_ACTIVATE_FAILED,
                    success: USER_ACTIVATE_SUCCESS
                },
                dispatch,
                path: `/activate`,
                method: 'POST'
            });
        default:
            break;
    }
}

