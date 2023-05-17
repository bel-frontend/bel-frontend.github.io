import * as api_helpers from 'react_redux_api';

const modules = 'comments';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const ADD_COMMENT_REQUEST = `${modules}/ADD_COMMENT_REQUEST`;
export const DELETE_COMMENT_REQUEST = `${modules}/DELETE_COMMENT_REQUEST`;
export const GET_COMMENTS_REQUEST = `${modules}/GET_COMMENTS_REQUEST`;

export const addCommentRequest = actionCreator(ADD_COMMENT_REQUEST);
export const deleteCommentRequest = actionCreator(DELETE_COMMENT_REQUEST);
export const getCommentsRequest = actionCreator(GET_COMMENTS_REQUEST);

apiRoutes.add(ADD_COMMENT_REQUEST, ({ artickle_id, ...data }: any = {}) => {
    return {
        url: `/comment/${artickle_id}`,
        method: 'post',
        data: data,
    };
});
apiRoutes.add(GET_COMMENTS_REQUEST, ({ artickle_id }: any = {}) => {
    return {
        url: `/comments/${artickle_id}`,
        method: 'get',
    };
});

apiRoutes.add(DELETE_COMMENT_REQUEST, ({ comment_id }: any = {}) => {
    return {
        url: `/comment/${comment_id}`,
        method: 'delete',
    };
});

export const getCommentsSelector = apiSelector(GET_COMMENTS_REQUEST);
