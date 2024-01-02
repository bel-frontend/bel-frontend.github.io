import * as api_helpers from 'react_redux_api';
import { createAction } from 'redux-actions';
import {
    call,
    put,
    takeEvery,
    select,
    all,
    delay,
    takeLatest,
} from 'redux-saga/effects';
import { INIT_DATA } from '@/modules/init';

const modules = 'auth';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const LOGIN_USER_REQUEST = `${modules}/LOGIN_USER_REQUEST`;
export const LOGIN_USER_SUCCESS = `${modules}/LOGIN_USER_SUCCESS`;
export const LOGIN_USER_FAILED = `${modules}/LOGIN_USER_FAILED`;

export const REGISTER_USER_REQUEST = `${modules}/REGISTER_USER_REQUEST`;
export const REGISTER_USER_SUCCESS = `${modules}/REGISTER_USER_SUCCESS`;

export const LOGOUT_USER_REQUEST = `${modules}/LOGOUT_USER_REQUEST`;
export const LOGOUT_USER = `${modules}/LOGOUT_USER`;

export const NEED_CHECK_USER_ACCESS = `${modules}/NEED_CHECK_USER_ACCESS`;
const UPDATE_USER_TOKEN_REQUEST = `${modules}/UPDATE_USER_TOKEN_REQUEST`;
const UPDATE_USER_TOKEN_SUCCESS = `${modules}/UPDATE_USER_TOKEN_SUCCESS`;

export const GET_CURRENT_USER_REQUEST = `${modules}/GET_CURRENT_USER_REQUEST`;
export const GET_CURRENT_USER_SUCCESS = `${modules}/GET_CURRENT_USER_SUCCESS`;

export const getCurrentUserRequest = actionCreator(GET_CURRENT_USER_REQUEST);

export const loginRequest = actionCreator(LOGIN_USER_REQUEST, {
    preventFailure: false,
});
export const registerRequest = actionCreator(REGISTER_USER_REQUEST);
export const logoutRequest = actionCreator(LOGOUT_USER_REQUEST);

export const logoutAction = createAction(LOGOUT_USER);
export const checkUserAccess = createAction(NEED_CHECK_USER_ACCESS);

const updateUserTokenRequest = actionCreator(UPDATE_USER_TOKEN_REQUEST);

apiRoutes.add(GET_CURRENT_USER_REQUEST, () => {
    return {
        url: `/check-auth`,
        method: 'GET',
    };
});

apiRoutes.add(UPDATE_USER_TOKEN_REQUEST, ({ credentials }: any) => {
    return {
        url: `/refresh-token`,
        method: 'POST',
        data: { credentials },
    };
});

apiRoutes.add(LOGIN_USER_REQUEST, ({ ...data }) => ({
    url: `/login`,
    method: 'post',
    data,
}));

apiRoutes.add(REGISTER_USER_REQUEST, ({ ...data }) => ({
    url: `/register`,
    method: 'post',
    data,
}));

apiRoutes.add(LOGOUT_USER_REQUEST, () => ({
    url: `/logout`,
    method: 'get',
}));

const initialState = {};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            const {
                response: { data },
            } = action;
            return { ...state, ...data };
        }
        case REGISTER_USER_SUCCESS: {
            const {
                response: { data },
            } = action;
            return { ...state, ...data };
        }
        case LOGOUT_USER:
            return { ...initialState };
        case LOGIN_USER_FAILED: {
            return { ...initialState };
        }
        default:
            return state;
    }
};

function* logoutSaga() {
    yield put(logoutRequest());
}

function* getUserSaga(): Generator<any, any> {
    const auth = yield select(currentUserIsAuth);
    if (auth) {
        while (true) {
            yield put(getCurrentUserRequest());
            yield delay(60000);
        }
    }
}

function* checkUserTokenSaga(dispatch: any): Generator<any, any> {
    const auth = yield select(getCurrentUserSelector);
    const credentials = yield select(userCredentialsSelector);
    yield put(logoutAction());
    console.log('check user');

    // yield put(
    //     getCurrentUserRequest(
    //         {},
    //         {
    //             onFailure: () => {
    //                 dispatch(logoutAction());
    //             },
    //         },
    //     ),
    // );

    console.log(auth, credentials);
}

export function* authModuleSaga(dispatch: any) {
    yield all([
        takeEvery(LOGOUT_USER, logoutSaga),
        takeLatest([INIT_DATA, LOGIN_USER_SUCCESS], getUserSaga),
        takeLatest([NEED_CHECK_USER_ACCESS], checkUserTokenSaga, dispatch),
    ]);
}

export const userDataSelector = (state: any) => state.auth;
export const currentUserIsAuth = (state: any) => Boolean(state.auth.token);
export const authHashSelector = (state: any) => state.auth.token;
export const userCredentialsSelector = (state: any) =>
    state.auth.userCredentials;

export const loginUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const registerUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const getCurrentUserSelector = apiSelector(GET_CURRENT_USER_REQUEST);
