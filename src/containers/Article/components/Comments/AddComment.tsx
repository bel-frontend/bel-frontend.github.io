'use client';
import React from 'react';
import { Button, TextField, Grid, Typography, Box, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from '@/modules/i18next';
import { addCommentRequest } from '@/modules/comments';

const validationSchema = (t: any) =>
    yup.object({
        comment: yup
            .string()
            .min(10, t('article.validation_min_chars', { count: 10 }))
            .required(t('article.validation_required')),
        user_alias: yup
            .string()
            .min(4, t('article.validation_min_chars', { count: 4 }))
            .required(t('article.validation_required')),
    });

export const AddComment = ({
    articleId,
    userIsAuth,
    onSuccess,
    parent_comment_id,
}: {
    articleId: string;
    userIsAuth?: boolean;
    onSuccess: () => void;
    parent_comment_id?: string;
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        handleSubmit,
        values,
        handleReset,
        handleChange,
        setFieldValue,
        errors,
    } = useFormik({
        onSubmit: ({ comment, user_alias }) => {
            console.log(comment);
            dispatch(
                addCommentRequest(
                    {
                        comment,
                        artickle_id: articleId,
                        user_alias,
                        parent_comment_id,
                    },
                    {
                        onSuccess: () => {
                            onSuccess();
                            setFieldValue('comment', '');
                        },
                    },
                ),
            );
        },
        validationSchema: validationSchema(t),
        initialValues: {
            comment: '',
            user_alias: '',
        },
    });
    return (
        <Grid
            flexDirection="column"
            mt={1}
            spacing={2}
            container
            direction={'column'}
        >
            <Grid item xs={12}>
                <TextField
                    size="small"
                    onChange={handleChange('user_alias')}
                    placeholder={t('article.comment_name_placeholder')}
                    label={t('article.comment_name_label')}
                    value={values.user_alias}
                    helperText={errors.user_alias}
                    error={Boolean(errors.user_alias)}
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    size="small"
                    onChange={handleChange('comment')}
                    placeholder={t('article.comment_text_placeholder')}
                    label={t('article.comment_text_label')}
                    value={values.comment}
                    helperText={errors.comment}
                    error={Boolean(errors.comment)}
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            disabled={!userIsAuth}
                            onClick={() => handleSubmit()}
                        >
                            {t('article.comment_submit')}
                        </Button>
                    </Grid>
                    <Grid item>
                        {!userIsAuth ? (
                            <Typography>
                                {t('article.comment_login_required')}
                            </Typography>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
