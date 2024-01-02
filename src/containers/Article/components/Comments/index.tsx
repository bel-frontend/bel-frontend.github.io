'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, List } from '@mui/material';
import { getCurrentUserSelector } from '@/modules/auth';
import {
    deleteCommentRequest,
    getCommentsRequest,
    getCommentsSelector,
    addScoreToCommentsRequest,
    removeScoreToCommentsRequest,
} from '@/modules/comments';
import { currentUserIsAuth } from '@/modules/auth';
import { checkPermission } from '@/utils/permissions';

import { USER_ROLES } from '@/constants/users';
import { AddComment } from './AddComment';
import { CommentItem } from './CommentItem';

const getTreeChildren = (items: any[] = [], itemId: string | null): any => {
    const children: any[] = (items || []).filter(
        (i) => i.parent_comment_id === itemId,
    );
    const nonChildren = (items || []).filter(
        (i) => i.parent_comment_id !== itemId,
    );
    if (children.length === 0) {
        return [];
    } else {
        return children.map((i) => ({
            ...i,
            children: getTreeChildren(nonChildren || [], i.comment_id),
        }));
    }
};

export const Comments = ({ articleId }: any) => {
    const userIsAuth = useSelector(currentUserIsAuth);
    const currentUser: any = useSelector(getCurrentUserSelector);
    const dispatch = useDispatch();
    const currntUserIsAdmin = checkPermission(currentUser, [
        USER_ROLES.ADMIN,
        USER_ROLES.SUPERADMIN,
    ]);

    React.useEffect(() => {
        dispatch(getCommentsRequest({ artickle_id: articleId }));
    }, [articleId]);

    const comments: any[] = useSelector(getCommentsSelector);

    const onSuccess = () => {
        dispatch(getCommentsRequest({ artickle_id: articleId }));
    };

    const commentsPrepared = React.useMemo(() => {
        const res = getTreeChildren(comments, null);
        return res;
    }, [comments]);

    const onSetLike = (id: any) => {
        dispatch(addScoreToCommentsRequest({ comment_id: id }, { onSuccess }));
    };
    const onSetDislike = (id: any) => {
        dispatch(
            removeScoreToCommentsRequest({ comment_id: id }, { onSuccess }),
        );
    };

    return (
        <Box mt={6} padding={2}>
            <Typography variant="h6">Каментары</Typography>
            <Grid container mb={2}>
                <Grid item xs={12}>
                    <List>
                        {commentsPrepared?.length > 0
                            ? commentsPrepared.map((item: any) => (
                                  <CommentItem
                                      currentUser={currentUser}
                                      onDelete={(comment_id) => {
                                          dispatch(
                                              deleteCommentRequest(
                                                  {
                                                      comment_id,
                                                  },
                                                  { onSuccess },
                                              ),
                                          );
                                      }}
                                      articleId={articleId}
                                      userIsAuth={userIsAuth}
                                      onSuccess={onSuccess}
                                      currntUserIsAdmin={currntUserIsAdmin}
                                      key={item.comment_id}
                                      item={item}
                                      onSetDislike={onSetDislike}
                                      onSetLike={onSetLike}
                                  ></CommentItem>
                              ))
                            : null}
                    </List>
                </Grid>
            </Grid>

            <AddComment
                articleId={articleId}
                userIsAuth={userIsAuth}
                onSuccess={onSuccess}
            />
        </Box>
    );
};
