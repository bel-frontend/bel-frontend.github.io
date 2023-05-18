import { createTheme } from '@mui/material/styles';

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
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: '#dc3d62',
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
                // Name of the slot
                root: {
                    // Some CSS
                    // height: 240,
                    // width: 240,
                },
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
    },
});

export default theme;
