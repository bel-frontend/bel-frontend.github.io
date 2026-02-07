import { createAction } from 'redux-actions';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
    mode: ThemeMode;
}

const THEME_STORAGE_KEY = 'theme-mode';

const getInitialThemeMode = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return 'system';
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }
    return 'system';
};

const initialState: ThemeState = {
    mode: 'system',
};

const modules = 'theme';

const SET_THEME_MODE = `${modules}/SET_THEME_MODE`;
const INIT_THEME = `${modules}/INIT_THEME`;

export const setThemeModeAction = createAction<ThemeMode>(SET_THEME_MODE);
export const initThemeAction = createAction(INIT_THEME);

export const themeReducer = (
    state = initialState,
    action: { type: string; payload?: ThemeMode },
): ThemeState => {
    switch (action.type) {
        case SET_THEME_MODE: {
            const mode = action.payload || 'system';
            if (typeof window !== 'undefined') {
                localStorage.setItem(THEME_STORAGE_KEY, mode);
            }
            return { ...state, mode };
        }
        case INIT_THEME: {
            return { ...state, mode: getInitialThemeMode() };
        }
        default:
            return state;
    }
};

export const themeModeSelector = (state: { theme: ThemeState }): ThemeMode =>
    state?.theme?.mode || 'system';

/**
 * Returns the effective theme mode, resolving 'system' to actual 'light' or 'dark'
 */
export const getEffectiveThemeMode = (
    mode: ThemeMode,
    prefersDark: boolean,
): 'light' | 'dark' => {
    if (mode === 'system') {
        return prefersDark ? 'dark' : 'light';
    }
    return mode;
};
