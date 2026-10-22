import * as api_helpers from 'react_redux_api';

const modules = 'admin';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export interface AdminUser {
    user_id: string;
    email: string;
    user_role: string;
    created?: string;
    last_login?: string;
    banned?: boolean;
    ban_reason?: string;
    banned_at?: string;
}

export interface ModerationArticle {
    artickle_id: string;
    title: string;
    author?: string;
    user_id: string;
    isActive?: boolean;
    updated_at?: string;
    created_at?: string;
    moderation?: {
        status: 'rejected' | 'pending' | 'approved';
        categories?: string[];
        reason?: string;
        by?: 'ai' | 'admin';
    };
}

export const GET_ADMIN_USERS_REQUEST = `${modules}/GET_ADMIN_USERS_REQUEST`;
export const BAN_USER_REQUEST = `${modules}/BAN_USER_REQUEST`;
export const UNBAN_USER_REQUEST = `${modules}/UNBAN_USER_REQUEST`;
export const GET_MODERATION_ARTICLES_REQUEST = `${modules}/GET_MODERATION_ARTICLES_REQUEST`;
export const SET_MODERATION_DECISION_REQUEST = `${modules}/SET_MODERATION_DECISION_REQUEST`;

export const getAdminUsersRequest = actionCreator(GET_ADMIN_USERS_REQUEST);
export const banUserRequest = actionCreator(BAN_USER_REQUEST);
export const unbanUserRequest = actionCreator(UNBAN_USER_REQUEST);
export const getModerationArticlesRequest = actionCreator(
    GET_MODERATION_ARTICLES_REQUEST,
);
export const setModerationDecisionRequest = actionCreator(
    SET_MODERATION_DECISION_REQUEST,
);

apiRoutes.add(GET_ADMIN_USERS_REQUEST, ({ ...params }: any = {}) => ({
    url: `/admin/users`,
    method: 'get',
    params,
}));

apiRoutes.add(BAN_USER_REQUEST, ({ user_id, reason }: any = {}) => ({
    url: `/admin/users/${user_id}/ban`,
    method: 'put',
    data: { reason },
}));

apiRoutes.add(UNBAN_USER_REQUEST, ({ user_id }: any = {}) => ({
    url: `/admin/users/${user_id}/ban`,
    method: 'delete',
}));

apiRoutes.add(GET_MODERATION_ARTICLES_REQUEST, () => ({
    url: `/admin/moderation/articles`,
    method: 'get',
}));

apiRoutes.add(
    SET_MODERATION_DECISION_REQUEST,
    ({ id, decision, reason }: any = {}) => ({
        url: `/admin/articles/${id}/moderation`,
        method: 'put',
        data: { decision, reason },
    }),
);

export const getAdminUsersSelector = apiSelector(GET_ADMIN_USERS_REQUEST);
export const getModerationArticlesSelector = apiSelector(
    GET_MODERATION_ARTICLES_REQUEST,
);
