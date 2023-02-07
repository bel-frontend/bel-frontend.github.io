import React from 'react';
import { Header } from 'components';
import style from './style.module.css';

export const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8  col-md-10">{children}</div>
                </div>
            </div>
        </>
    );
};
