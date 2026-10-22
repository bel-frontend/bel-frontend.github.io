'use client';
import React from 'react';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    useMediaQuery,
    Theme,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { useTranslation } from '@/modules/i18next';
import { CommentHeader, CommentItem } from './CommentItem';
import { useCommentsContext } from './context';
import {
    CommentNode,
    MAX_DEPTH,
    countDescendants,
    getAvatarColor,
} from './utils';
import style from './style.module.scss';

// smaller avatar on mobile leaves more width for nested replies
const AVATAR_SIZE = { xs: 26, sm: 32 };
// on mobile deep threads get too narrow, so they are cut earlier
const MOBILE_MAX_DEPTH = 3;

export const CommentThread = ({
    node,
    depth = 0,
}: {
    node: CommentNode;
    depth?: number;
}) => {
    const { t }: { t: any } = useTranslation();
    const { onContinueThread } = useCommentsContext();
    const [collapsed, setCollapsed] = React.useState(false);
    const hasChildren = node.children.length > 0;
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm'),
    );
    const maxDepth = isMobile ? MOBILE_MAX_DEPTH : MAX_DEPTH;

    const avatar = node.disabled ? (
        <Avatar
            sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                bgcolor: 'action.disabled',
            }}
        >
            <PersonOutlineRoundedIcon fontSize="small" />
        </Avatar>
    ) : (
        <Avatar
            alt={node.user_alias}
            sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontWeight: 700,
                bgcolor: getAvatarColor(node.user_id || node.user_alias),
            }}
        >
            {(node.user_alias || '?').slice(0, 1).toUpperCase()}
        </Avatar>
    );

    const thread = (
        <Box
            id={`comment-${node.comment_id}`}
            className={style.thread}
            mt={depth ? { xs: 2, sm: 2.5 } : 0}
        >
            <Box className={style.gutter} sx={{ width: AVATAR_SIZE }}>
                {collapsed ? (
                    <IconButton
                        size="small"
                        aria-label={t('article.comments.expand')}
                        onClick={() => setCollapsed(false)}
                        sx={{ p: 0.25, color: 'primary.main' }}
                    >
                        <AddCircleOutlineRoundedIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                ) : (
                    <>
                        {avatar}
                        <Box
                            component="button"
                            type="button"
                            className={style.threadLine}
                            aria-label={t('article.comments.collapse')}
                            title={t('article.comments.collapse')}
                            onClick={() => setCollapsed(true)}
                            sx={{
                                '&::before': { bgcolor: 'divider' },
                                '&:hover::before, &:focus-visible::before': {
                                    bgcolor: 'primary.main',
                                },
                            }}
                        />
                    </>
                )}
            </Box>
            <Box flex={1} minWidth={0}>
                <CommentHeader
                    item={node}
                    collapsed={collapsed}
                    repliesCount={countDescendants(node)}
                />
                {collapsed ? null : (
                    <>
                        <CommentItem item={node} />
                        {hasChildren && depth + 1 >= maxDepth ? (
                            <Button
                                size="small"
                                onClick={() =>
                                    onContinueThread(node.comment_id)
                                }
                                sx={{
                                    mt: 1.5,
                                    ml: -1,
                                    fontWeight: 600,
                                    borderRadius: 999,
                                }}
                            >
                                {t('article.comments.continue_thread')} →
                            </Button>
                        ) : (
                            node.children.map((child) => (
                                <CommentThread
                                    key={child.comment_id}
                                    node={child}
                                    depth={depth + 1}
                                />
                            ))
                        )}
                    </>
                )}
            </Box>
        </Box>
    );

    // each top-level thread is a separate card
    return depth ? (
        thread
    ) : (
        <Box
            sx={{
                mt: 2,
                p: { xs: 1.5, sm: 2.5 },
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: '16px',
            }}
        >
            {thread}
        </Box>
    );
};
