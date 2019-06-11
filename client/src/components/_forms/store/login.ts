import { handleLogin } from '../../../saga/login';

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (data?: any) => async (dispatch: any) => dispatch({ type: LOGIN_REQUEST }) && handleLogin({
        dispatch,
        payload: data,
        type: LOGIN_REQUEST
    });

export const logout = () => async (dispatch: any) => dispatch({
    type: LOGOUT
});
