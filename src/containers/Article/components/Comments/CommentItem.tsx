import React from 'react';
import { IconButton, Box, Typography, Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { AddComment } from './AddComment';

export const CommentItem = ({
    onSetLike,
    onSetDislike,
    currntUserIsAdmin,
    articleId,
    userIsAuth,
    onSuccess,
    item,
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
    };
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
                        <>
                            <Typography variant="subtitle1">
                                {user_alias}
                            </Typography>
                        </>
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
                            </Typography>{' '}
                            <br />
                            <Button
                                size={'small'}
                                onClick={() => {
                                    setAddComment(!addCommentIsOpen);
                                }}
                            >
                                {addCommentIsOpen ? 'Схаваць' : 'Адказаць'}
                            </Button>
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
                        articleId={articleId}
                        userIsAuth={userIsAuth}
                        onSuccess={onSuccess}
                        currntUserIsAdmin={currntUserIsAdmin}
                        key={item.comment_id}
                        item={item}
                    ></CommentItem>
                </Box>
            ))}
            {/* <Divider /> */}
        </>
    );
};
