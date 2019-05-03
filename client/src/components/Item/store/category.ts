export const CATEGORY_FETCH_FAILED = 'CATEGORY_FETCH_FAILED';
export const CATEGORY_FETCH_REQUEST = 'CATEGORY_FETCH_REQUEST';
export const CATEGORY_FETCH_SUCCESS = 'CATEGORY_FETCH_SUCCESS';

export function getCategory(data?: any) {
    return {
        payload: data || '',
        type: CATEGORY_FETCH_REQUEST
    }
};
