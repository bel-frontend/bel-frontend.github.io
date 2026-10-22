'use client';
import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { useTranslation } from '@/modules/i18next';
import { CommentVote } from '@/modules/comments';

export const UPVOTE_COLOR = '#ff4500';
export const DOWNVOTE_COLOR = '#7193ff';

export const VoteButtons = ({
    score,
    myVote,
    canVote,
    onVote,
}: {
    score: number;
    myVote: CommentVote;
    canVote: boolean;
    onVote: (value: CommentVote) => void;
}) => {
    const { t } = useTranslation();
    const color =
        myVote === 1
            ? UPVOTE_COLOR
            : myVote === -1
            ? DOWNVOTE_COLOR
            : undefined;

    const buttons = (
        <Box
            display="inline-flex"
            alignItems="center"
            sx={{
                borderRadius: 999,
                bgcolor: 'action.hover',
                px: 0.25,
            }}
        >
            <IconButton
                size="small"
                disabled={!canVote}
                aria-label="upvote"
                aria-pressed={myVote === 1}
                onClick={() => onVote(myVote === 1 ? 0 : 1)}
                sx={{
                    color: myVote === 1 ? UPVOTE_COLOR : 'text.secondary',
                    '&:hover': { color: UPVOTE_COLOR },
                }}
            >
                <ArrowUpwardRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography
                component="span"
                variant="body2"
                sx={{
                    minWidth: 20,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    color: color || 'text.primary',
                }}
            >
                {score}
            </Typography>
            <IconButton
                size="small"
                disabled={!canVote}
                aria-label="downvote"
                aria-pressed={myVote === -1}
                onClick={() => onVote(myVote === -1 ? 0 : -1)}
                sx={{
                    color: myVote === -1 ? DOWNVOTE_COLOR : 'text.secondary',
                    '&:hover': { color: DOWNVOTE_COLOR },
                }}
            >
                <ArrowDownwardRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
        </Box>
    );

    return canVote ? (
        buttons
    ) : (
        <Tooltip title={t('article.comments.login_to_vote')}>
            <span>{buttons}</span>
        </Tooltip>
    );
};
