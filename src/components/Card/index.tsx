import * as React from 'react';
import CardDft from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Card = ({ children, ...props }: any) => {
    return (
        <CardDft
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <CardContent sx={{ maxHeight: '100%', overflow: 'auto' }}>
                {children}
            </CardContent>
        </CardDft>
    );
};
