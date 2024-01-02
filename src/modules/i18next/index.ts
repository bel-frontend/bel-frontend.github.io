import i18next from 'i18next';
import { Action } from 'redux-actions';
// import { initReactI18next } from 'react-i18next';
import get from 'lodash/get';
import { createAction } from 'redux-actions';

import { all, put, select, takeLatest } from 'redux-saga/effects';
import * as api_helpers from 'react_redux_api';
import { INIT_DATA, reInitDataAction } from '../init';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'translate';

export const GET_TRANSLATE_REQUEST = `${modules}/GET_TRANSLATE_REQUEST`;
export const SAVE_SELECTED_LOCALE_ACTION = `${modules}/SAVE_SELECTED_LOCALE_ACTION`;
export const GET_TRANSLATE_SUCCESS = `${modules}/GET_TRANSLATE_SUCCESS`;
export const GET_LANGUAGES_REQUEST = `${modules}/GET_LANGUAGES_REQUEST`;

export const getTranslateAction = actionCreator(GET_TRANSLATE_REQUEST);
export const getLanguagesListRequest = actionCreator(GET_LANGUAGES_REQUEST, {
    // responseDataPrepare: (data) => {
    //     const languages = data.data || [];
    //     return {
    //         ...data,
    //         data: codes.filter((i) => languages.includes(i.iso639_1)), //use it for  2  symbols items
    //     };
    // },
});

export const saveLocaleAction = createAction(SAVE_SELECTED_LOCALE_ACTION);

export const DEFAULT_LANG = 'en';

const apiRoutes = new ApiRoutes();

i18next
    // .use(languageDetector)
    // .use()
    .init({
        fallbackLng: DEFAULT_LANG,
        compatibilityJSON: 'v1',
        debug: false,
        saveMissing: true,
        // defaultNS: 'default',
        resources: {},
    });

i18next.on('loaded', function (loaded) {
    console.log('loaded', loaded);
});

apiRoutes.add(GET_TRANSLATE_REQUEST, ({ locale }: { locale: string }) => {
    return {
        url: `https://translates.goman.live/get-translations`,
        method: 'GET',
        params: {
            language: locale,
            apiKey: 'apk7a01b56f93956703c5debb4fc170d97a67fe40d5f53d8c9f180f8a71309f30d1',
            applicationId: 'appID89dddf3b1c9f42b7',
        },
        showLoaderFlag: false,
    };
});

apiRoutes.add(GET_LANGUAGES_REQUEST, () => ({
    url: `/get-languages`,
    method: 'get',
    params: { apiKey: 'test' },
}));

// reducers
const initialState = { lang: DEFAULT_LANG };

export const i18nextReducer = (
    state = initialState,
    action: { payload: any; type: string },
) => {
    switch (action.type) {
        case SAVE_SELECTED_LOCALE_ACTION: {
            const { payload } = action;

            return { ...state, lang: payload };
        }

        // Default
        default: {
            return state;
        }
    }
};

//sagas
const getTranslateSaga = function* (): any {
    const locale = yield select(localeSelector);
    i18next.changeLanguage(locale);
    yield put(
        getTranslateAction(
            { locale },
            {
                onSuccess: () => {},
            },
        ),
    );
};

const getTranslateByActionSaga = function* (
    dispatch: any,
    action: Action<any>,
) {
    const { payload: locale } = action;
    i18next.changeLanguage(locale);
    yield put(
        getTranslateAction(
            { locale },
            {
                onSuccess: () => {},
            },
        ),
    );
};

const getTranslateSuccessSaga = function* (): any {
    const { loaded, ...translations } = yield select(getTranslatesSelector);
    const locale = yield select(localeSelector);
    i18next.addResourceBundle(locale, 'translation', translations[locale]);
    i18next.changeLanguage(locale);
    yield put(reInitDataAction());
};

export const i18nextModuleSaga = function* (dispatch: any) {
    yield all([
        //@ts-ignore
        takeLatest([INIT_DATA], getTranslateSaga, dispatch),
        //@ts-ignore
        takeLatest([GET_TRANSLATE_SUCCESS], getTranslateSuccessSaga, dispatch),
        takeLatest(
            [SAVE_SELECTED_LOCALE_ACTION],
            getTranslateByActionSaga,
            dispatch,
        ),
    ]);
};

//selectors
export const getTranslatesSelector = apiSelector(GET_TRANSLATE_REQUEST);

export const localeSelector = (state: any) => get(state, 'locale.lang');
export const getLanguagesListSelector = apiSelector(GET_LANGUAGES_REQUEST);

export default i18next;

export const useTranslation = () => {
    const { t }: { t: (str: string) => any } = i18next;
    return { t };
};
