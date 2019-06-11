import { CART_ADD, CART_UPDATE } from '../components/Cart/store/cart';
import { commonRequest } from './common';
import { UPDATE_SNACKBAR } from '../components/Common/store/snackbar';

export const handleCart = async (action: any) => {
    const {dispatch, payload, type} = action;
    switch (type) {
        case CART_ADD:
            return await commonRequest({
                path: `/cart/update`,
                dispatch,
                method: 'POST',
                body: payload
            });
        default:
            break;
    }
}
