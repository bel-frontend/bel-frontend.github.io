import React from 'react';
import classnames from 'classnames';
import {
    checkArtickeIsLiked,
    saveLikeToLocalStorage,
    removeLikeFromLocalStorage,
} from 'modules/firebase';
import { setLikedRequest, removeLikeRequest } from 'modules/artickles';
import { useDispatch } from 'react-redux';

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
        <button
            type="button"
            className={classnames('btn btn-sm', 'btn-danger', className)}
            onClick={onClick}
        >
            <span className="bi bi-heart-fill"></span>
            <span className={style.count_likes}>{likes}</span>
        </button>
    );
};
