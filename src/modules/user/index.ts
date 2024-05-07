import * as api_helpers from 'react_redux_api';

const modules = 'user';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_SUBSRIBES_STATUS_REQUEST = `${modules}/GET_SUBSRIBES_STATUS_REQUEST`;
export const DISABLE_SUBSRIBES_REQUEST = `${modules}/DISABLE_SUBSRIBES_REQUEST`;
export const SET_SUBSRIBE_REQUEST = `${modules}/SET_SUBSRIBE_REQUEST`;

export const addSubscribeRequest = actionCreator(SET_SUBSRIBE_REQUEST);
export const deleteSubscribeRequest = actionCreator(DISABLE_SUBSRIBES_REQUEST);
export const getSubscribeRequest = actionCreator(GET_SUBSRIBES_STATUS_REQUEST);

apiRoutes.add(SET_SUBSRIBE_REQUEST, () => {
    return {
        url: `/subsribe-news`,
        method: 'post',
    };
});
apiRoutes.add(GET_SUBSRIBES_STATUS_REQUEST, () => {
    return {
        url: `/subsribe-news`,
        method: 'get',
    };
});

apiRoutes.add(DISABLE_SUBSRIBES_REQUEST, () => {
    return {
        url: `/subsribe-news`,
        method: 'delete',
    };
});

export const getSubsribtionStatusSelector = apiSelector(
    GET_SUBSRIBES_STATUS_REQUEST,
);
