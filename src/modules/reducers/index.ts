import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as apiHelpers from 'react_redux_api';
import notificationsReducer from 'modules/notification';
import authReduser from 'modules/auth';
const {
    modules: { apiDefaultReducer },
} = apiHelpers;

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['sidebar'],
};

export default persistCombineReducers(persistConfig, {
    api: apiDefaultReducer,
    auth: authReduser,
    notification: notificationsReducer,
});
