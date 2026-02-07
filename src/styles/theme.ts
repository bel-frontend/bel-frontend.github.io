import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        h1: {
            fontSize: 36,
            fontWeight: 700,
        },
        h2: {
            fontSize: 24,
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '1.1rem',
            fontWeight: 600,
        },
        subtitle2: {
            fontSize: '1.1rem',
            fontWeight: 500,
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
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#dc3d62',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
});

export const darkTheme = createTheme({
    ...baseThemeOptions,
    palette: {
        mode: 'dark',
        primary: {
            main: '#7986cb',
        },
        secondary: {
            main: '#4db6ac',
        },
        error: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b0b0b0',
        },
    },
    components: {
        ...baseThemeOptions.components,
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#b0b0b0',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#4db6ac',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#2d2d2d',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#7986cb',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: '#e0e0e0',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#b0b0b0',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#7986cb',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2d2d2d',
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#7986cb',
                    },
                },
                input: {
                    color: '#e0e0e0',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                        color: '#7986cb',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: '#2d2d2d',
                },
                icon: {
                    color: '#b0b0b0',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#2d2d2d',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(121, 134, 203, 0.2)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(121, 134, 203, 0.3)',
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#b0b0b0',
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(121, 134, 203, 0.3)',
                        color: '#7986cb',
                        '&:hover': {
                            backgroundColor: 'rgba(121, 134, 203, 0.4)',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                track: {
                    backgroundColor: '#555555',
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
                    color: '#e0e0e0',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#e0e0e0',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
    },
});

export const getTheme = (mode: 'light' | 'dark') => {
    return mode === 'dark' ? darkTheme : lightTheme;
};

// Default export for backward compatibility
const theme = lightTheme;
export default theme;
