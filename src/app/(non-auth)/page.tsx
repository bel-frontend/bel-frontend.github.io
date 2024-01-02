// "use client";
import type { Metadata } from 'next';
import React from 'react';
import HomePage from '@/containers/Home';

export const metadata: Metadata = {
    metadataBase: new URL('https://bel-geek.com'),
    title: 'Bel-Geek.com - Тэхналогіі і Навука На Беларускай Мове',
    description: 'Bel-Geek.com - Тэхналогіі і Навука На Беларускай Мове',
    icons: {
        icon: [{ url: '/icons/icon.png' }],
        shortcut: ['/icons/shortcut-icon.png'],
        apple: [
            { url: '/icons/apple-icon.png' },
            {
                url: '/icons/apple-icon-x3.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        other: [
            {
                rel: 'apple-touch-icon-precomposed',
                url: '/icons/apple-touch-icon-precomposed.png',
            },
        ],
    },
};

export default async function Home({ ...props }) {
    return <HomePage route={{ userIsAuth: true }} {...props} />;
}
