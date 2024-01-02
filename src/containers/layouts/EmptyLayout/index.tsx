import React from 'react';
import { Container } from '@mui/material';

const EmptyLayout = ({ children, ...props }: any) => {
    return (
        <>
            <Container maxWidth="xs">{children}</Container>
        </>
    );
};
export default EmptyLayout;
