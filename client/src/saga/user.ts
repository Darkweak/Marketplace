import { all, takeEvery } from 'redux-saga/effects';
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
    USER_SUCCESS
} from '../components/_forms/store/user';
import { commonRequest } from './common';

function* handleUser(action: any) {
    const {payload, type} = action;
    switch (type) {
        case USER_REQUEST:
            return yield commonRequest({
                callback: {
                    error: USER_FAILED,
                    success: USER_SUCCESS
                },
                path: `/me`,
                method: 'GET'
            });
        case USER_CHANGE_PASSWORD_REQUEST:
            return yield commonRequest({
                body: payload,
                callback: {
                    error: USER_CHANGE_PASSWORD_FAILED,
                    success: USER_CHANGE_PASSWORD_SUCCESS
                },
                path: `/change-password`,
                method: 'POST'
            });
        case USER_RESET_PASSWORD_REQUEST:
            return yield commonRequest({
                body: payload,
                callback: {
                    error: USER_RESET_PASSWORD_FAILED,
                    success: USER_RESET_PASSWORD_SUCCESS
                },
                path: `/reset-password/request`,
                method: 'POST'
            });
        case USER_APPLY_RESET_PASSWORD_REQUEST:
            return yield commonRequest({
                body: payload,
                callback: {
                    error: USER_APPLY_RESET_PASSWORD_FAILED,
                    success: USER_APPLY_RESET_PASSWORD_SUCCESS
                },
                path: `/reset-password/apply`,
                method: 'POST'
            });
        default:
            break;
    }
}

export default function* watchUserActions() {
    yield all([ takeEvery(USER_REQUEST, handleUser) ]);
    yield all([ takeEvery(USER_CHANGE_PASSWORD_REQUEST, handleUser) ]);
    yield all([ takeEvery(USER_RESET_PASSWORD_REQUEST, handleUser) ]);
    yield all([ takeEvery(USER_APPLY_RESET_PASSWORD_REQUEST, handleUser) ]);
}
