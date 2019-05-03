export const PRODUCT_FETCH_FAILED = 'PRODUCT_FETCH_FAILED';
export const PRODUCT_FETCH_REQUEST = 'PRODUCT_FETCH_REQUEST';
export const PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS';

export function getProduct(data: any) {
    return {
        payload: data,
        type: PRODUCT_FETCH_REQUEST
    }
};
