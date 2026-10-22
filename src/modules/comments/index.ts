import * as api_helpers from 'react_redux_api';

const modules = 'comments';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export type CommentVote = 1 | -1 | 0;

export interface CommentDTO {
    comment_id: string;
    parent_comment_id?: string | null;
    artickle_id: string;
    user_id: string;
    user_alias: string;
    comment: string;
    created_at?: string;
    score: number;
    my_vote: CommentVote;
    disabled?: boolean;
}

export const ADD_COMMENT_REQUEST = `${modules}/ADD_COMMENT_REQUEST`;
export const DELETE_COMMENT_REQUEST = `${modules}/DELETE_COMMENT_REQUEST`;
export const GET_COMMENTS_REQUEST = `${modules}/GET_COMMENTS_REQUEST`;
export const VOTE_COMMENT_REQUEST = `${modules}/VOTE_COMMENT_REQUEST`;

export const addCommentRequest = actionCreator(ADD_COMMENT_REQUEST);
export const deleteCommentRequest = actionCreator(DELETE_COMMENT_REQUEST);
export const getCommentsRequest = actionCreator(GET_COMMENTS_REQUEST);
export const voteCommentRequest = actionCreator(VOTE_COMMENT_REQUEST);

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

apiRoutes.add(VOTE_COMMENT_REQUEST, ({ comment_id, value }: any = {}) => {
    return {
        url: `/comment/${comment_id}/vote`,
        method: 'put',
        data: { value },
    };
});

export const getCommentsSelector = apiSelector(GET_COMMENTS_REQUEST);
