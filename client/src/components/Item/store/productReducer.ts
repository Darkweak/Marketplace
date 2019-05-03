import * as actions from './product';
import { Product } from "../../Objects/Product";
import { Reducer } from "redux";

export interface ProductReducerProps {
    isError: boolean,
    products: Product[],
};


export const ProductReducer: Reducer = (state: ProductReducerProps = {
    isError: false,
    products: [],
}, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case actions.PRODUCT_FETCH_FAILED:
            return {
                ...state,
                isError: true,
                products: payload
            };
        case actions.PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                isError: true
            };
        case actions.PRODUCT_FETCH_SUCCESS:
            let products: Product[] = [];
            payload.map((item: Product) => {
                products.push(item)
            });
            return {
                ...state,
                isError: false,
                products
            };
        default:
            return state;
    }
};
