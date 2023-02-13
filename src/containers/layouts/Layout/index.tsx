import React from 'react';
import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';

import style from './style.module.css';

export const Layout = ({ children, ...props }: any) => {
    const {
        route: { showHeader, showFooter = true },
    } = props;

    return (
        <>
            {showHeader !== false ? <Header /> : null}
            <ScrollToTop />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8  col-md-10">
                        {React.createElement(children, props)}
                    </div>
                </div>
            </div>
            {showFooter !== false ? <Footer /> : null}
        </>
    );
};
