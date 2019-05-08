import * as navbar from './navbar';
import { Reducer } from 'redux';

export interface NavbarReducerProps {
    position: number;
}

const initialState: NavbarReducerProps = {
    position: 0,
};
export const NavbarReducer: Reducer = (state: NavbarReducerProps = initialState, action: any) => {
    const {payload, type} = action;
    switch (type) {
        case navbar.UPDATE_NAVBAR_POSITION:
            return {
                ...state,
                position: payload
            }
        default:
            return state;
    }
};
