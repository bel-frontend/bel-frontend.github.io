'use client';
import React, { createElement, Suspense } from 'react';
import { Container, Box } from '@mui/material';

import { Header, Footer } from '@/components';
import { ScrollToTop } from './components/ScrollToTop';
import { useSelector } from 'react-redux';
import { currentUserIsAuth } from '@/modules/auth';
import { getViewport } from '@/modules/viewport';
import { useRouter, usePathname } from 'next/navigation';
import BuyMeACofee from './components/BuyMeACoffe';
import { Projects } from '@/containers/Home/components/Projects';

export const Layout = ({ children, style = {}, ...props }: any) => {
    const { showHeader = true, showFooter = true, maxWidth = 'md' } = props;

    const userIsAuth = useSelector(currentUserIsAuth);
    const viewPort = useSelector(getViewport);
    const history = useRouter();
    const pathname = usePathname();
    const { isMobile } = viewPort;
    const isHome = pathname === '/';

    return (
        <>
            {showHeader !== false ? (
                <Suspense>
                    <Header
                        isMobile={isMobile}
                        history={history}
                        userIsAuth={userIsAuth}
                    />
                </Suspense>
            ) : null}
            <ScrollToTop viewPort={viewPort} />
            {isHome ? <Projects /> : null}
            <Container
                maxWidth={maxWidth}
                sx={{
                    mt: isHome ? 2 : -6,
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
