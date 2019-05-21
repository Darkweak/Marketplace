import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    ADD_SNACKBAR,
    REMOVE_SNACKBAR,
    UPDATE_SNACKBAR
} from '../components/Common/store/snackbar';
import { Snackbar } from '../components/Objects/Snackbar';

export const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

function* handleSnackbar(action: any) {
  const {payload, type} = action;
  switch (type) {
    case UPDATE_SNACKBAR:
        const snackbar: Snackbar = {
            type: payload.type,
            text : payload.text
        };
        yield put({
            type: ADD_SNACKBAR,
            payload: snackbar
        });
        yield call(delay, 5000);
        yield put({
            type: REMOVE_SNACKBAR,
            payload: snackbar
        });
        break;
    default:
      break;
  }
}

export default function* watchSnackbarActions() {
  yield all([takeEvery(UPDATE_SNACKBAR, handleSnackbar)]);
}
