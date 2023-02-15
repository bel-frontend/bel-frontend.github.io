import React from 'react';
import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';

export const EmptyLayout = ({ children, ...props }: any) => {
    const {
        route: { showHeader, showFooter = true },
    } = props;

    return (
        <>
            {showHeader !== false ? <Header /> : null}
            <ScrollToTop />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12  col-md-12">
                        {React.createElement(children, props)}
                    </div>
                </div>
            </div>
            {showFooter !== false ? <Footer /> : null}
        </>
    );
};
