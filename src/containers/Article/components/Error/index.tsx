'use client';
import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { sendErrorRequest } from '@/modules/artickles';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { currentUserIsAuth } from '@/modules/auth';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const validationSchema = (t: any) =>
    yup.object({
        message: yup
            .string()
            .min(10, t('article.validation_min_chars', { count: 10 }))
            .required(t('article.validation_required')),
    });

export default function Error({ artickleId }: { artickleId: any }) {
    const history = useRouter();
    const dispatch = useDispatch();
    const userIsAuth = useSelector(currentUserIsAuth);
    const { t } = useTranslation();
    const { handleSubmit, values, handleChange, setFieldValue, errors } =
        useFormik({
            onSubmit: ({ message }) => {
                dispatch(
                    sendErrorRequest(
                        { message, artickleId },
                        {
                            onSuccess: () => {
                                setOpen(false);
                                setFieldValue('message', '');
                            },
                        },
                    ),
                );
            },
            validationSchema: validationSchema(t),
            initialValues: {
                message: '',
            },
        });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            {userIsAuth ? (
                <>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        {t('article.error_found_button')}
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{t('article.error_report_title')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {t('article.error_report_description')}
                            </DialogContentText>
                            <TextField
                                value={values.message}
                                onChange={handleChange('message')}
                                autoFocus
                                margin="dense"
                                id="name"
                                label=""
                                placeholder={t('article.error_description_placeholder')}
                                fullWidth
                                multiline
                                variant="standard"
                                helperText={errors.message}
                                error={Boolean(errors.message)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{t('article.error_cancel')}</Button>
                            <Box
                                component={'form'}
                                ml={1}
                                onSubmit={handleSubmit}
                            >
                                <Button
                                    disableElevation
                                    variant="contained"
                                    type="submit"
                                >
                                    {t('article.error_submit')}
                                </Button>
                            </Box>
                        </DialogActions>
                    </Dialog>
                </>            ) : (
                <Button
                    variant="outlined"
                    onClick={() => {
                        history.push('/login');
                    }}
                >
                    {t('article.error_found_button')}
                </Button>
            )}
        </Box>
    );
}
