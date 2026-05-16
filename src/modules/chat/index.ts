import * as apiHelpers from 'react_redux_api';

const modules = 'chat';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const SEND_CHAT_MESSAGE_REQUEST = `${modules}/SEND_CHAT_MESSAGE_REQUEST`;

export const sendChatMessageRequest = actionCreator(SEND_CHAT_MESSAGE_REQUEST);

apiRoutes.add(SEND_CHAT_MESSAGE_REQUEST, ({ ...data } = {}) => ({
    url: '/chat',
    method: 'post',
    data,
}));

export const getChatMessageSelector = apiSelector(SEND_CHAT_MESSAGE_REQUEST);
