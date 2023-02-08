import React from 'react';
import { Link } from 'react-router-dom';

export const MetaData = ({ meta, url }: any) => {
    const { author = '', dateArticle = '' } = meta || {};
    console.log(meta);

    return (
        <>
            <div className="episode_meta">
                <Link to={url} className="btn btn-primary">
                    Чытаць
                </Link>
                <button type="button" className="btn btn-danger like btn-sm">
                    <span className="bi bi-heart-fill"></span>
                    <span className="count_likes">0</span>
                </button>
            </div>
            <div>
                <span className="author">{author}</span>,
                <span className="date-article"> {dateArticle}</span>
            </div>
        </>
    );
};
