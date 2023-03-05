import * as api_helpers from 'react_redux_api';

// import { call, put, takeEvery, select, all } from 'redux-saga/effects';

const modules = 'artickles';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_ARTICKLES_REQUEST = `${modules}/GET_ARTICKLES_REQUEST`;
export const GET_ARTICKLE_BY_ID_REQUEST = `${modules}/GET_ARTICKLE_BY_ID_REQUEST`;
export const UPDATE_ARTICLE_REQUEST = `${modules}/UPDATE_ARTICLE_REQUEST`;
export const CREATE_ARTICLE_REQUEST = `${modules}/CREATE_ARTICLE_REQUEST`;
export const SET_LIKE_REQUEST = `${modules}/SET_LIKE_REQUEST`;
export const REMOVE_LIKE_REQUEST = `${modules}/REMOVE_LIKE_REQUEST`;

export const getArticklesRequest = actionCreator(GET_ARTICKLES_REQUEST);
export const updateArtickleRequest = actionCreator(UPDATE_ARTICLE_REQUEST);
export const createArtickleRequest = actionCreator(CREATE_ARTICLE_REQUEST);
export const getArtickleByIdRequest = actionCreator(GET_ARTICKLE_BY_ID_REQUEST);
export const setLikedRequest = actionCreator(SET_LIKE_REQUEST);
export const removeLikeRequest = actionCreator(REMOVE_LIKE_REQUEST);

apiRoutes.add(GET_ARTICKLES_REQUEST, () => ({
    url: `/artickles`,
    method: 'get',
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

export const getArticklesSelector = apiSelector(GET_ARTICKLES_REQUEST);
export const getArtickleSelector = apiSelector(GET_ARTICKLE_BY_ID_REQUEST);
