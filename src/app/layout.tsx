'use client';
import '@/styles/index.scss';
import React from 'react';
import { Inter } from 'next/font/google';
import { ReduxProvider, ThemeRegistry, InitProvider } from '@/providers';
import Popups from '@/containers/Popups';
import '@/modules/translations';
import Notifications from '@/containers/Notifications';
const inter = Inter({ subsets: ['latin'] });

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
                    <InitProvider>
                        <ThemeRegistry options={{ key: 'mui' }}>
                            {children}
                            <Popups />
                            <Notifications />
                        </ThemeRegistry>
                    </InitProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}

export default RootLayout;
