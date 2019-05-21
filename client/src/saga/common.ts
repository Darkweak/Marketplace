import { put } from 'redux-saga/effects';
import { getToken } from '../helpers';

interface CommonRequestProps {
    body?: any;
    callback?: any;
    isForm?: boolean;
    method: string;
    path: string;
}

export function* commonRequest({
                                   body = null,
                                   callback,
                                   isForm,
                                   method = 'GET',
                                   path
                               }: CommonRequestProps) {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/ld+json');
        headers.append('Content-Type', 'application/ld+json');
        if (getToken()) {
            headers.append('Authorization', `Bearer ${getToken()}`);
        }
        const request = new Request(
            `${process.env.REACT_APP_API_ENTRYPOINT}${path}`,
            {
                method,
                headers,
                body: body && JSON.stringify(body)
            }
        );
        const response = yield fetch(request).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
        if (callback) {
            yield put({
                type: callback.success,
                payload: response[ 'hydra:member' ] ? response[ 'hydra:member' ] : response,
                isList: !!response[ 'hydra:member' ]
            });
        }
    } catch (e) {
        if (callback) {
            yield put({
                type: callback.error
            });
        }
    }
}
