'use client';
import React from 'react';
import { CommentVote } from '@/modules/comments';

export interface CommentsContextValue {
    articleId: string;
    articleAuthorId?: string;
    userIsAuth: boolean;
    currentUserId?: string;
    currentUserIsAdmin: boolean;
    onVote: (comment_id: string, value: CommentVote) => void;
    onDelete: (comment_id: string) => void;
    onCommentAdded: () => void;
    onContinueThread: (comment_id: string) => void;
}

export const CommentsContext = React.createContext<CommentsContextValue>(
    {} as CommentsContextValue,
);

export const useCommentsContext = () => React.useContext(CommentsContext);
