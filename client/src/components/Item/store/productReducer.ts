import * as actions from './product';
import { Product } from "../../Objects/Product";
import { Reducer } from "redux";

export interface ProductReducerProps {
    isError: boolean,
    products: Product[],
    isFetching: boolean
};


export const ProductReducer: Reducer = (state: ProductReducerProps = {
    isError: false,
    products: [],
    isFetching: false
}, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case actions.PRODUCT_FETCH_FAILED:
            return {
                ...state,
                isError: true,
                isFetching: false,
                products: payload
            };
        case actions.PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                isError: false,
                isFetching: true,
            };
        case actions.PRODUCT_FETCH_SUCCESS:
            let products: Product[] = [];
            payload.map((item: Product) => {
                products.push(item)
            });
            return {
                ...state,
                isError: false,
                isFetching: false,
                products
            };
        default:
            return state;
    }
};
