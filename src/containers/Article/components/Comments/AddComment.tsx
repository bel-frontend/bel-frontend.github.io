import React from 'react';
import { Button, TextField, Grid, Typography, Box, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addCommentRequest } from '@/modules/comments';

const validationSchema = () =>
    yup.object({
        comment: yup
            .string()
            .min(10, 'Павінна быць не меней за 10 сімвалаў')
            .required('Увядзіце тэкст'),
        user_alias: yup
            .string()
            .min(4, 'Павінна быць не меней за 4 сімвалаў')
            .required('Увядзіце імя'),
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
        validationSchema: validationSchema(),
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
                    placeholder="Ваша імя"
                    label="Ваша імя"
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
                    placeholder="Ваш каментар"
                    label="Ваш каментар"
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
                            Даслаць
                        </Button>
                    </Grid>
                    <Grid item>
                        {!userIsAuth ? (
                            <Typography>
                                (Каб даслаць каментар залагуйцеся ў свой уліковы
                                запіс)
                            </Typography>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
