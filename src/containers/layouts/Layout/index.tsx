import React from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Header, Footer } from 'components';
import { ScrollToTop } from './components/ScrollToTop';

export const Layout = ({ children, ...props }: any) => {
    const {
        history,
        route: { showHeader, showFooter = true, userIsAuth, maxWidth = 'md' },
        location,
        viewPort: { isMobile },
        viewPort,
    } = props;
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
            <ScrollToTop viewPort={viewPort} />
            <Container maxWidth={maxWidth} sx={{ minHeight: '80vh' }}>
                {React.createElement(children, props)}
            </Container>
            {showFooter ? <Footer /> : null}
        </>
    );
};
