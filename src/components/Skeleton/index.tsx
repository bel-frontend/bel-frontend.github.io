import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import style from './style.module.scss';

const Skeleton = ({ title, classes = {}, subtitle, children }: any) => {
    return (
        <Box className={[style.container, classes.container].join(' ')}>
            <Box>
                <Typography
                    variant="h3"
                    className={[style.title, classes.title].join(' ')}
                >
                    {title}
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="body2"
                    className={[style.subtitle, classes.subtitle].join(' ')}
                >
                    {subtitle}
                </Typography>
            </Box>
            <Box width={'100%'} className={classes.content}>
                {children}
            </Box>
        </Box>
    );
};

export default Skeleton;
