import * as cart from './cart';
import { Reducer } from 'redux';
import { getCart, resetCart, updateCart } from '../../../helpers';

export interface CartReducerProps {
    cart: any,
}
export const CartReducer: Reducer = (state: CartReducerProps = {
    cart: getCart() ? getCart() : resetCart()
}, action: any) => {
    const {payload, type} = action;
    switch (type) {
        case cart.CART_UPDATE:
            return {
                ...state,
                cart: updateCart(...payload),
            };
        default:
            return state;
    }
};
