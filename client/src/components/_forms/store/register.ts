import { handleRegister } from '../../../saga/register';

export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const register = (data: any) => async (dispatch: any) => dispatch({ type: REGISTER_REQUEST }) && handleRegister({
    dispatch,
    payload: data,
    type: REGISTER_REQUEST
});
