import { createTheme, ThemeOptions } from '@mui/material/styles';
import {
    designBreakpoints,
    designPalette,
    designShape,
    designShadows,
    designTypography,
} from './tokens';

const lp = designPalette.light;
const dp = designPalette.dark;

// Elevated surface for dark mode (one step above background.paper)
const darkElevated = '#1a2540';
const darkPrimaryAlpha20 = 'rgba(124, 157, 255, 0.2)';
const darkPrimaryAlpha30 = 'rgba(124, 157, 255, 0.3)';

const baseThemeOptions: ThemeOptions = {
    breakpoints: {
        values: { ...designBreakpoints },
    },
    shape: {
        borderRadius: designShape.borderRadius,
    },
    typography: {
        fontFamily: designTypography.fontFamily,
        h1: {
            fontSize: designTypography.h1.fontSize,
            fontWeight: designTypography.h1.fontWeight,
            lineHeight: designTypography.h1.lineHeight,
            letterSpacing: designTypography.h1.letterSpacing,
        },
        h2: {
            fontSize: designTypography.h2.fontSize,
            fontWeight: designTypography.h2.fontWeight,
            lineHeight: designTypography.h2.lineHeight,
            letterSpacing: designTypography.h2.letterSpacing,
        },
        h3: {
            fontSize: designTypography.h3.fontSize,
            fontWeight: designTypography.h3.fontWeight,
            lineHeight: designTypography.h3.lineHeight,
            letterSpacing: designTypography.h3.letterSpacing,
        },
        h4: {
            fontSize: designTypography.h4.fontSize,
            fontWeight: designTypography.h4.fontWeight,
            lineHeight: designTypography.h4.lineHeight,
        },
        subtitle1: {
            fontSize: '1.1rem',
            fontWeight: designTypography.fontWeightSemibold,
        },
        subtitle2: {
            fontSize: '1.1rem',
            fontWeight: designTypography.fontWeightMedium,
            lineHeight: 1,
        },
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {},
            },
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                color: 'secondary',
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    marginRight: 0,
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginRight: 4,
                    alignItems: 'baseline',
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    ...baseThemeOptions,
    palette: {
        mode: 'light',
        primary: {
            main: lp.primary,
        },
        secondary: {
            main: lp.secondary,
        },
        error: {
            main: lp.error,
        },
        background: {
            default: lp.backgroundDefault,
            paper: lp.backgroundPaper,
        },
        text: {
            primary: lp.textPrimary,
            secondary: lp.textSecondary,
        },
    },
    shadows: [
        'none',
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
        designShadows.card,
    ],
});

export const darkTheme = createTheme({
    ...baseThemeOptions,
    palette: {
        mode: 'dark',
        primary: {
            main: dp.primary,
            // #7c9dff is a light color (luminance 0.36) — MUI would assign light text.primary
            // (#e2e8f0) as contrastText, giving only 2:1. Force dark text for contained buttons.
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        secondary: {
            main: dp.secondary,
        },
        error: {
            main: dp.error,
        },
        background: {
            default: dp.backgroundDefault,
            paper: dp.backgroundPaper,
        },
        text: {
            primary: dp.textPrimary,
            secondary: dp.textSecondary,
        },
    },
    shadows: [
        'none',
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
        designShadows.cardDark,
    ],
    components: {
        ...baseThemeOptions.components,
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    // Prevent light primary (#7c9dff) from being used as AppBar bg in dark mode.
                    // Use a dark surface so white logos and icons remain readable.
                    backgroundColor: '#0d1629',
                    color: dp.textPrimary,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: dp.backgroundPaper,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: dp.border,
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    borderColor: dp.border,
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: dp.textSecondary,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: dp.link,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: darkElevated,
                        '& fieldset': {
                            borderColor: dp.border,
                        },
                        '&:hover fieldset': {
                            borderColor: dp.textSecondary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: dp.primary,
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: dp.textPrimary,
                    },
                    '& .MuiInputLabel-root': {
                        color: dp.textSecondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: dp.primary,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: darkElevated,
                    '& fieldset': {
                        borderColor: dp.border,
                    },
                    '&:hover fieldset': {
                        borderColor: dp.textSecondary,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: dp.primary,
                    },
                },
                input: {
                    color: dp.textPrimary,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: dp.textSecondary,
                    '&.Mui-focused': {
                        color: dp.primary,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: darkElevated,
                },
                icon: {
                    color: dp.textSecondary,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: darkElevated,
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: darkPrimaryAlpha20,
                    },
                    '&.Mui-selected': {
                        backgroundColor: darkPrimaryAlpha30,
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: dp.textSecondary,
                    borderColor: dp.border,
                    '&.Mui-selected': {
                        backgroundColor: darkPrimaryAlpha30,
                        color: dp.primary,
                        '&:hover': {
                            backgroundColor: darkPrimaryAlpha20,
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                track: {
                    backgroundColor: '#3a4a6b',
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginRight: 4,
                    alignItems: 'baseline',
                },
                label: {
                    color: dp.textPrimary,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: dp.textPrimary,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: dp.backgroundPaper,
                },
            },
        },
    },
});

export const getTheme = (mode: 'light' | 'dark') => {
    return mode === 'dark' ? darkTheme : lightTheme;
};

const theme = lightTheme;
export default theme;
