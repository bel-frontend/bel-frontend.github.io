import React from 'react';
import classnames from 'classnames';
import {
    saveLikesToDB,
    removeLikeFromDB,
    getCountOfLikes,
    checkArtickeIsLiked,
    saveLikeToLocalStorage,
    removeLikeFromLocalStorage,
} from 'modules/firebase';
import HeardIcon from "./components/HeardIcon";

import style from './style.module.scss';

export const LikeButton = ({
    articleId,
    className,
}: {
    articleId: string;
    className?: string;
}) => {
    console.log(articleId);

    const [likes, setLikes] = React.useState(0);
    const getLikesFromDb = (artickleId: any) => {
        getCountOfLikes(artickleId).then((data) => {
            setLikes(data);
        });
    };
    React.useEffect(() => {
        getLikesFromDb(articleId);
    }, [articleId]);
    const onClick = React.useCallback(async () => {
        if (!checkArtickeIsLiked(articleId)) {
            await saveLikesToDB(articleId);
            saveLikeToLocalStorage(articleId);
        } else {
            await removeLikeFromDB(articleId);
            removeLikeFromLocalStorage(articleId);
        }
        await getLikesFromDb(articleId);
    }, [articleId]);

    return (
        <button
            type="button"
            className={classnames('btn btn-sm', 'btn-danger', style.btn)}
            onClick={onClick}
        >
            <HeardIcon />
            <span className={style.count_likes}>{likes}</span>
        </button>
    );
};
