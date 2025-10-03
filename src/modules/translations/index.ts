import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
import belLocal from './bel.json';
import enLocal from './en.json';

// Налады для падключэння да Goman API
const GOMAN_API_KEY = '8b09c55af7e408242c690ef4bdb39e083df366b2b489b9cc';
const GOMAN_APP_ID = 'appID_e8a5aed48aaa902d89518abf48a0738c_f5fb4165';

// Redux actions
const modules = 'translate';
export const SAVE_SELECTED_LOCALE_ACTION = `${modules}/SAVE_SELECTED_LOCALE_ACTION`;
export const saveLocaleAction = createAction(SAVE_SELECTED_LOCALE_ACTION);

// Redux reducer
export const DEFAULT_LANG = 'be';
const initialState = { lang: DEFAULT_LANG };

export const localeReducer = (
    state = initialState,
    action: { payload: any; type: string },
) => {
    switch (action.type) {
        case SAVE_SELECTED_LOCALE_ACTION: {
            const { payload } = action;
            return { ...state, lang: payload };
        }
        default: {
            return state;
        }
    }
};

// Redux selector
export const localeSelector = (state: any) => get(state, 'locale.lang');

// Лакальныя рэсурсы як fallback (рэзервны варыянт)
const localResources = {
    en: enLocal,
    be: belLocal,
};

// Функцыя для глыбокага аб'яднання аб'ектаў
function deepMerge(target: any, source: any) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item: any) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

// Функцыя для загрузкі перакладаў з Goman API
async function loadTranslationsFromGoman() {
    console.log('📥 Loading translations from Goman API...');
    try {
        const response = await fetch(
            `https://translates.goman.live/localizations?apiKey=${GOMAN_API_KEY}&applicationId=${GOMAN_APP_ID}`,
            { cache: 'no-cache' },
        );

        if (response.ok) {
            const gomanData = await response.json();
            console.log('✅ Loaded translations from Goman API:', gomanData);

            // Аб'ядноўваем лакальныя і серверныя пераклады
            Object.keys(gomanData).forEach((lang) => {
                const gomanTranslations = gomanData[lang];
                const localTranslations =
                    localResources[lang as keyof typeof localResources]
                        ?.translation || {};

                if (
                    gomanTranslations &&
                    typeof gomanTranslations === 'object'
                ) {
                    // Аб'ядноўваем: спачатку лакальныя, потым серверныя (серверныя перакрываюць лакальныя)
                    const mergedTranslations = deepMerge(
                        localTranslations,
                        gomanTranslations,
                    );

                    i18n.addResourceBundle(
                        lang,
                        'translation',
                        mergedTranslations,
                        true,
                        true,
                    );

                    const gomanCount = Object.keys(gomanTranslations).length;
                    const localCount = Object.keys(localTranslations).length;
                    console.log(
                        `✅ Merged translations for "${lang}": ${gomanCount} from Goman + ${localCount} local = ${
                            Object.keys(mergedTranslations).length
                        } total`,
                    );
                }
            });

            // Захоўваем бягучую мову перад перазагрузкай
            const currentLanguage = i18n.language;
            console.log('💾 Current language before reload:', currentLanguage);

            // Перазапускаем i18n каб ён абнавіў пераклады
            await i18n.reloadResources();

            // Пераканаемся, што мова не змянілася
            if (i18n.language !== currentLanguage) {
                console.log(
                    `🔄 Restoring language from ${i18n.language} to ${currentLanguage}`,
                );
                await i18n.changeLanguage(currentLanguage);
            }

            console.log('✅ Translations reloaded successfully from Goman API');
            return true;
        } else {
            console.warn(
                `⚠️ Failed to load from Goman API (${response.status}), using local translations`,
            );
            return false;
        }
    } catch (error) {
        console.error('❌ Error loading translations from Goman API:', error);
        console.log('📦 Using local translations as fallback');
        return false;
    }
}

// Функцыя для атрымання захаванай мовы з localStorage
function getSavedLanguage(): string {
    if (typeof window !== 'undefined') {
        try {
            // Спрабуем прачытаць з localStorage (Redux Persist)
            const persistedState = localStorage.getItem('persist:root');
            if (persistedState) {
                const parsed = JSON.parse(persistedState);
                if (parsed.locale) {
                    const localeState = JSON.parse(parsed.locale);
                    if (localeState.lang) {
                        console.log(
                            '📖 Found saved language in localStorage:',
                            localeState.lang,
                        );
                        return localeState.lang;
                    }
                }
            }

            // Альтэрнатыўны варыянт: праверка lang у localStorage
            const savedLang = localStorage.getItem('i18nextLng');
            if (savedLang) {
                console.log(
                    '📖 Found saved language in i18nextLng:',
                    savedLang,
                );
                return savedLang;
            }
        } catch (error) {
            console.warn('⚠️ Error reading saved language:', error);
        }
    }
    console.log('📖 No saved language found, using default: be');
    return 'be'; // Мова па змаўчанні
}

// Ініціялізуем i18n з лакальнымі рэсурсамі
const initialLanguage = getSavedLanguage();
console.log('🚀 Initializing i18n with language:', initialLanguage);

i18n.use(initReactI18next).init({
    resources: localResources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

// Загружаем пераклады з Goman API пасля ініціялізацыі
loadTranslationsFromGoman().then((success) => {
    if (success) {
        console.log('🌐 Using translations from Goman API');
    } else {
        console.log('📦 Using local JSON translations');
    }
});

// Падпісваемся на змену мовы
i18n.on('languageChanged', (lng) => {
    console.log(`🌍 Language changed to: ${lng}`);
    if (typeof document !== 'undefined') {
        document.documentElement.lang = lng;
    }
});

console.log('🚀 i18n initialized with language:', i18n.language);

// Экспартуем функцыю для перазагрузкі перакладаў
export { loadTranslationsFromGoman };
export default i18n;
