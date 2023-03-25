import React from 'react';
import { Container } from '@mui/material';
import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';
import { Drawer } from './components/Drawer';

export const Layout = ({ children, ...props }: any) => {
    const {
        history,
        route: { showHeader, showFooter = true, userIsAuth, maxWidth = 'md' },
        location,
        viewPort: { isMobile },
    } = props;

    return (
        <>
            {showHeader !== false ? (
                <Header
                    isMobile={isMobile}
                    location={location}
                    history={history}
                    userIsAuth={userIsAuth}
                />
            ) : null}
            {/* <Drawer history={history} userIsAuth={userIsAuth} /> */}
            <ScrollToTop />
            <Container maxWidth={maxWidth}>
                {React.createElement(children, props)}
            </Container>
            {showFooter ? <Footer /> : null}
        </>
    );
};
