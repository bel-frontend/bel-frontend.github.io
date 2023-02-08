import React from 'react';
import { Header } from 'components';
import style from './style.module.css';

export const Layout = ({ children, ...props }: any) => {
    const {
        route: { showHeader },
    } = props;

    return (
        <>
            {showHeader !== false ? <Header /> : null}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8  col-md-10">
                        {React.createElement(children, props)}
                    </div>
                </div>
            </div>
        </>
    );
};
