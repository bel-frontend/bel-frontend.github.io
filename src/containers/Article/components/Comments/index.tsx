import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Grid, Typography, Box, List } from '@mui/material';
import { getCurrentUserSelector } from 'modules/auth';
import {
    addCommentRequest,
    deleteCommentRequest,
    getCommentsRequest,
    getCommentsSelector,
} from 'modules/comments';
import { USER_ROLES } from 'constants/users';
import { AddComment } from './AddComment';
import { CommentItem } from './CommentItem';

const getTreeChildren = (items: any[], itemId: string | null): any => {
    const children: any[] = items.filter((i) => i.parent_comment_id === itemId);
    const nonChildren = items.filter((i) => i.parent_comment_id !== itemId);
    if (children.length === 0) {
        return [];
    } else {
        return children.map((i) => ({
            ...i,
            children: getTreeChildren(nonChildren, i.comment_id),
        }));
    }
};

export const Comments = ({ articleId, userIsAuth }: any) => {
    const currentUser: any = useSelector(getCurrentUserSelector);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCommentsRequest({ artickle_id: articleId }));
    }, [articleId]);

    const comments: any[] = useSelector(getCommentsSelector);
    const currntUserIsAdmin =
        currentUser.role === USER_ROLES.SUPERADMIN ||
        currentUser.role === USER_ROLES.ADMIN;

    const onSuccess = () => {
        dispatch(getCommentsRequest({ artickle_id: articleId }));
    };

    const commentsPrepared = React.useMemo(() => {
        const res = getTreeChildren(comments, null);
        return res;
    }, [comments]);
    return (
        <Box mt={6} padding={2}>
            <Typography variant="h6">Каментары</Typography>
            <Grid container mb={2}>
                <Grid item xs={12}>
                    <List>
                        {commentsPrepared?.length > 0
                            ? commentsPrepared.map((item: any) => (
                                  <CommentItem
                                      articleId={articleId}
                                      userIsAuth={userIsAuth}
                                      onSuccess={onSuccess}
                                      currntUserIsAdmin={currntUserIsAdmin}
                                      key={item.comment_id}
                                      item={item}
                                  ></CommentItem>
                              ))
                            : null}
                    </List>
                </Grid>
            </Grid>
            <Typography variant="h6">Дадаць каментар</Typography>
            {userIsAuth ? null : (
                <Typography variant="subtitle1">
                    (Калі ласка залагуйцеся)
                </Typography>
            )}
            <AddComment
                articleId={articleId}
                userIsAuth={userIsAuth}
                onSuccess={onSuccess}
            />
        </Box>
    );
};
