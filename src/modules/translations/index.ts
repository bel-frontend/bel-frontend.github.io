import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import belLocal from './bel.json';
import enLocal from './en.json';

// Налады для падключэння да Goman API
const GOMAN_API_KEY = '8b09c55af7e408242c690ef4bdb39e083df366b2b489b9cc';
const GOMAN_APP_ID = 'appID_e8a5aed48aaa902d89518abf48a0738c_f5fb4165';

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
                const localTranslations = localResources[lang as keyof typeof localResources]?.translation || {};
                
                if (gomanTranslations && typeof gomanTranslations === 'object') {
                    // Аб'ядноўваем: спачатку лакальныя, потым серверныя (серверныя перакрываюць лакальныя)
                    const mergedTranslations = deepMerge(localTranslations, gomanTranslations);
                    
                    i18n.addResourceBundle(
                        lang,
                        'translation',
                        mergedTranslations,
                        true,
                        true,
                    );
                    
                    const gomanCount = Object.keys(gomanTranslations).length;
                    const localCount = Object.keys(localTranslations).length;
                    console.log(`✅ Merged translations for "${lang}": ${gomanCount} from Goman + ${localCount} local = ${Object.keys(mergedTranslations).length} total`);
                }
            });
            
            // Перазапускаем i18n каб ён абнавіў пераклады
            await i18n.reloadResources();
            console.log('✅ Translations reloaded successfully from Goman API');
            return true;
        } else {
            console.warn(`⚠️ Failed to load from Goman API (${response.status}), using local translations`);
            return false;
        }
    } catch (error) {
        console.error('❌ Error loading translations from Goman API:', error);
        console.log('📦 Using local translations as fallback');
        return false;
    }
}

// Ініціялізуем i18n з лакальнымі рэсурсамі
i18n.use(initReactI18next).init({
    resources: localResources,
    lng: 'be',
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
