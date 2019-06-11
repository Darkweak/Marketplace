import * as login from './login';
import * as register from './register';
import * as user from './user';
import { Reducer } from 'redux';

export interface CommonReducerProps {
    isLoading: boolean;
}

const initialState: CommonReducerProps = {
    isLoading: false
};
export const CommonReducer: Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case login.LOGIN_REQUEST:
        case register.REGISTER_REQUEST:
        case user.USER_CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case login.LOGIN_FAILED:
        case login.LOGIN_SUCCESS:
        case register.REGISTER_FAILED:
        case register.REGISTER_SUCCESS:
        case user.USER_CHANGE_PASSWORD_FAILED:
        case user.USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
