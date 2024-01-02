import * as api_helpers from 'react_redux_api';
import { createAction } from 'redux-actions';
import {
    call,
    put,
    takeEvery,
    select,
    debounce,
    all,
} from 'redux-saga/effects';

const modules = 'artickles';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_ARTICKLES_REQUEST = `${modules}/GET_ARTICKLES_REQUEST`;
export const GET_ARTICLES_IDS_REQUEST = `${modules}/GET_ARTICLES_IDS_REQUEST`;

export const GET_ARTICKLES_PINNED_REQUEST = `${modules}/GET_ARTICKLES_PINNED_REQUEST`;
export const GET_MY_ARTICKLES_REQUEST = `${modules}/GET_MY_ARTICKLES_REQUEST`;

export const GET_ARTICKLE_BY_ID_REQUEST = `${modules}/GET_ARTICKLE_BY_ID_REQUEST`;
export const UPDATE_ARTICLE_REQUEST = `${modules}/UPDATE_ARTICLE_REQUEST`;
export const CREATE_ARTICLE_REQUEST = `${modules}/CREATE_ARTICLE_REQUEST`;
export const SET_LIKE_REQUEST = `${modules}/SET_LIKE_REQUEST`;
export const REMOVE_LIKE_REQUEST = `${modules}/REMOVE_LIKE_REQUEST`;
export const SEND_ERRORR_REQUEST = `${modules}/SEND_ERRORR_REQUEST`;
export const DELETE_ARTICLE_REQUEST = `${modules}/DELETE_ARTICLE_REQUEST`;

export const GET_UNACTIVE_ARTICKLES_REQUEST = `${modules}/GET_UNACTIVE_ARTICKLES_REQUEST`;

export const AUTOSAVE_ARTICLE = `${modules}/AUTOSAVE_ARTICLE`;
export const SAVE_ARTICLE_TO_STORE = `${modules}/SAVE_ARTICLE_TO_STORE`;
export const CLEAR_AUTOSAVE_ARTICLE = `${modules}/CLEAR_AUTOSAVE_ARTICLE`;

const SEARCH_ARTICLE = `${modules}/SEARCH_ARTICLE`;

export const getArticklesRequest = actionCreator(GET_ARTICKLES_REQUEST);
export const getArticlesIdsRequest = actionCreator(GET_ARTICLES_IDS_REQUEST);

export const getPinnedArticlesRequest = actionCreator(
    GET_ARTICKLES_PINNED_REQUEST,
);
export const getMyArticlesRequest = actionCreator(GET_MY_ARTICKLES_REQUEST);

export const updateArtickleRequest = actionCreator(UPDATE_ARTICLE_REQUEST);
export const createArtickleRequest = actionCreator(CREATE_ARTICLE_REQUEST);
export const getArtickleByIdRequest = actionCreator(GET_ARTICKLE_BY_ID_REQUEST);
export const setLikedRequest = actionCreator(SET_LIKE_REQUEST);
export const removeLikeRequest = actionCreator(REMOVE_LIKE_REQUEST);

export const sendErrorRequest = actionCreator(SEND_ERRORR_REQUEST);
export const deleteArticleRequest = actionCreator(DELETE_ARTICLE_REQUEST);

export const searchArticle = createAction(SEARCH_ARTICLE);
export const autoSaveArticle = createAction(AUTOSAVE_ARTICLE);
export const clearAutoSaveArticle = createAction(CLEAR_AUTOSAVE_ARTICLE);

export const getUnactiveArticklesRequest = actionCreator(
    GET_UNACTIVE_ARTICKLES_REQUEST,
);

apiRoutes.add(GET_ARTICKLES_REQUEST, ({ ...params } = {}) => ({
    url: `/artickles`,
    method: 'get',
    params: params,
}));

apiRoutes.add(GET_ARTICLES_IDS_REQUEST, ({ ...params } = {}) => ({
    url: `/articles-ids`,
    method: 'get',
    params: params,
}));

apiRoutes.add(GET_ARTICKLES_PINNED_REQUEST, ({ ...params } = {}) => ({
    url: `/pinned-articles`,
    method: 'get',
    params: params,
}));

apiRoutes.add(GET_MY_ARTICKLES_REQUEST, ({ ...params } = {}) => ({
    url: `/my-articles`,
    method: 'get',
    params: params,
}));
apiRoutes.add(GET_UNACTIVE_ARTICKLES_REQUEST, ({ ...params } = {}) => ({
    url: `/unpublished-articles`,
    method: 'get',
    params: params,
}));

apiRoutes.add(SEND_ERRORR_REQUEST, ({ ...data } = {}) => ({
    url: `/error-artickle`,
    method: 'post',
    data: data,
}));

apiRoutes.add(GET_ARTICKLE_BY_ID_REQUEST, ({ id }: { id: any }) => ({
    url: `/artickles/${id}`,
    method: 'get',
}));

apiRoutes.add(UPDATE_ARTICLE_REQUEST, ({ id, ...data }: { id: any }) => ({
    url: `/artickles/${id}`,
    method: 'put',
    data: data,
}));

apiRoutes.add(CREATE_ARTICLE_REQUEST, ({ ...data }: { id: any }) => ({
    url: `/artickles`,
    method: 'post',
    data: data,
}));

apiRoutes.add(SET_LIKE_REQUEST, ({ id }: { id: any }) => ({
    url: `/like/${id}`,
    method: 'put',
}));

apiRoutes.add(REMOVE_LIKE_REQUEST, ({ id }: { id: any }) => ({
    url: `/like/${id}`,
    method: 'delete',
}));

apiRoutes.add(DELETE_ARTICLE_REQUEST, ({ id }: { id: any }) => ({
    url: `/article/${id}`,
    method: 'delete',
}));

const initialState = {};

export const autoSaveArtickleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_ARTICLE_TO_STORE: {
            const {
                payload: { ...data },
            } = action;
            return { ...state, ...data };
        }
        case CLEAR_AUTOSAVE_ARTICLE: {
            return {};
        }
        default:
            return state;
    }
};

export function* autosaveSaga(action: any): any {
    yield put({ type: SAVE_ARTICLE_TO_STORE, payload: action?.payload });
}

export function* searchSaga(action: any): any {
    yield put(getArticklesRequest(action?.payload));
}

export function* artickleModuleSaga(dispatch: any) {
    yield debounce(300, SEARCH_ARTICLE, searchSaga);
    yield debounce(1000, AUTOSAVE_ARTICLE, autosaveSaga);
}

export const getArticklesSelector = apiSelector(GET_ARTICKLES_REQUEST);
export const getArtickleSelector = apiSelector(GET_ARTICKLE_BY_ID_REQUEST);
export const getPinndedArticklesSelector = apiSelector(
    GET_ARTICKLES_PINNED_REQUEST,
);
export const getMyArticklesSelector = apiSelector(GET_MY_ARTICKLES_REQUEST);
export const getAutoSavedArtickleSelector = (state: any) =>
    state.autoSaveArtickle;

export const getArticlesIdsSelector = apiSelector(GET_ARTICLES_IDS_REQUEST);

export const getUnactiveArticklesSelector = apiSelector(
    GET_UNACTIVE_ARTICKLES_REQUEST,
);
