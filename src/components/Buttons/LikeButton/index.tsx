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

import style from './style.module.scss';

export const LikeButton = ({
    artickleId,
    className,
}: {
    artickleId: string;
    className?: string;
}) => {
    const [likes, setLikes] = React.useState(0);
    const getLikesFromDb = (artickleId: any) => {
        getCountOfLikes(artickleId).then((data) => {
            console.log(data);
            setLikes(data);
        });
    };
    React.useEffect(() => {
        getLikesFromDb(artickleId);
    }, [artickleId]);
    const onClick = React.useCallback(async () => {
        if (!checkArtickeIsLiked(artickleId)) {
            await saveLikesToDB(artickleId);
            saveLikeToLocalStorage(artickleId);
        } else {
            await removeLikeFromDB(artickleId);
            removeLikeFromLocalStorage(artickleId);
        }
        await getLikesFromDb(artickleId);
    }, [artickleId]);

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
