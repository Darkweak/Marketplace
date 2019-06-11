import {
    CATEGORY_FETCH_FAILED,
    CATEGORY_FETCH_REQUEST,
    CATEGORY_FETCH_SUCCESS
} from '../components/Item/store/category';
import { commonRequest } from './common';

export const handleCategory = (action: any) => {
  const {dispatch, payload, type} = action;
  switch (type) {
    case CATEGORY_FETCH_REQUEST:
      return commonRequest({
        callback: {
          error: CATEGORY_FETCH_FAILED,
          success: CATEGORY_FETCH_SUCCESS
        },
        dispatch,
        path: `/categories${payload}`,
        method: 'GET'
      });
    default:
      break;
  }
};
