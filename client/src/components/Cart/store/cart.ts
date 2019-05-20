export const CART_ADD = 'CART_ADD';
export const CART_UPDATE = 'CART_UPDATE';

export const addToCart = (data: any) => ({
    type: CART_ADD,
    payload: data
});
