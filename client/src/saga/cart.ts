import { all, put, takeEvery } from 'redux-saga/effects';
import { CART_ADD, CART_UPDATE } from '../components/Cart/store/cart';
import { commonRequest } from './common';
import { UPDATE_SNACKBAR } from '../components/Common/store/snackbar';

function* handleCart(action: any) {
    const {payload, type} = action;
    switch (type) {
        case CART_ADD:
            yield put({
                type: CART_UPDATE,
                payload
            });
            yield put({
                type: UPDATE_SNACKBAR,
                payload: ({
                    type: 'success',
                    text: 'Article ajouté au panier'
                })
            });
            return yield commonRequest({
                path: `/cart/update`,
                method: 'POST',
                body: payload
            });
        default:
            break;
    }
}

export default function* watchCartActions() {
    yield all([ takeEvery(CART_ADD, handleCart) ]);
}
