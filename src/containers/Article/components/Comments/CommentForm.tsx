'use client';
import React from 'react';
import Link from 'next/link';
import {
    Avatar,
    Box,
    Button,
    TextField,
    Typography,
    alpha,
} from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from '@/modules/i18next';
import { addCommentRequest } from '@/modules/comments';
import { useCommentsContext } from './context';
import { getAvatarColor } from './utils';

const cardSx = {
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'divider',
    borderRadius: '16px',
};

const ALIAS_STORAGE_KEY = 'belFrontendCommentAlias';

const getSavedAlias = () => {
    try {
        return localStorage.getItem(ALIAS_STORAGE_KEY) || '';
    } catch (error) {
        return '';
    }
};

const validationSchema = (t: any) =>
    yup.object({
        comment: yup
            .string()
            .trim()
            .min(2, t('article.validation_min_chars', { count: 2 }))
            .required(t('article.validation_required')),
        user_alias: yup
            .string()
            .trim()
            .max(64)
            .required(t('article.validation_required')),
    });

export const CommentForm = ({
    articleId,
    userIsAuth,
    onSuccess,
    onCancel,
    parent_comment_id,
}: {
    articleId: string;
    userIsAuth?: boolean;
    onSuccess: () => void;
    onCancel?: () => void;
    parent_comment_id?: string;
}) => {
    const dispatch = useDispatch();
    const { t }: { t: any } = useTranslation();
    const { currentUserId } = useCommentsContext();
    const isReply = Boolean(parent_comment_id);
    const [savedAlias, setSavedAlias] = React.useState('');
    // in replies name field is hidden when it is already known
    const showAliasField = !isReply || !savedAlias;

    const {
        handleSubmit,
        values,
        handleChange,
        setFieldValue,
        errors,
        isSubmitting,
        setSubmitting,
        setFieldError,
    } = useFormik({
        onSubmit: ({ comment, user_alias }) => {
            const alias = user_alias.trim();
            try {
                localStorage.setItem(ALIAS_STORAGE_KEY, alias);
            } catch (error) {}
            dispatch(
                addCommentRequest(
                    {
                        comment: comment.trim(),
                        artickle_id: articleId,
                        user_alias: alias,
                        parent_comment_id,
                    },
                    {
                        onSuccess: () => {
                            setSubmitting(false);
                            setFieldValue('comment', '');
                            onSuccess();
                        },
                        onFailure: (error: any) => {
                            setSubmitting(false);
                            // AI moderation rejection is shown under the field
                            const data = error?.response?.data;
                            if (data?.type === 'moderation') {
                                setFieldError(
                                    'comment',
                                    data.message ||
                                        t('moderation.comment_rejected'),
                                );
                            }
                        },
                    },
                ),
            );
        },
        validationSchema: validationSchema(t),
        validateOnChange: false,
        initialValues: {
            comment: '',
            user_alias: '',
        },
    });

    // localStorage is available only on client, so read it after mount
    React.useEffect(() => {
        const alias = getSavedAlias();
        if (alias) {
            setSavedAlias(alias);
            setFieldValue('user_alias', alias);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!userIsAuth) {
        return isReply ? null : (
            <Box
                sx={{
                    ...cardSx,
                    p: { xs: 2, sm: 2.5 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap',
                }}
            >
                <Box display="flex" alignItems="center" gap={1.5}>
                    <ChatBubbleOutlineRoundedIcon
                        sx={{ color: 'text.secondary' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {t('article.comments.login_to_comment')}
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href="/login"
                    variant="contained"
                    disableElevation
                    size="small"
                    sx={{ borderRadius: 999, px: 2.5 }}
                >
                    {t('header.menu.login')}
                </Button>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleSubmit();
            }}
            sx={{
                ...cardSx,
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                '&:focus-within': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) =>
                        `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
                mt: isReply ? 1.5 : 0,
            }}
        >
            {showAliasField ? (
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    px={isReply ? 1.5 : 2}
                    pt={isReply ? 1.5 : 2}
                >
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            bgcolor: values.user_alias.trim()
                                ? getAvatarColor(currentUserId)
                                : 'action.disabled',
                        }}
                    >
                        {values.user_alias.trim().slice(0, 1).toUpperCase() ||
                            '?'}
                    </Avatar>
                    <TextField
                        size="small"
                        variant="standard"
                        onChange={handleChange('user_alias')}
                        placeholder={t('article.comment_name_placeholder')}
                        value={values.user_alias}
                        helperText={errors.user_alias}
                        error={Boolean(errors.user_alias)}
                        inputProps={{ maxLength: 64 }}
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontWeight: 700, fontSize: '0.95rem' },
                        }}
                        sx={{ flex: 1 }}
                    />
                </Box>
            ) : null}
            <TextField
                fullWidth
                multiline
                minRows={isReply ? 2 : 3}
                autoFocus={isReply}
                variant="standard"
                onChange={handleChange('comment')}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit();
                    }
                }}
                placeholder={
                    isReply
                        ? t('article.comments.reply_placeholder')
                        : t('article.comments.placeholder')
                }
                value={values.comment}
                helperText={errors.comment}
                error={Boolean(errors.comment)}
                inputProps={{ maxLength: 10000 }}
                InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: '0.975rem', lineHeight: 1.6 },
                }}
                sx={{ px: isReply ? 1.5 : 2, py: 1.5 }}
            />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={1}
                px={isReply ? 1.5 : 2}
                py={1}
                sx={{ borderTop: 1, borderColor: 'divider' }}
            >
                <Typography variant="caption" color="text.secondary">
                    {t('article.comments.markdown_hint')}
                </Typography>
                <Box display="flex" gap={1} ml="auto">
                    {onCancel ? (
                        <Button
                            size="small"
                            color="inherit"
                            onClick={onCancel}
                            sx={{ borderRadius: 999, px: 2 }}
                        >
                            {t('article.comments.cancel')}
                        </Button>
                    ) : null}
                    <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        disableElevation
                        disabled={isSubmitting || !values.comment.trim()}
                        sx={{ borderRadius: 999, px: 2.5 }}
                    >
                        {isSubmitting
                            ? t('moderation.checking')
                            : isReply
                            ? t('article.comments.reply')
                            : t('article.comments.submit')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
