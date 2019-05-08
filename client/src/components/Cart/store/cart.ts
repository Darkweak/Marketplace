export const CART_UPDATE = 'CART_UPDATE';

export const updateCart = (data: any) => ({
    type: CART_UPDATE,
    payload: data
});
