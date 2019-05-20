import * as snack from './snackbar';
import { Reducer } from 'redux';
import { Snackbar } from '../../Objects/Snackbar';

export interface SnackbarReducerProps {
    snackbars: Snackbar[];
}
export const SnackbarReducer: Reducer = (state: SnackbarReducerProps = { snackbars: [] }, action: any) => {
    const {payload, type} = action;
    let snackbars = state.snackbars;
    switch (type) {
        case snack.ADD_SNACKBAR:
            snackbars = [...snackbars, payload];
            return {
                ...state,
                snackbars
            };
        case snack.REMOVE_SNACKBAR:
            let position = snackbars.findIndex(snackbar => payload.type === snackbar.type && payload.text === payload.text);
            snackbars.splice(position, 1);
            return {
                ...state,
                snackbars: [...snackbars]
            };
        default:
            return state;
    }
};
