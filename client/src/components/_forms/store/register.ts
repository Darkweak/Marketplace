export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const register = (data: any) => ({
    payload: data,
    type: REGISTER_REQUEST
});
