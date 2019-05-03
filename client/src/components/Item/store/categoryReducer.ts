import * as actions from './category';
import { Reducer } from "redux";
import { Category } from "../../Objects/Category";

export interface CategoryReducerProps {
    isError: boolean,
    categories: Category[],
    category?: Category
};

export const CategoryReducer: Reducer = (state: CategoryReducerProps = {
    isError: false,
    categories: [],
    category: undefined
}, action: any) => {
    const {isList, type, payload} = action;
    switch (type) {
        case actions.CATEGORY_FETCH_FAILED:
            return {
                ...state,
                isError: true,
            };
        case actions.CATEGORY_FETCH_REQUEST:
            return {
                ...state,
                isError: true
            };
        case actions.CATEGORY_FETCH_SUCCESS:
            if (isList) {
                let categories: Category[] = [];
                payload.map((item: Category) => {
                    categories.push(item)
                });
                return {
                    ...state,
                    isError: false,
                    categories
                };
            } else {
                return {
                    ...state,
                    category: payload,
                    isError: false
                }
            }
        default:
            return state;
    }
};
