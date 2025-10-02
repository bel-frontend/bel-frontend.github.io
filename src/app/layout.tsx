'use client';
import '@/styles/index.scss';
import React from 'react';
import { Inter } from 'next/font/google';
import { ReduxProvider, ThemeRegistry, InitProvider } from '@/providers';
import Popups from '@/containers/Popups';
import '@/modules/translations';
import Notifications from '@/containers/Notifications';
import { useSelector } from 'react-redux';
import { localeSelector } from '@/modules/i18next';

const inter = Inter({ subsets: ['latin'] });

function LayoutContent({ children }: { children: React.ReactNode }) {
    const currentLocale = useSelector(localeSelector);

    React.useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = currentLocale || 'en';
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
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <LayoutContent>{children}</LayoutContent>
                </ReduxProvider>
            </body>
        </html>
    );
}

export default RootLayout;
