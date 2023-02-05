import React from 'react';
import { Header } from 'src/components';
import style from './style.module.css';

export const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
