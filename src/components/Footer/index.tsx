'use client';
import React from 'react';
import moment from 'moment/moment';
import { Container } from '@mui/material';
import { useTranslation } from '@/modules/i18next';

import style from './style.module.scss';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="md" className={style.container}>
            <footer className={style.footer}>
                <p className="copyright text-muted">
                    {t('footer.copyright')} {moment(new Date()).format('YYYY')}
                </p>
                <p></p>
            </footer>
        </Container>
    );
};
