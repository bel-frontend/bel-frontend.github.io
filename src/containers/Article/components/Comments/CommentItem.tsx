import React from 'react';
import { IconButton, Box, Typography, Button } from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { AddComment } from './AddComment';
import ReplyIcon from '@mui/icons-material/Reply';
import ForumIcon from '@mui/icons-material/Forum';

export const CommentItem = ({
    onSetLike,
    onSetDislike,
    currntUserIsAdmin,
    articleId,
    userIsAuth,
    onSuccess,
    item,
    onDelete,
    currentUser,
}: {
    onSetLike?: () => void;
    onSetDislike?: () => void;
    currntUserIsAdmin: boolean;
    articleId: string;
    userIsAuth?: boolean;
    onSuccess: () => void;
    item: {
        user_alias: string;
        comment: string;
        comment_id: string;
        children: any[];
        user_id: string;
        disabled?: boolean;
    };
    onDelete: (id: any) => void;
    currentUser?: any;
}) => {
    const { user_alias, comment, comment_id, children } = item;
    const [addCommentIsOpen, setAddComment] = React.useState(false);
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user_alias}>{user_alias.slice(0, 1)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Box display={'flex'} justifyContent="space-between">
                            <Typography variant="subtitle1">
                                {user_alias}
                            </Typography>
                            <Box>
                                {(currntUserIsAdmin ||
                                    currentUser?.user_id === item?.user_id) &&
                                !item?.disabled ? (
                                    <IconButton
                                        size="small"
                                        color={'error'}
                                        onClick={() => {
                                            onDelete(item?.comment_id);
                                        }}
                                    >
                                        <DeleteRounded />
                                    </IconButton>
                                ) : null}
                                <IconButton
                                    color="secondary"
                                    size={'small'}
                                    onClick={() => {
                                        setAddComment(!addCommentIsOpen);
                                    }}
                                >
                                    <ReplyIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', whiteSpace: 'pre' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment}
                            </Typography>
                            {addCommentIsOpen ? (
                                <AddComment
                                    articleId={articleId}
                                    userIsAuth={userIsAuth}
                                    onSuccess={() => {
                                        onSuccess();
                                        setAddComment(!addCommentIsOpen);
                                    }}
                                    parent_comment_id={comment_id}
                                />
                            ) : null}
                        </React.Fragment>
                    }
                />
            </ListItem>
            {children.map((item: any) => (
                <Box ml={10}>
                    <CommentItem
                        onDelete={onDelete}
                        articleId={articleId}
                        userIsAuth={userIsAuth}
                        onSuccess={onSuccess}
                        currntUserIsAdmin={currntUserIsAdmin}
                        key={item.comment_id}
                        item={item}
                        currentUser={currentUser}
                    ></CommentItem>
                </Box>
            ))}
            {/* <Divider /> */}
        </>
    );
};
