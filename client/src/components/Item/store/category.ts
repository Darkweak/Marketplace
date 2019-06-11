import { handleCategory } from '../../../saga/category';

export const CATEGORY_FETCH_FAILED = 'CATEGORY_FETCH_FAILED';
export const CATEGORY_FETCH_REQUEST = 'CATEGORY_FETCH_REQUEST';
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_FETCH_SUCCESS';

export const getCategory = (data?: any) => async (dispatch: any) => handleCategory({
    dispatch,
    payload: data || '',
    type: CATEGORY_FETCH_REQUEST
});
