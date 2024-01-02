'use client';
import React from 'react';
import '@/styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/containers/layouts/Layout';
import { useSelector } from 'react-redux';
import '@/modules/translations';
import { useRouter } from 'next/navigation';
import { currentUserIsAuth } from '@/modules/auth';

const inter = Inter({ subsets: ['latin'] });

function LayoutAuth({
    children,
    ...props
}: {
    children: React.ReactNode;
    params: {
        [key: string]: string | string[] | undefined;
    };
}) {
    const router = useRouter();
    const userIsAuth = useSelector(currentUserIsAuth);

    React.useEffect(() => {
        if (!userIsAuth) router.push('/login');
    }, [userIsAuth]);

    return (
        <div
            style={{
                backgroundColor: 'rgb(245, 245, 245)',
                minHeight: '100vh',
            }}
        >
            <Layout
                params={{ ...props?.params }}
                styles={{
                    bgColour: 'transparent',
                    minHeight: '100vh',
                }}
                maxWidth="xl"
            >
                {children}
            </Layout>
        </div>
    );
}

export default LayoutAuth;
