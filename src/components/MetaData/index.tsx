import React from 'react';
import { LikeButton } from '../Buttons';
import Button from '@mui/material/Button';
import style from './style.module.scss';

export const MetaData = ({
    meta,
    showReadButton = true,
    url,
    articleId,
    likes,
    history
}: any) => {
    const { author = '', dateArticle = '' } = meta || {};

    return (
        <>
            <div className={style.episode_meta}>
                {showReadButton ? (
                    <Button
                        sx={{ ml: 1 }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            history.push(url);
                        }}
                    >
                        Чытаць
                    </Button>
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
