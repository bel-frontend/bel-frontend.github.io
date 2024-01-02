import React from "react";
import { IconButton, Box, Typography, Button } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { AddComment } from "./AddComment";
import ReplyIcon from "@mui/icons-material/Reply";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  onSetLike: (id: any) => void;
  onSetDislike: (id: any) => void;
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
    score?: number;
  };
  onDelete: (id: any) => void;
  currentUser?: any;
}) => {
  const { user_alias, comment, comment_id, children } = item;
  const [addCommentIsOpen, setAddComment] = React.useState(false);
  const [liked, setLiked] = React.useState<any>();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user_alias}>{user_alias.slice(0, 1)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box display={"flex"} justifyContent="space-between">
              <Typography variant="subtitle1">{user_alias}</Typography>
              <Box display={"inline-flex"} alignItems="center">
                {(currntUserIsAdmin ||
                  currentUser?.user_id === item?.user_id) &&
                !item?.disabled ? (
                  <IconButton
                    size="small"
                    color={"error"}
                    onClick={() => {
                      onDelete(item?.comment_id);
                    }}
                  >
                    <DeleteRounded fontSize="small" />
                  </IconButton>
                ) : null}
                <IconButton
                  color="secondary"
                  size={"small"}
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
                sx={{
                  display: "inline",
                  whiteSpace: "pre-wrap",
                }}
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
      </ListItem>{" "}
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"flex-end"}
        ml={1}
      >
        <IconButton
          color="error"
          size="small"
          disabled={liked}
          onClick={() => {
            onSetLike(comment_id);
            setLiked(liked ? undefined : liked === false ? undefined : true);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        <Typography variant="subtitle2">{item?.score || 0}</Typography>
        <IconButton
          color="primary"
          size="small"
          disabled={liked === false}
          onClick={() => {
            onSetDislike(comment_id);
            setLiked(liked === false ? undefined : liked ? undefined : false);
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Box>
      {children.map((item: any) => (
        <Box ml={10} mt={2} key={item.comment_id}>
          <CommentItem
            onDelete={onDelete}
            articleId={articleId}
            userIsAuth={userIsAuth}
            onSuccess={onSuccess}
            currntUserIsAdmin={currntUserIsAdmin}
            item={item}
            currentUser={currentUser}
            onSetDislike={onSetDislike}
            onSetLike={onSetLike}
          ></CommentItem>
        </Box>
      ))}
      {/* <Divider /> */}
    </>
  );
};
