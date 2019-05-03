import * as login from './login';
import * as register from './register';
import { Reducer } from 'redux';
import { deleteToken, getToken, getUsername, setToken } from '../../../helpers';

export interface UserReducerProps {
  isLogged: boolean;
  token: string;
  username: string;
  isError: boolean;
  accountCreated: boolean;
}

const initialState: UserReducerProps = {
  isLogged: getToken(),
  token: getToken(),
  username: getUsername(),
  accountCreated: false,
  isError: false
};
export const UserReducer: Reducer = (state: UserReducerProps = initialState, action: any) => {
    const { payload, type } = action;
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
            setToken(payload);
            return {
                ...state,
                isLogged: true,
                token: getToken(),
                username: getUsername(),
                isError: false
            };
        case login.LOGOUT:
            deleteToken();
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
        default:
            return state;
  }
};
