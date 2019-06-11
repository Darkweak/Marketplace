import { handleUser } from '../../../saga/user';

export const USER_CHANGE_PASSWORD_FAILED = 'USER_CHANGE_PASSWORD_FAILED';
export const USER_CHANGE_PASSWORD_REQUEST = 'USER_CHANGE_PASSWORD_REQUEST';
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
export const USER_RESET_PASSWORD_FAILED = 'USER_RESET_PASSWORD_FAILED';
export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_SUCCESS = 'USER_RESET_PASSWORD_SUCCESS';
export const USER_APPLY_RESET_PASSWORD_FAILED = 'USER_APPLY_RESET_PASSWORD_FAILED';
export const USER_APPLY_RESET_PASSWORD_REQUEST = 'USER_APPLY_RESET_PASSWORD_REQUEST';
export const USER_APPLY_RESET_PASSWORD_SUCCESS = 'USER_APPLY_RESET_PASSWORD_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ACTIVATE_FAILED = 'USER_ACTIVATE_FAILED';
export const USER_ACTIVATE_REQUEST = 'USER_ACTIVATE_REQUEST';
export const USER_ACTIVATE_SUCCESS = 'USER_ACTIVATE_SUCCESS';

export const getUser = () => async (dispatch: any) => handleUser({
    dispatch,
    type: USER_REQUEST
});

export const changePassword = (data?: any) => async (dispatch: any) => dispatch({ type: USER_CHANGE_PASSWORD_REQUEST }) && handleUser({
    dispatch,
    payload: data,
    type: USER_CHANGE_PASSWORD_REQUEST
});

export const resetPassword = (data?: any) => async (dispatch: any) => handleUser({
    dispatch,
    payload: data,
    type: USER_RESET_PASSWORD_REQUEST
});

export const applyResetPassword = (data: any, additional?: any) => async (dispatch: any) => handleUser({
    dispatch,
    payload: {...data, ...additional},
    type: USER_APPLY_RESET_PASSWORD_REQUEST
});

export const  activateUser = (payload: any) => async (dispatch: any) => handleUser({
    dispatch,
    type: USER_ACTIVATE_REQUEST,
    payload
});
