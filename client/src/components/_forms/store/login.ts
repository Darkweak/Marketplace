export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const login = (data?: any) => ({
    payload: data,
    type: LOGIN_REQUEST
});

export const logout = () => ({
    type: LOGOUT
});
