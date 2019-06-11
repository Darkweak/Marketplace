import { handleProduct } from '../../../saga/product';

export const PRODUCT_FETCH_FAILED = 'PRODUCT_FETCH_FAILED';
export const PRODUCT_FETCH_REQUEST = 'PRODUCT_FETCH_REQUEST';
export const PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS';

export const getProduct = (data: any) => async (dispatch: any) => handleProduct({
    dispatch,
    type: PRODUCT_FETCH_REQUEST,
    payload: data
});
