import * as apiHelpers from 'react_redux_api';
import notificationsReducer from '@/modules/notification';
import { authReducer } from '@/modules/auth';
import { ViewPortReducer } from '@/modules/viewport';
import { cookiesReducer } from '@/modules/cookies';
import { popupsReducer } from '@/modules/popups';
import { autoSaveArtickleReducer } from '../artickles';
import { combineReducers } from 'redux';
import { i18nextReducer } from '../i18next';

const {
    modules: { apiDefaultReducer },
} = apiHelpers;

export interface State {
    tick: string;
}

export default combineReducers({
    api: apiDefaultReducer,
    auth: authReducer,
    notification: notificationsReducer,
    viewport: ViewPortReducer,
    cookies: cookiesReducer,
    popups: popupsReducer,
    autoSaveArtickle: autoSaveArtickleReducer,
    locale: i18nextReducer,
});
