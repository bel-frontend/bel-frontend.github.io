'use client';
import React, { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CookieIcon from '@mui/icons-material/Cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '@/modules/i18next';

import { PrivacyPolicy } from '@/containers/Auth/SignUp/PrivacyPolicy';
import { cookiesSelector, confirmCookiesAction } from '@/modules/cookies';

import style from './style.module.scss';

export const CookiesBanner = () => {
    const appliedCookiesConfirmation = useSelector(cookiesSelector);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const confirm = () => dispatch(confirmCookiesAction());

    const [isOpenCookiesBanner, setIsOpenCookiesBanner] = useState(true);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const closeHandler = () => setIsOpenCookiesBanner(false);

    const openDialogHandler = () => setIsOpenDialog(true);

    const onCloseDialogHandler = () => setIsOpenDialog(false);

    return appliedCookiesConfirmation ? null : (
        <>
            <Snackbar
                open={isOpenCookiesBanner}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                style={{ zIndex: '3' }}
            >
                <div className={style.wrapper}>
                    <div className={style.cookieContainer}>
                        <CookieIcon
                            fontSize="large"
                            style={{ marginRight: '7px' }}
                        />
                        <div>
                            <Typography variant="body1">
                                {t('cookies.message')}
                                <span
                                    className={style.linkContainer}
                                    onClick={openDialogHandler}
                                >
                                    {' '}
                                    {t('cookies.privacy_policy')}
                                </span>
                            </Typography>
                            <div className={style.button}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={confirm}
                                >
                                    {t('cookies.accept')}
                                </Button>
                            </div>
                        </div>
                        <Close
                            style={{ cursor: 'pointer' }}
                            onClick={closeHandler}
                        />
                    </div>
                </div>
            </Snackbar>
            <Dialog open={isOpenDialog} onClose={onCloseDialogHandler}>
                <PrivacyPolicy />
            </Dialog>
        </>
    );
};
