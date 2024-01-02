'use client';
import React, { createElement } from 'react';
import { Container, Box } from '@mui/material';

import { Header, Footer } from '@/components';
import { ScrollToTop } from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from '@/modules/auth';
import { getViewport } from '@/modules/viewport';
import { useRouter } from 'next/navigation';
import BuyMeACofee from './components/BuyMeACoffe';

export const Layout = ({ children, style = {}, ...props }: any) => {
    const { showHeader = true, showFooter = true, maxWidth = 'md' } = props;

    const userIsAuth = useSelector(currentUserIsAuth);
    const viewPort = useSelector(getViewport);
    const history = useRouter();
    const { isMobile } = viewPort;
    return (
        <>
            {showHeader !== false ? (
                <Header
                    isMobile={isMobile}
                    history={history}
                    userIsAuth={userIsAuth}
                />
            ) : null}
            <ScrollToTop viewPort={viewPort} />
            <Container
                maxWidth={maxWidth}
                sx={{
                    mt: -6,
                    mb: 2,
                    ...style,
                }}
            >
                <Box display={'flex'} justifyContent={'center'}>
                    <BuyMeACofee isMobile={isMobile} />
                </Box>
            </Container>
            <Container maxWidth={maxWidth} sx={{ minHeight: '80vh', ...style }}>
                {children}
            </Container>
            {showFooter ? <Footer /> : null}
        </>
    );
};
