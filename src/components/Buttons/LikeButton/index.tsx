'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    checkArtickeIsLiked,
    saveLikeToLocalStorage,
    removeLikeFromLocalStorage,
} from '@/modules/firebase';

import { setLikedRequest, removeLikeRequest } from '@/modules/artickles';
import { Button } from '@mui/material';
import HeardIcon from './components/HeardIcon';

import style from './style.module.scss';

export const LikeButton = ({
    articleId,
    likesCount,
    className = '',
}: {
    articleId: string;
    likesCount: number;
    className?: string;
}) => {
    const dispatch = useDispatch();
    const [likes, setLikes] = React.useState(likesCount);

    React.useEffect(() => {
        setLikes(likesCount);
    }, [likesCount]);

    const onClick = React.useCallback(async () => {
        if (!checkArtickeIsLiked(articleId)) {
            await dispatch(
                setLikedRequest(
                    { id: articleId },
                    {
                        onSuccess: ({ data }: { data: any }) => {
                            setLikes(data?.count);
                        },
                    },
                ),
            );
            saveLikeToLocalStorage(articleId);
        } else {
            await dispatch(
                removeLikeRequest(
                    { id: articleId },
                    {
                        onSuccess: ({ data }: { data: any }) => {
                            setLikes(data?.count);
                        },
                    },
                ),
            );
            removeLikeFromLocalStorage(articleId);
        }
    }, [articleId]);

    return (
        <Button
            color="error"
            type="button"
            variant="contained"
            size="small"
            onClick={onClick}
            disableElevation
            className={className}
        >
            <HeardIcon />
            <span className={style.count_likes}>{likes}</span>
        </Button>
    );
};
