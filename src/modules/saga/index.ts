import { all, put, select, delay, call, takeEvery } from 'redux-saga/effects';
import * as apiHelpers from 'react_redux_api';
import { set, get } from 'lodash';
import { history } from '../history';
import { initModuleSaga } from '../init';
import { notificationSaga, showError, showSuccess } from 'modules/notification';
import { authModuleSaga, authHashSelector, logoutAction } from 'modules/auth';
import { artickleModuleSaga } from 'modules/artickles';
const {
    modules: { apiWatchRequest },
    axios: { init },
} = apiHelpers;

if (process.env.NODE_ENV == 'development') {
    init('http://localhost:3001');
    // init('https://api.bel-frontend.online');
} else if (process.env.NODE_ENV == 'production') {
    init('https://api.bel-frontend.online');
}

// TODO:  need refactoring

function* rootSaga(dispatch: any) {
    yield all([
        apiWatchRequest({
            additiveCallback: function* ({
                showLoaderFlag = false,
                ...data
            }): Generator<any> {
                //show loader
                if (showLoaderFlag) {
                    // yield put(showLoader());
                }

                // add credentials for  request
                const credentials = yield select(authHashSelector);
                if (credentials) {
                    set(data, 'headers.Authorization', `${credentials}`);
                }
                return data;
            },
            successCallback: function* (data: any) {
                // yield put(hideLoader());
                if (
                    data.config.method === 'put' ||
                    data.config.method === 'post' ||
                    data.config.method === 'delete'
                ) {
                    const message = get(data, 'data.message');
                    if (message) {
                        yield put(showSuccess({ message }));
                    } else {
                        yield put(
                            showSuccess({
                                message: 'Successful operation.',
                            }),
                        );
                    }
                }
            },
            failedCallback: function* (data: any) {
                const dataStatus = data.status;
                // redirect to login
                // yield put(hideLoader());
                const error = get(data, 'response.data.error');
                switch (true) {
                    case typeof error === 'object' && error.type === 'popup': {
                        yield put(showError({ message: error.message }));
                        return;
                    }
                    case typeof error === 'object' && error.type === 'snack': {
                        yield put(showError({ message: error.message }));
                        return;
                    }

                    case dataStatus === 401:
                        yield put(logoutAction());
                        yield call(history.push, '/');
                        return;
                    case dataStatus === 404:
                        yield call(history.push, '/404');
                        return;
                    case dataStatus === 500:
                        yield put(
                            showError({
                                message: 'Internal server error.',
                            }),
                        );
                        return;
                    case dataStatus === 406: {
                        const message = get(
                            data,
                            'response.data.message',
                            'Internal server error.',
                        );
                        yield put(showError({ message }));
                        return;
                    }
                    case dataStatus === 403: {
                        const message = get(
                            data,
                            'response.data.message',
                            'Internal server error.',
                        );
                        yield put(showError({ message }));
                        return;
                    }
                    default: {
                        if (
                            typeof error === 'object' &&
                            error.type === 'popup'
                        ) {
                            yield put(showError({ message: error.message }));
                        }
                        return;
                    }
                }
            },
        }),
        initModuleSaga(dispatch),
        notificationSaga(dispatch),
        authModuleSaga(dispatch),
        artickleModuleSaga(dispatch),
    ]);
}

export default rootSaga;
