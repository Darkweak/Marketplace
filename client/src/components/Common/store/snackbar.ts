export const ADD_SNACKBAR = 'ADD_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
export const UPDATE_SNACKBAR = 'UPDATE_SNACKBAR';

export const addSnackbar = (data: any) => ({
    payload: data,
    type: UPDATE_SNACKBAR
});
