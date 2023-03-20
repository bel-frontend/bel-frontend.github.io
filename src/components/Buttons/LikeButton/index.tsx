import React from 'react';
import classnames from 'classnames';
import {
    checkArtickeIsLiked,
    saveLikeToLocalStorage,
    removeLikeFromLocalStorage,
} from 'modules/firebase';
import { setLikedRequest, removeLikeRequest } from 'modules/artickles';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import HeardIcon from './components/HeardIcon';

import style from './style.module.scss';

export const LikeButton = ({
    articleId,
    className,
    likesCount,
}: {
    articleId: string;
    className?: string;
    likesCount: number;
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
            className={classnames('btn btn-sm', 'btn-danger', style.btn)}
            onClick={onClick}
        >
            <HeardIcon />
            <span className={style.count_likes}>{likes}</span>
        </Button>
    );
};
