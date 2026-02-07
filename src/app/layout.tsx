'use client';
import '@/styles/index.scss';
import React from 'react';
import { Inter } from 'next/font/google';
import { ReduxProvider, ThemeRegistry, InitProvider } from '@/providers';
import Popups from '@/containers/Popups';
import '@/modules/i18next';
import Notifications from '@/containers/Notifications';
import { useSelector } from 'react-redux';
import { localeSelector, DEFAULT_LANG } from '@/modules/i18next';

const inter = Inter({ subsets: ['latin'] });

// Script to prevent theme flash - runs before React hydration
const themeInitScript = `
(function() {
    try {
        var stored = localStorage.getItem('theme-mode');
        var mode = stored === 'dark' ? 'dark' : stored === 'light' ? 'light' : null;
        if (!mode) {
            mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.body.classList.add(mode + '-mode');
        // Add theme-loaded class after a small delay to enable transitions
        requestAnimationFrame(function() {
            document.body.classList.add('theme-loaded');
        });
    } catch (e) {}
})();
`;

function LayoutContent({ children }: { children: React.ReactNode }) {
    const currentLocale = useSelector(localeSelector);

    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = currentLocale || DEFAULT_LANG;
        }
    }, [currentLocale]);

    return (
        <InitProvider>
            <ThemeRegistry options={{ key: 'mui' }}>
                {children}
                <Popups />
                <Notifications />
            </ThemeRegistry>
        </InitProvider>
    );
}

function RootLayout({
    children,
    ...props
}: {
    children: React.ReactNode;
    params: {
        [key: string]: string | string[] | undefined;
    };
}) {
    return (
        <html lang="be" suppressHydrationWarning>
            <head />
            <body className={inter.className} suppressHydrationWarning>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
                <ReduxProvider>
                    <LayoutContent>{children}</LayoutContent>
                </ReduxProvider>
            </body>
        </html>
    );
}

export default RootLayout;
