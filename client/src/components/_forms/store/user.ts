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

export function getUser() {
    return {
        type: USER_REQUEST
    }
};

export function changePassword(data?: any) {
    return {
        payload: data,
        type: USER_CHANGE_PASSWORD_REQUEST
    }
};

export function resetPassword(data?: any) {
    return {
        payload: data,
        type: USER_RESET_PASSWORD_REQUEST
    }
};

export function applyResetPassword(data: any, additional?: any) {
    return {
        payload: {...data, ...additional},
        type: USER_APPLY_RESET_PASSWORD_REQUEST
    }
};