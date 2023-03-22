import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as apiHelpers from 'react_redux_api';
import notificationsReducer from 'modules/notification';
import { authReducer } from 'modules/auth';
import { ViewPortReducer } from 'modules/viewport';
const {
    modules: { apiDefaultReducer },
} = apiHelpers;

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['sidebar', 'auth'],
};

export default persistCombineReducers(persistConfig, {
    api: apiDefaultReducer,
    auth: authReducer,
    notification: notificationsReducer,
    viewport: ViewPortReducer,
});
