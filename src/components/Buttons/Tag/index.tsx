import React from 'react';
import { Chip } from '@mui/material';

import style from './style.module.scss';

export const Tag = ({ children }: any) => {
    return <Chip size="small" className={style.tag} label={children} />;
};
