'use client';
import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useTranslation } from '@/modules/i18next';
import {
    ModerationArticle,
    getModerationArticlesRequest,
    getModerationArticlesSelector,
    setModerationDecisionRequest,
} from '@/modules/admin';

export const ModerationTab = () => {
    const { t }: { t: any } = useTranslation();
    const dispatch = useDispatch();
    const data: { articles: ModerationArticle[] } | undefined = useSelector(
        getModerationArticlesSelector,
    );
    const [rejectTarget, setRejectTarget] =
        React.useState<ModerationArticle | null>(null);
    const [rejectReason, setRejectReason] = React.useState('');

    const fetchArticles = React.useCallback(() => {
        dispatch(getModerationArticlesRequest());
    }, [dispatch]);

    React.useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const decide = (id: string, decision: 'approve' | 'reject', reason = '') =>
        dispatch(
            setModerationDecisionRequest(
                { id, decision, reason },
                { onSuccess: fetchArticles },
            ),
        );

    const articles = data?.articles || [];

    return (
        <Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
                {t('admin.moderation.hint')}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 720 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {t('admin.moderation.article')}
                            </TableCell>
                            <TableCell>
                                {t('admin.moderation.status')}
                            </TableCell>
                            <TableCell>
                                {t('admin.moderation.reason')}
                            </TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article) => {
                            const moderation = article.moderation;
                            return (
                                <TableRow key={article.artickle_id} hover>
                                    <TableCell>
                                        <Link
                                            // blocked article is loaded on client with token
                                            href={`/draft/${article.artickle_id}`}
                                            target="_blank"
                                        >
                                            {article.title}
                                        </Link>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {article.author}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            gap={0.5}
                                            flexWrap="wrap"
                                        >
                                            <Chip
                                                size="small"
                                                color={
                                                    moderation?.status ===
                                                    'pending'
                                                        ? 'warning'
                                                        : 'error'
                                                }
                                                label={t(
                                                    `admin.moderation.status_${
                                                        moderation?.status ||
                                                        'pending'
                                                    }`,
                                                )}
                                            />
                                            {(moderation?.categories || []).map(
                                                (category) => (
                                                    <Chip
                                                        key={category}
                                                        size="small"
                                                        variant="outlined"
                                                        label={t(
                                                            `moderation.categories.${category}`,
                                                        )}
                                                    />
                                                ),
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 320 }}>
                                        <Typography variant="body2">
                                            {moderation?.reason || '—'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{ whiteSpace: 'nowrap' }}
                                    >
                                        <Button
                                            size="small"
                                            color="success"
                                            onClick={() =>
                                                decide(
                                                    article.artickle_id,
                                                    'approve',
                                                )
                                            }
                                        >
                                            {t('admin.moderation.approve')}
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => {
                                                setRejectReason(
                                                    moderation?.reason || '',
                                                );
                                                setRejectTarget(article);
                                            }}
                                        >
                                            {t('admin.moderation.reject')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {!articles.length ? (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign="center"
                                        py={2}
                                    >
                                        {t('admin.moderation.empty')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </Box>

            <Dialog
                open={Boolean(rejectTarget)}
                onClose={() => setRejectTarget(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{t('admin.moderation.reject_title')}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        multiline
                        minRows={2}
                        sx={{ mt: 1 }}
                        label={t('admin.moderation.reject_reason')}
                        value={rejectReason}
                        inputProps={{ maxLength: 1000 }}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectTarget(null)}>
                        {t('admin.cancel')}
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            if (rejectTarget) {
                                decide(
                                    rejectTarget.artickle_id,
                                    'reject',
                                    rejectReason.trim(),
                                );
                            }
                            setRejectTarget(null);
                        }}
                    >
                        {t('admin.moderation.reject')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
