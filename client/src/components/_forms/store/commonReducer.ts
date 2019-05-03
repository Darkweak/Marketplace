import * as login from './login';
import { Reducer } from "redux";

const initialState = {
  isLoading: false
};

export const CommonReducer: Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case login.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case login.LOGIN_FAILED:
    case login.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
