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
    isLoginError: boolean;
    isRegisterError: boolean;
    isError: boolean;
    isRegisterSuccess: boolean;
    isSuccess: boolean;
    accountCreated: boolean;
    user: any;
    isActivationSuccess: boolean,
    isActivationError: boolean
}

const initialState: UserReducerProps = {
    isLogged: getToken(),
    token: getToken(),
    username: getUsername(),
    accountCreated: false,
    isLoginError: false,
    isRegisterError: false,
    isError: false,
    isRegisterSuccess: false,
    isSuccess: false,
    user: null,
    isActivationSuccess: false,
    isActivationError: false
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
                isLoginError: true
            };
        case login.LOGIN_REQUEST:
            return {
                ...state,
                isLogged: false,
                token: null,
                username: null,
                isLoginError: false
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
                isLoginError: false
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
                isLoginError: false
            };
        case register.REGISTER_FAILED:
            return {
                ...state,
                accountCreated: false,
                isRegisterSuccess: false,
                isRegisterError: true
            };
        case register.REGISTER_REQUEST:
            return {
                ...state,
                accountCreated: false,
                isRegisterSuccess: false,
                isRegisterError: false
            };
        case register.REGISTER_SUCCESS:
            return {
                ...state,
                accountCreated: true,
                isRegisterSuccess: true,
                isRegisterError: false
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
        case user.USER_ACTIVATE_FAILED:
            return {
                ...state,
                isActivationError: true,
                isActivationSuccess: false,
            };
        case user.USER_ACTIVATE_REQUEST:
            return {
                ...state,
                isActivationError: false,
                isActivationSuccess: false,
            };
        case user.USER_ACTIVATE_SUCCESS:
            return {
                ...state,
                isActivationError: false,
                isActivationSuccess: true,
            };
        default:
            return state;
    }
};
