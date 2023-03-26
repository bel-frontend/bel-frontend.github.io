import React from 'react';
import moment from 'moment/moment';
import { Container } from '@mui/material';

import style from './style.module.scss';

export const Footer = () => {
    return (
        <Container maxWidth="md" className={style.container}>
            <footer className={style.footer}>
                <p className="copyright text-muted">
                    Copyright &copy; Беларускі франтэнд{' '}
                    {moment(new Date()).format('YYYY')}
                </p>
                <p></p>
            </footer>
        </Container>
    );
};
