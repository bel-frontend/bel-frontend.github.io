import React from 'react';
import { Link } from 'react-router-dom';
import { LikeButton } from '../Buttons/LikeButton';
import style from './style.module.scss';

export const MetaData = ({
    meta,
    showLikes = true,
    showReadButton = true,
    url,
    articleId,
    likes,
}: any) => {
    const { author = '', dateArticle = '' } = meta || {};

    return (
        <>
            <div className={style.episode_meta}>
                {showReadButton ? (
                    <Link to={url} className="btn btn-primary">
                        Чытаць
                    </Link>
                ) : null}
                {showReadButton ? (
                    <LikeButton likesCount={likes} articleId={articleId} />
                ) : null}
            </div>
            <div>
                <span className="author">{author}</span>,
                <span className="date-article"> {dateArticle}</span>
            </div>
        </>
    );
};
