import React from 'react';
import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';
import { Drawer } from './components/Drawer';
export const Layout = ({ children, ...props }: any) => {
    console.log(props);

    const {
        history,
        route: { showHeader, showFooter = true, userIsAuth },
    } = props;

    return (
        <>
            {showHeader !== false ? <Header /> : null}
            <Drawer history={history} userIsAuth={userIsAuth} />
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
