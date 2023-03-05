import * as api_helpers from 'react_redux_api';
import { createAction } from 'redux-actions';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { INIT_DATA } from 'modules/init';

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

export const GET_CURRENT_USER_REQUEST = `${modules}/GET_CURRENT_USER_REQUEST`;
export const GET_CURRENT_USER_SUCCESS = `${modules}/GET_CURRENT_USER_SUCCESS`;

export const getCurrentUserRequest = actionCreator(GET_CURRENT_USER_REQUEST);

export const loginRequest = actionCreator(LOGIN_USER_REQUEST, {
    preventFailure: false,
});
export const registerRequest = actionCreator(REGISTER_USER_REQUEST);
export const logoutRequest = actionCreator(LOGOUT_USER_REQUEST);

export const logoutAction = createAction(LOGOUT_USER);

apiRoutes.add(GET_CURRENT_USER_REQUEST, () => {
    return {
        url: `/check-auth`,
        method: 'GET',
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

export function* logoutSaga() {
    yield put(logoutRequest());
}
export function* getUserSaga(): Generator<any, any> {
    const auth = yield select(currentUserIsAuth);
    if (auth) {
        yield put(getCurrentUserRequest());
    }
}

export function* authModuleSaga(dispatch: any) {
    yield all([
        takeEvery(LOGOUT_USER, logoutSaga),
        takeEvery([INIT_DATA, LOGIN_USER_SUCCESS], getUserSaga),
    ]);
}

export const userDataSelector = (state: any) => state.auth;
export const currentUserIsAuth = (state: any) => Boolean(state.auth.token);
export const authHashSelector = (state: any) => state.auth.token;

export const loginUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const registerUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const getCurrentUserSelector = apiSelector(GET_CURRENT_USER_REQUEST);
