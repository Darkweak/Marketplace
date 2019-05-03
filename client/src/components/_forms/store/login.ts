export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(data?: any) {
    return {
        payload: data,
        type: LOGIN_REQUEST
    }
};

export function logout() {
    return {
        type: LOGOUT
    }
};
