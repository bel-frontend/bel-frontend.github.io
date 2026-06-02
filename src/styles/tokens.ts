export const designBreakpoints = Object.freeze({
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
});

export const designSpacing = Object.freeze({
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
});

export const designTypography = Object.freeze({
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemibold: 600,
    fontWeightBold: 700,
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.01em' },
    h3: { fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.005em' },
    h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.35 },
    body: { fontSize: '1rem', lineHeight: 1.6 },
    small: { fontSize: '0.875rem', lineHeight: 1.5 },
});

export const designViewport = Object.freeze({
    ...designBreakpoints,
    isMobile: designBreakpoints.md - 1,
});

export const designShape = Object.freeze({
    borderRadius: 12,
    borderRadiusLg: 16,
});

export const designShadows = Object.freeze({
    card: '0px 8px 24px rgba(15, 23, 42, 0.08)',
    cardDark: '0px 8px 24px rgba(2, 6, 23, 0.45)',
});

export const designPalette = Object.freeze({
    light: {
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        secondary: '#0f766e',
        link: '#1d4ed8',
        linkHover: '#1e40af',
        error: '#dc3d62',
        backgroundDefault: '#f8fafc',
        backgroundPaper: '#ffffff',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        border: 'rgba(15, 23, 42, 0.12)',
        selection: '#2563eb',
    },
    dark: {
        primary: '#7c9dff',
        primaryHover: '#9db4ff',
        secondary: '#4db6ac',
        link: '#80cbc4',
        linkHover: '#b2dfdb',
        error: '#f48fb1',
        backgroundDefault: '#0b1220',
        backgroundPaper: '#111a2c',
        textPrimary: '#e2e8f0',
        textSecondary: '#a8b6cc',
        border: 'rgba(148, 163, 184, 0.35)',
        selection: '#4db6ac',
    },
});
