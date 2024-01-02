'use client';
import '@/styles/index.scss';
import { Inter } from 'next/font/google';
import { Layout } from '@/containers/layouts/Layout';
import '@/modules/translations';

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
    return <Layout params={{ ...props?.params }}>{children}</Layout>;
}

export default LayoutAuth;
