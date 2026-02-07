import * as React from 'react';
import CardDft from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Card = ({ children, sx, ...props }: any) => {
    return (
        <CardDft
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'background.paper',
                ...sx,
            }}
            {...props}
        >
            <CardContent sx={{ maxHeight: '100%', overflow: 'auto' }}>
                {children}
            </CardContent>
        </CardDft>
    );
};
