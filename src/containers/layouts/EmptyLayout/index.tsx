import React from 'react';
import { Container, Stack } from '@mui/material';

const EmptyLayout = ({ children, ...props }: any) => {
    const {
        history,
        route: { showHeader, showFooter = true, userIsAuth },
        location,
    } = props;

    return (
        <>
            <Container maxWidth="xs">
                {React.createElement(children, props)}
            </Container>
        </>
    );
};
export default EmptyLayout;
