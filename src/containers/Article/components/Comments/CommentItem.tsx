'use client';
import React from 'react';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import i18next from 'i18next';
import { useTranslation } from '@/modules/i18next';
import { CommentForm } from './CommentForm';
import { CommentMarkdown } from './CommentMarkdown';
import { VoteButtons } from './VoteButtons';
import { useCommentsContext } from './context';
import { CommentNode, formatFullDate, pluralKey, timeAgo } from './utils';

const actionButtonSx = {
    color: 'text.secondary',
    fontWeight: 600,
    fontSize: '0.8rem',
    borderRadius: 999,
    minWidth: 0,
    px: { xs: 1, sm: 1.25 },
    '& .MuiButton-startIcon': { mr: 0.75 },
};

// on mobile secondary actions are icon-only to fit in one row
const mobileHiddenLabelSx = {
    ...actionButtonSx,
    '& .MuiButton-startIcon': {
        mr: { xs: 0, sm: 0.75 },
        ml: { xs: 0, sm: -0.5 },
    },
};

export const CommentHeader = ({
    item,
    collapsed,
    repliesCount,
}: {
    item: CommentNode;
    collapsed?: boolean;
    repliesCount?: number;
}) => {
    const { t }: { t: any } = useTranslation();
    const { articleAuthorId } = useCommentsContext();
    const lang = i18next.language;
    const plural = (key: string, count: number) =>
        t(pluralKey(key, count, lang), { count });

    return (
        <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            columnGap={1}
            minHeight={32}
            sx={{ fontSize: '0.85rem' }}
        >
            <Typography
                component="span"
                sx={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: item.disabled ? 'text.secondary' : 'text.primary',
                }}
            >
                {item.disabled
                    ? t('article.comments.deleted')
                    : item.user_alias}
            </Typography>
            {!item.disabled &&
            articleAuthorId &&
            item.user_id === articleAuthorId ? (
                <Chip
                    label={t('article.comments.author_badge')}
                    size="small"
                    color="primary"
                    sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                    }}
                />
            ) : null}
            {item.created_at ? (
                <>
                    <Typography
                        component="span"
                        color="text.secondary"
                        fontSize="inherit"
                    >
                        ·
                    </Typography>
                    <Tooltip title={formatFullDate(item.created_at)}>
                        <Typography
                            component="time"
                            dateTime={item.created_at}
                            color="text.secondary"
                            fontSize="inherit"
                        >
                            {timeAgo(item.created_at, t, lang)}
                        </Typography>
                    </Tooltip>
                </>
            ) : null}
            {collapsed ? (
                <Typography
                    component="span"
                    color="text.secondary"
                    fontSize="inherit"
                >
                    · {plural('article.comments.points', item.score || 0)}
                    {repliesCount
                        ? ` · ${plural(
                              'article.comments.replies',
                              repliesCount,
                          )}`
                        : ''}
                </Typography>
            ) : null}
        </Box>
    );
};

export const CommentItem = ({ item }: { item: CommentNode }) => {
    const { t }: { t: any } = useTranslation();
    const {
        articleId,
        userIsAuth,
        currentUserId,
        currentUserIsAdmin,
        onVote,
        onDelete,
        onCommentAdded,
    } = useCommentsContext();
    const [replyIsOpen, setReplyIsOpen] = React.useState(false);

    const canDelete =
        !item.disabled &&
        (currentUserIsAdmin ||
            (!!currentUserId && currentUserId === item.user_id));

    return (
        <>
            <Box sx={{ pt: 0.5, pb: 1, wordBreak: 'break-word' }}>
                {item.disabled ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle="italic"
                    >
                        {t('article.comments.deleted_text')}
                    </Typography>
                ) : (
                    <CommentMarkdown>{item.comment}</CommentMarkdown>
                )}
            </Box>
            <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap={{ xs: 0.5, sm: 1 }}
                ml={-0.5}
            >
                {item.disabled ? null : (
                    <VoteButtons
                        score={item.score || 0}
                        myVote={item.my_vote || 0}
                        canVote={userIsAuth}
                        onVote={(value) => onVote(item.comment_id, value)}
                    />
                )}
                {userIsAuth && !item.disabled ? (
                    <Button
                        size="small"
                        startIcon={
                            <ChatBubbleOutlineRoundedIcon
                                sx={{ fontSize: '16px !important' }}
                            />
                        }
                        onClick={() => setReplyIsOpen(!replyIsOpen)}
                        sx={actionButtonSx}
                    >
                        {t('article.comments.reply')}
                    </Button>
                ) : null}
                {canDelete ? (
                    <Button
                        size="small"
                        startIcon={
                            <DeleteOutlineRoundedIcon
                                sx={{ fontSize: '16px !important' }}
                            />
                        }
                        onClick={() => {
                            if (
                                window.confirm(
                                    t('article.comments.delete_confirm'),
                                )
                            ) {
                                onDelete(item.comment_id);
                            }
                        }}
                        aria-label={t('article.comments.delete')}
                        sx={{
                            ...mobileHiddenLabelSx,
                            '&:hover': { color: 'error.main' },
                        }}
                    >
                        <Box
                            component="span"
                            sx={{ display: { xs: 'none', sm: 'inline' } }}
                        >
                            {t('article.comments.delete')}
                        </Box>
                    </Button>
                ) : null}
            </Box>
            {replyIsOpen ? (
                <CommentForm
                    articleId={articleId}
                    userIsAuth={userIsAuth}
                    parent_comment_id={item.comment_id}
                    onCancel={() => setReplyIsOpen(false)}
                    onSuccess={() => {
                        setReplyIsOpen(false);
                        onCommentAdded();
                    }}
                />
            ) : null}
        </>
    );
};
