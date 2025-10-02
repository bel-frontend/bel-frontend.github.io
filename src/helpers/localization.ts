/**
 * Goman Localization Helper
 * Утыліты для працы з лакалізацыямі праз Goman API
 * Utilities for working with localizations via Goman API
 */

const GOMAN_API_KEY = '8b09c55af7e408242c690ef4bdb39e083df366b2b489b9cc';
const GOMAN_APP_ID = 'appID_e8a5aed48aaa902d89518abf48a0738c_f5fb4165';
const GOMAN_API_URL = 'https://translates.goman.live';

export interface LocalizationData {
    [key: string]: {
        en?: string;
        be?: string;
    };
}

/**
 * Атрымаць усе лакалізацыі з Goman API
 * Get all localizations from Goman API
 */
export async function fetchLocalizations(language: string = 'en') {
    try {
        const response = await fetch(
            `${GOMAN_API_URL}/get-translations?language=${language}&apiKey=${GOMAN_API_KEY}&applicationId=${GOMAN_APP_ID}`,
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch localizations: ${response.statusText}`,
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching localizations:', error);
        return null;
    }
}

/**
 * Захаваць лакалізацыю ў Goman API
 * Save localization to Goman API
 */
export async function saveLocalization(
    fullKey: string,
    translations: { [langCode: string]: string },
) {
    try {
        const response = await fetch(`${GOMAN_API_URL}/mcp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apiKey: GOMAN_API_KEY,
                applicationid: GOMAN_APP_ID,
            },
            body: JSON.stringify({
                action: 'create_localization',
                fullKey,
                translations,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to save localization: ${response.statusText}`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving localization:', error);
        return null;
    }
}

/**
 * Выдаліць лакалізацыю з Goman API
 * Delete localization from Goman API
 */
export async function deleteLocalization(fullKey: string) {
    try {
        const response = await fetch(`${GOMAN_API_URL}/mcp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apiKey: GOMAN_API_KEY,
                applicationid: GOMAN_APP_ID,
            },
            body: JSON.stringify({
                action: 'delete_localization',
                fullKey,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete localization: ${response.statusText}`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting localization:', error);
        return null;
    }
}

/**
 * Праверыць, ці існуе лакалізацыя
 * Check if localization exists
 */
export async function checkLocalizationExists(fullKey: string) {
    try {
        const response = await fetch(`${GOMAN_API_URL}/mcp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apiKey: GOMAN_API_KEY,
                applicationid: GOMAN_APP_ID,
            },
            body: JSON.stringify({
                action: 'get_localization_exists',
                fullKey,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to check localization: ${response.statusText}`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error checking localization:', error);
        return null;
    }
}

/**
 * Атрымаць спіс актыўных моваў
 * Get list of active languages
 */
export async function getActiveLanguages() {
    try {
        const response = await fetch(`${GOMAN_API_URL}/mcp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                apiKey: GOMAN_API_KEY,
                applicationid: GOMAN_APP_ID,
            },
            body: JSON.stringify({
                action: 'get_active_languages',
                detailed: true,
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to get active languages: ${response.statusText}`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting active languages:', error);
        return null;
    }
}
