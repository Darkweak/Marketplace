import {
    PRODUCT_FETCH_FAILED,
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS
} from '../components/Item/store/product';
import { commonRequest } from './common';

export const handleProduct = (action: any) => {
  const {dispatch, payload, type} = action;
  switch (type) {
    case PRODUCT_FETCH_REQUEST:
      return commonRequest({
        callback: {
          error: PRODUCT_FETCH_FAILED,
          success: PRODUCT_FETCH_SUCCESS
        },
        dispatch,
        path: `/products?${payload}`,
        method: 'GET'
      });
    default:
      break;
  }
};
