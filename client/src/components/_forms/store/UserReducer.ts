import * as login from './login';
import * as register from './register';
import * as user from './user';
import { Reducer } from 'redux';
import {
    deleteToken,
    getDecodedToken,
    getToken,
    getUsername,
    resetCart,
    setCartFromToken,
    setToken
} from '../../../helpers';

export interface UserReducerProps {
    isLogged: boolean;
    token: string;
    username: string;
    isError: boolean;
    isSuccess: boolean;
    accountCreated: boolean;
    user: any;
}

const initialState: UserReducerProps = {
    isLogged: getToken(),
    token: getToken(),
    username: getUsername(),
    accountCreated: false,
    isError: false,
    isSuccess: false,
    user: null
};
export const UserReducer: Reducer = (state: UserReducerProps = initialState, action: any) => {
    const {payload, type} = action;
    switch (type) {
        case login.LOGIN_FAILED:
            return {
                ...state,
                isLogged: false,
                token: null,
                username: null,
                isError: true
            };
        case login.LOGIN_REQUEST:
            return {
                ...state,
                isLogged: false,
                token: null,
                username: null,
                isError: false
            };
        case login.LOGIN_SUCCESS:
            setToken(payload.token);
            setCartFromToken(getDecodedToken().cart);
            window.location.pathname = '/';
            return {
                ...state,
                isLogged: true,
                token: getToken(),
                username: getUsername(),
                isError: false
            };
        case login.LOGOUT:
            deleteToken();
            resetCart();
            window.location.pathname = '/';
            return {
                ...state,
                isLogged: false,
                token: null,
                username: null,
                isError: false
            };
        case register.REGISTER_FAILED:
            return {
                ...state,
                accountCreated: false,
                isError: true
            };
        case register.REGISTER_REQUEST:
            return {
                ...state,
                accountCreated: false,
                isError: false
            };
        case register.REGISTER_SUCCESS:
            return {
                ...state,
                accountCreated: true,
                isError: false
            };
        case user.USER_FAILED:
            return {
                ...state,
                user: null,
                isError: true
            };
        case user.USER_REQUEST:
            return {
                ...state,
                user: null,
                isError: false
            };
        case user.USER_SUCCESS:
            return {
                ...state,
                user: payload,
                isError: false
            };
        case user.USER_RESET_PASSWORD_FAILED:
            return {
                ...state,
                user: null,
                isError: true,
                isSuccess: false
            };
        case user.USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                user: null,
                isError: false,
                isSuccess: false
            };
        case user.USER_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                user: null,
                isError: false,
                isSuccess: true
            };
        case user.USER_APPLY_RESET_PASSWORD_FAILED:
            return {
                ...state,
                user: null,
                isError: true,
                isSuccess: false
            };
        case user.USER_APPLY_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                user: null,
                isError: false,
                isSuccess: false
            };
        case user.USER_APPLY_RESET_PASSWORD_SUCCESS:
            window.location.pathname = '/';
            return {
                ...state,
                user: null,
                isError: false,
                isSuccess: true
            };
        default:
            return state;
    }
};
