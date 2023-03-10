import { createTheme } from '@mui/material/styles';

const primary = '#0085a1';
const primaryHover = '#0c93e4';
const error = '#dc3d62';
const errorHover = '#f13753';

// A custom theme for this app

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: primary,
        },
        error: {
            main: error,
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
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    height: 240,
                    width: 240,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                color: 'primary',
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&:hover.MuiButton-containedPrimary:hover': {
                        backgroundColor: primaryHover,
                    },
                    '&:hover.MuiButton-containedError:hover': {
                      backgroundColor: errorHover,
                    },
                }
            },
        },
        MuiInputBase: {},
    },
});

export default theme;
