'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import { getCurrentUserSelector, currentUserIsAuth } from '@/modules/auth';
import {
    CommentDTO,
    CommentVote,
    deleteCommentRequest,
    getCommentsRequest,
    getCommentsSelector,
    voteCommentRequest,
} from '@/modules/comments';
import { useTranslation } from '@/modules/i18next';
import { checkPermission } from '@/utils/permissions';
import { USER_ROLES } from '@/constants/users';
import { CommentForm } from './CommentForm';
import { CommentThread } from './CommentThread';
import { SortSelect } from './SortSelect';
import { CommentsContext, CommentsContextValue } from './context';
import { SortMode, buildTree, findNode, sortTree } from './utils';

type VoteOverride = Pick<CommentDTO, 'score' | 'my_vote'>;

export const Comments = ({
    articleId,
    articleAuthorId,
}: {
    articleId: string;
    articleAuthorId?: string;
}) => {
    const { t }: { t: any } = useTranslation();
    const dispatch = useDispatch();
    const isAuthInStore = useSelector(currentUserIsAuth);
    // auth is restored from localStorage, so it's unknown during SSR:
    // render auth-dependent UI only after mount to avoid hydration mismatch
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => setIsMounted(true), []);
    const userIsAuth = isMounted && Boolean(isAuthInStore);
    const currentUser: any = useSelector(getCurrentUserSelector);
    const comments: CommentDTO[] = useSelector(getCommentsSelector);
    const currentUserIsAdmin = checkPermission(currentUser, [
        USER_ROLES.ADMIN,
        USER_ROLES.SUPERADMIN,
    ]);

    const [sortMode, setSortMode] = React.useState<SortMode>('best');
    const [focusedId, setFocusedId] = React.useState<string | null>(null);
    // optimistic votes, applied on top of server data until next fetch
    const [voteOverrides, setVoteOverrides] = React.useState<
        Record<string, VoteOverride>
    >({});

    const fetchComments = React.useCallback(() => {
        dispatch(getCommentsRequest({ artickle_id: articleId }));
    }, [dispatch, articleId]);

    // refetch on login/logout too: response contains user's own votes
    React.useEffect(() => {
        fetchComments();
    }, [fetchComments, isAuthInStore]);

    React.useEffect(() => {
        setFocusedId(null);
    }, [articleId]);

    React.useEffect(() => {
        setVoteOverrides({});
    }, [comments]);

    const list = React.useMemo(
        () =>
            (Array.isArray(comments) ? comments : []).map((item) => ({
                ...item,
                ...voteOverrides[item.comment_id],
            })),
        [comments, voteOverrides],
    );

    const tree = React.useMemo(
        () => sortTree(buildTree(list), sortMode),
        [list, sortMode],
    );

    const focusedNode = focusedId ? findNode(tree, focusedId) : undefined;

    // scroll only after user switches thread: an effect on focusedId alone
    // would also fire on mount (twice in React strict mode) and jump to comments
    const scrollTargetRef = React.useRef<string | null>(null);
    const focusThread = (id: string | null) => {
        scrollTargetRef.current = id ? `comment-${id}` : 'comments';
        setFocusedId(id);
    };
    React.useEffect(() => {
        if (!scrollTargetRef.current) return;
        document
            .getElementById(scrollTargetRef.current)
            ?.scrollIntoView({ behavior: 'smooth' });
        scrollTargetRef.current = null;
    }, [focusedId]);

    const contextValue: CommentsContextValue = {
        articleId,
        articleAuthorId,
        userIsAuth,
        currentUserId: currentUser?.user_id,
        currentUserIsAdmin,
        onCommentAdded: fetchComments,
        onContinueThread: focusThread,
        onDelete: (comment_id) => {
            dispatch(
                deleteCommentRequest(
                    { comment_id },
                    { onSuccess: fetchComments },
                ),
            );
        },
        onVote: (comment_id, value: CommentVote) => {
            const item = list.find((i) => i.comment_id === comment_id);
            if (!item) return;
            const prev: VoteOverride = {
                score: item.score || 0,
                my_vote: item.my_vote || 0,
            };
            const setOverride = (override?: VoteOverride) =>
                setVoteOverrides((overrides) => {
                    const next = { ...overrides };
                    if (override) next[comment_id] = override;
                    else delete next[comment_id];
                    return next;
                });

            setOverride({
                score: prev.score - prev.my_vote + value,
                my_vote: value,
            });
            dispatch(
                voteCommentRequest(
                    { comment_id, value },
                    {
                        onSuccess: (res: any) =>
                            res?.data && setOverride(res.data),
                        onFailure: () => setOverride(voteOverrides[comment_id]),
                    },
                ),
            );
        },
    };

    return (
        <CommentsContext.Provider value={contextValue}>
            <Box
                id="comments"
                component="section"
                mt={6}
                sx={{
                    scrollMarginTop: 96,
                    '& .MuiButton-root': { textTransform: 'none' },
                }}
            >
                <Box display="flex" alignItems="center" gap={1.25} mb={2.5}>
                    <Typography
                        variant="h5"
                        component="h3"
                        fontWeight={700}
                        sx={{ letterSpacing: '-0.01em' }}
                    >
                        {t('article.comments.title')}
                    </Typography>
                    {list.length ? (
                        <Box
                            component="span"
                            sx={{
                                px: 1.25,
                                py: 0.25,
                                borderRadius: 999,
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                bgcolor: 'action.selected',
                                color: 'text.secondary',
                            }}
                        >
                            {list.length}
                        </Box>
                    ) : null}
                </Box>

                <CommentForm
                    articleId={articleId}
                    userIsAuth={userIsAuth}
                    onSuccess={fetchComments}
                />

                {list.length > 1 && !focusedNode ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                        mt={4}
                        pb={1.5}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                        >
                            {t('article.comments.sort')}
                        </Typography>
                        <SortSelect value={sortMode} onChange={setSortMode} />
                    </Box>
                ) : null}

                <Box mt={list.length > 1 && !focusedNode ? 1 : 3}>
                    {focusedNode ? (
                        <>
                            <Button
                                size="small"
                                onClick={() => focusThread(null)}
                                sx={{ fontWeight: 600, borderRadius: 999 }}
                            >
                                ← {t('article.comments.back_to_all')}
                            </Button>
                            <CommentThread node={focusedNode} />
                        </>
                    ) : tree.length ? (
                        tree.map((node) => (
                            <CommentThread key={node.comment_id} node={node} />
                        ))
                    ) : (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={1.5}
                            py={6}
                            sx={{
                                border: 1,
                                borderStyle: 'dashed',
                                borderColor: 'divider',
                                borderRadius: '16px',
                            }}
                        >
                            <ForumOutlinedIcon
                                sx={{ fontSize: 44, color: 'text.disabled' }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {t('article.comments.empty')}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </CommentsContext.Provider>
    );
};
