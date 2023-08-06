import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { PrivacyPolicy } from '../../containers/Auth/SignUp/PrivacyPolicy';
import Button from '@mui/material/Button';
import CookieIcon from '@mui/icons-material/Cookie';

import style from './style.module.scss';

const consentCookieBannerName = 'consentCookieBanner';

const getCookie = (cookieName: string) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (isNeedReset?: boolean) => {
    const msInYear = 3.154e+10;
    let expires;

    if (isNeedReset) {
        expires = '';
    } else {
        expires = Date.now() + msInYear;
    }

    document.cookie = `${consentCookieBannerName}=${expires}`;
};

const deleteCookie = () => setCookie(true);

export const CookiesBanner = () => {
    const [isOpenCookiesBanner, setIsOpenCookiesBanner] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    useEffect(() => {
        const expireCookie = getCookie(consentCookieBannerName);

        if (!expireCookie) {
            setIsOpenCookiesBanner(true);
        } else {
            const currentDate = Date.now();
            const convertedSavedDateToNumber = Number(expireCookie);

            if (convertedSavedDateToNumber < currentDate) {
                deleteCookie();
                setIsOpenCookiesBanner(true);
            }
        }
    }, []);

    const closeHandler = () => setIsOpenCookiesBanner(false);

    const openDialogHandler = () => setIsOpenDialog(true);

    const onCloseDialogHandler = () => setIsOpenDialog(false);

    const acceptCookies = () => {
        setCookie();
        setIsOpenCookiesBanner(false);
    };

    return (
        <>
            <Snackbar
                open={isOpenCookiesBanner}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                style={{ zIndex: '3' }}
            >
                <div className={style.wrapper}>
                    <div className={style.cookieContainer}>
                        <CookieIcon fontSize='large' style={{ marginRight: '7px' }} />
                        <div>
                            <Typography variant='body1'>
                                Наш сайт захоўвае файлы cookies на вашай прыладзе. Вы можаце дазнацца больш аб нашай
                                <span className={style.linkContainer}
                                      onClick={openDialogHandler}> палітыцы прыватнасці</span>
                            </Typography>
                            <div className={style.button}>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    onClick={acceptCookies}
                                >
                                    Пагадзіцца
                                </Button>
                            </div>
                        </div>
                        <Close style={{ cursor: 'pointer' }} onClick={closeHandler} />
                    </div>
                </div>
            </Snackbar>
            <Dialog open={isOpenDialog} onClose={onCloseDialogHandler}>
                <PrivacyPolicy />
            </Dialog>
        </>
    );
};
