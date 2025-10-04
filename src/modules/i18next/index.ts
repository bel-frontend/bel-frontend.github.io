import i18next from 'i18next';
import { Action } from 'redux-actions';
import React from 'react';
import get from 'lodash/get';
import { createAction } from 'redux-actions';

import { all, put, select, takeLatest } from 'redux-saga/effects';
import * as api_helpers from 'react_redux_api';
import { INIT_DATA, reInitDataAction } from '../init';
import locales from './locales.json';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'translate';

// Налады Goman API
const GOMAN_API_KEY = '8b09c55af7e408242c690ef4bdb39e083df366b2b489b9cc';
const GOMAN_APP_ID = 'appID_e8a5aed48aaa902d89518abf48a0738c_f5fb4165';

export const GET_TRANSLATE_REQUEST = `${modules}/GET_TRANSLATE_REQUEST`;
export const SAVE_SELECTED_LOCALE_ACTION = `${modules}/SAVE_SELECTED_LOCALE_ACTION`;
export const GET_TRANSLATE_SUCCESS = `${modules}/GET_TRANSLATE_SUCCESS`;
export const GET_ALL_TRANSLATIONS_REQUEST = `${modules}/GET_ALL_TRANSLATIONS_REQUEST`;
export const GET_ALL_TRANSLATIONS_SUCCESS = `${modules}/GET_ALL_TRANSLATIONS_SUCCESS`;

export const getTranslateAction = actionCreator(GET_TRANSLATE_REQUEST);
export const getAllTranslationsAction = actionCreator(
    GET_ALL_TRANSLATIONS_REQUEST,
);
export const saveLocaleAction = createAction(SAVE_SELECTED_LOCALE_ACTION);

export const DEFAULT_LANG = 'be'; // Беларуская мова - дэфолтная

// Лакальныя рэсурсы як fallback
const localResources = {
    en: { translation: locales.en },
    be: { translation: locales.be },
};

const apiRoutes = new ApiRoutes();

// Функцыя для атрымання захаванай мовы з localStorage
function getSavedLanguage(): string {
    if (typeof window !== 'undefined') {
        try {
            const persistedState = localStorage.getItem('persist:root');
            if (persistedState) {
                const parsed = JSON.parse(persistedState);
                if (parsed.locale) {
                    const localeState = JSON.parse(parsed.locale);
                    if (localeState.lang) {
                        return localeState.lang;
                    }
                }
            }
            const savedLang = localStorage.getItem('i18nextLng');
            if (savedLang) {
                return savedLang;
            }
        } catch (error) {
            console.warn('Error reading saved language:', error);
        }
    }
    return DEFAULT_LANG;
}

// Ініціялізуем i18next з беларускай мовай па змаўчанні
const initialLanguage = getSavedLanguage();
console.log('🚀 i18next init with language:', initialLanguage);

i18next.init({
    resources: localResources,
    lng: initialLanguage,
    fallbackLng: DEFAULT_LANG,
    compatibilityJSON: 'v3',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
});

i18next.on('languageChanged', (lng) => {
    console.log('🌍 Language changed to:', lng);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
    }
});

// Калі мы на кліенце (пасля гідрацыі), праверым захаваную мову
if (typeof window !== 'undefined') {
    setTimeout(() => {
        const savedLang = getSavedLanguage();
        if (savedLang !== i18next.language) {
            console.log('🔄 Syncing language from storage:', savedLang);
            i18next.changeLanguage(savedLang);
        }
    }, 100);
}

// API маршрут для атрымання ўсіх перакладаў адразу (view=tree па дэфолце)
apiRoutes.add(GET_ALL_TRANSLATIONS_REQUEST, () => {
    return {
        url: `https://translates.goman.live/localizations`,
        method: 'GET',
        params: {
            apiKey: GOMAN_API_KEY,
            applicationId: GOMAN_APP_ID,
            view: 'tree',
        },
        showLoaderFlag: false,
    };
});

// reducers
const initialState = {
    lang: getSavedLanguage(),
    translationsLoaded: false,
};

export const i18nextReducer = (
    state = initialState,
    action: { payload: any; type: string },
) => {
    switch (action.type) {
        case SAVE_SELECTED_LOCALE_ACTION: {
            const { payload } = action;
            return { ...state, lang: payload };
        }
        case GET_ALL_TRANSLATIONS_SUCCESS: {
            return { ...state, translationsLoaded: true };
        }
        default: {
            return state;
        }
    }
};

//sagas
const loadAllTranslationsSaga = function* (): any {
    yield put(getAllTranslationsAction());
};

const getAllTranslationsSuccessSaga = function* (): any {
    try {
        const response = yield select(getAllTranslationsSelector);

        // Правяраем розныя варыянты структуры адказу
        let gomanData = response?.data;

        // Калі data - гэта масіў, то дадзеныя могуць быць у іншым месцы
        if (
            !gomanData ||
            typeof gomanData !== 'object' ||
            Array.isArray(gomanData)
        ) {
            gomanData = response;
        }

        if (
            !gomanData ||
            typeof gomanData !== 'object' ||
            Array.isArray(gomanData)
        ) {
            console.warn(
                'No translations data from Goman API, using local only',
            );
            return;
        }

        // Дадаём пераклады з сервера для кожнай мовы
        Object.keys(gomanData).forEach((lang) => {
            const gomanTranslations = gomanData[lang];

            if (gomanTranslations && typeof gomanTranslations === 'object') {
                i18next.addResourceBundle(
                    lang,
                    'translation',
                    gomanTranslations,
                    true,
                    true,
                );
            }
        });

        const currentLanguage = i18next.language;
        i18next.emit('languageChanged', currentLanguage);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
};

const getTranslateByActionSaga = function* (action: Action<any>): any {
    const { payload: locale } = action;

    yield i18next.changeLanguage(locale);

    if (typeof window !== 'undefined') {
        localStorage.setItem('i18nextLng', locale);
    }
};

export const i18nextModuleSaga = function* (dispatch: any) {
    yield all([
        //@ts-ignore
        takeLatest([INIT_DATA], loadAllTranslationsSaga),
        //@ts-ignore
        takeLatest(
            [GET_ALL_TRANSLATIONS_SUCCESS],
            getAllTranslationsSuccessSaga,
        ),
        //@ts-ignore
        takeLatest([SAVE_SELECTED_LOCALE_ACTION], getTranslateByActionSaga),
    ]);
};

//selectors
export const getAllTranslationsSelector = apiSelector(
    GET_ALL_TRANSLATIONS_REQUEST,
);
export const getTranslatesSelector = apiSelector(GET_TRANSLATE_REQUEST);
export const localeSelector = (state: any) => get(state, 'locale.lang');
export const translationsLoadedSelector = (state: any) =>
    get(state, 'locale.translationsLoaded');

export default i18next;

export const useTranslation = () => {
    const [, forceUpdate] = React.useState(0);

    React.useEffect(() => {
        const onLanguageChanged = () => {
            forceUpdate((prev) => prev + 1);
        };

        i18next.on('languageChanged', onLanguageChanged);

        return () => {
            i18next.off('languageChanged', onLanguageChanged);
        };
    }, []);

    const { t }: { t: (str: string) => any } = i18next;
    return { t };
};
