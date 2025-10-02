import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bel from './bel.json';
import en from './en.json';

// Налады для падключэння да Goman API
const GOMAN_API_KEY = '8b09c55af7e408242c690ef4bdb39e083df366b2b489b9cc';
const GOMAN_APP_ID = 'appID_e8a5aed48aaa902d89518abf48a0738c_f5fb4165';

// Базавыя рэсурсы
const resources = {
    en: en,
    be: bel,
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'be',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

// Функцыя для загрузкі перакладаў з Goman API
async function loadTranslationsFromGoman() {
    console.log('📥 Loading translations from Goman API...');
    try {
        const response = await fetch(
            `https://translates.goman.live/localizations?apiKey=${GOMAN_API_KEY}&applicationId=${GOMAN_APP_ID}`,
        );

        if (response.ok) {
            const allData = await response.json();
            console.log('✅ Loaded all translations from Goman:', allData);

            // API вяртае структуру: { "be": {...}, "en": {...} }
            Object.keys(allData).forEach((lang) => {
                const translations = allData[lang];
                if (translations && typeof translations === 'object') {
                    i18n.addResourceBundle(
                        lang,
                        'translation',
                        translations,
                        true,
                        true,
                    );
                    console.log(`✅ Added translations for "${lang}"`);
                }
            });
        } else {
            console.error(`❌ Failed to load translations: ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Error loading translations from Goman:', error);
    }
}

// Загружаем пераклады пры ініцыялізацыі
loadTranslationsFromGoman();

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
