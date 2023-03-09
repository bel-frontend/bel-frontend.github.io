import React from 'react';
import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';
import { Drawer } from './components/Drawer';
export const Layout = ({ children, ...props }: any) => {
    const {
        history,
        route: { showHeader, showFooter = true, userIsAuth },
        location,
    } = props;

    return (
        <>
            {showHeader !== false ? <Header /> : null}
            <Drawer history={history} userIsAuth={userIsAuth} />
            <ScrollToTop isArticlePage={location.pathname !== '/'} />
            <div className="container">
                <div className="pageContainer">
                  {React.createElement(children, props)}
                </div>
            </div>
            {showFooter ? <Footer /> : null}
        </>
    );
};
