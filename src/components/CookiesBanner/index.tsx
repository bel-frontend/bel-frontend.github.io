import React, { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Close from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CookieIcon from '@mui/icons-material/Cookie';
import { useSelector, useDispatch } from 'react-redux';

import { PrivacyPolicy } from 'containers/Auth/SignUp/PrivacyPolicy';
import { cookiesSelector, confirmCookiesAction } from 'modules/cookies';

import style from './style.module.scss';

export const CookiesBanner = () => {
    const appliedCookiesConfirmation = useSelector(cookiesSelector);
    const dispatch = useDispatch();
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
                                Наш сайт захоўвае файлы cookies на вашай
                                прыладзе. Вы можаце дазнацца больш аб нашай
                                <span
                                    className={style.linkContainer}
                                    onClick={openDialogHandler}
                                >
                                    {' '}
                                    палітыцы прыватнасці
                                </span>
                            </Typography>
                            <div className={style.button}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={confirm}
                                >
                                    Пагадзіцца
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
