import React from 'react';
import classnames from 'classnames';
import {
    saveLikesToDB,
    removeLikeFromDB,
    getCountOfLikes,
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
        await saveLikesToDB(artickleId);
        await getLikesFromDb(artickleId);
    }, [artickleId]);

    return (
        <button
            type="button"
            className={classnames('btn btn-danger btn-sm', className)}
            onClick={onClick}
        >
            <span className="bi bi-heart-fill"></span>
            <span className={style.count_likes}>{likes}</span>
        </button>
    );
};
