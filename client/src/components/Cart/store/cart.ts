import { handleCart } from '../../../saga/cart';

export const CART_ADD = 'CART_ADD';
export const CART_UPDATE = 'CART_UPDATE';

export const addToCart = (data: any) => async (dispatch: any) => handleCart({
    dispatch,
    type: CART_ADD,
    payload: data
});
